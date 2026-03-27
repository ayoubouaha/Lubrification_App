import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { type CraneImages } from '../../../config/cranesConfig';
import { type DiagramPoint } from '../../diagram/types';
import { type ZoneKey, getZoneDiagramConfig } from '../../diagram/zones/zoneDiagram.config';
import {
  ROTATION_DRIVE_GROUPS_LEFT_POINTS,
  ROTATION_DRIVE_GROUPS_RIGHT_POINTS,
} from '../../diagram/rotation/rotationDriveGroups.config';
import {
  TUKAN_ROTATION_DRIVE_GROUPS_LEFT_POINTS,
  TUKAN_ROTATION_DRIVE_GROUPS_RIGHT_POINTS,
} from '../../diagram/rotation/rotationDriveGroups.tukan.config';
import { RELEVAGE_DRIVE_GROUPS_POINTS } from '../../diagram/relevage/relevageDriveGroups.config';
import { TUKAN_RELEVAGE_DRIVE_GROUPS_POINTS } from '../../diagram/relevage/relevageDriveGroups.tukan.config';
import { LEVAGE_DRIVE_GROUPS_POINTS } from '../../diagram/levage/levageDriveGroups.config';
import { TUKAN_LEVAGE_DRIVE_GROUPS_POINTS } from '../../diagram/levage/levageDriveGroups.tukan.config';
import {
  getPouliesDriveGroupsPoints,
  getPouliesOverviewPoints,
  getTukanPouliesOverviewPoints,
} from '../../diagram/poulies/pouliesPoints';
import { TUKAN_TRANSLATION_ZONE_A_MARKERS } from '../../diagram/translation/tukanTranslationZoneAMarkers';
import { TUKAN_TRANSLATION_ZONE_B_MARKERS } from '../../diagram/translation/tukanTranslationZoneBMarkers';
import { TUKAN_TRANSLATION_ZONE_C_MARKERS } from '../../diagram/translation/tukanTranslationZoneCMarkers';
import { TUKAN_TRANSLATION_ZONE_D_MARKERS } from '../../diagram/translation/tukanTranslationZoneDMarkers';
import { useLubricationPointBatch } from '../../../hooks/useLubricationPointBatch';
import { getDbNameCandidates, isCriticalLubricationPoint, pickLubricationData } from '../../diagram/diagramPointUtils';
import { stepToPath } from '../../../navigation/paths';
import type { StepId } from '../../../navigation/steps';
import './CriticalPointsPanel.css';

type CriticalPointsPanelProps = {
  craneId: string;
  images: CraneImages;
};

type CriticalPointEntry = {
  point: DiagramPoint;
  label: string;
  tagLabel: string;
  sectionLabel: string;
  stepId: StepId;
  dbCandidates: string[];
};

type CriticalEntryWithData = CriticalPointEntry & { data: NonNullable<ReturnType<typeof pickLubricationData>> };

const ZONE_KEYS: ZoneKey[] = ['nord-a', 'sud-b', 'sud-c', 'nord-d'];
const TUKAN_ZONE_POINTS: Record<ZoneKey, DiagramPoint[]> = {
  'nord-a': TUKAN_TRANSLATION_ZONE_A_MARKERS,
  'sud-b': TUKAN_TRANSLATION_ZONE_B_MARKERS,
  'sud-c': TUKAN_TRANSLATION_ZONE_C_MARKERS,
  'nord-d': TUKAN_TRANSLATION_ZONE_D_MARKERS,
};

const makeLabel = (point: DiagramPoint) => {
  if (point.markerLabel) return point.markerLabel;
  if (point.name) return point.name;
  if (point.tagPrimary) return point.tagPrimary;
  if (point.dbName) return point.dbName;
  return 'Point de graissage';
};

const buildEntries = (craneId: string, images: CraneImages): CriticalPointEntry[] => {
  const isTukan = craneId === 'tukan';
  const entries: CriticalPointEntry[] = [];

  const addEntry = (point: DiagramPoint, sectionLabel: string, stepId: StepId) => {
    const dbCandidates = getDbNameCandidates(point);
    if (!dbCandidates.length) return;

    entries.push({
      point,
      label: makeLabel(point),
      tagLabel: point.tagPrimary || point.dbName || point.tagSecondary || point.name,
      sectionLabel,
      stepId,
      dbCandidates,
    });
  };

  ZONE_KEYS.forEach(zoneKey => {
    const config = getZoneDiagramConfig(zoneKey, images);
    const points = isTukan ? TUKAN_ZONE_POINTS[zoneKey] : config.points;
    points.forEach(point => {
      addEntry(point, `Translation - ${config.title}`, `translation:${zoneKey}` as StepId);
    });
  });

  const rotationLeft = isTukan ? TUKAN_ROTATION_DRIVE_GROUPS_LEFT_POINTS : ROTATION_DRIVE_GROUPS_LEFT_POINTS;
  rotationLeft.forEach(point => addEntry(point, 'Rotation - Groupe gauche', 'rotation:drive-groups'));

  const rotationRight = isTukan ? TUKAN_ROTATION_DRIVE_GROUPS_RIGHT_POINTS : ROTATION_DRIVE_GROUPS_RIGHT_POINTS;
  rotationRight.forEach(point => addEntry(point, 'Rotation - Groupe droite', 'rotation:drive-groups'));

  const relevage = isTukan ? TUKAN_RELEVAGE_DRIVE_GROUPS_POINTS : RELEVAGE_DRIVE_GROUPS_POINTS;
  relevage.forEach(point => addEntry(point, 'Relevage - Groupes', 'relevage:drive-groups'));

  const levage = isTukan ? TUKAN_LEVAGE_DRIVE_GROUPS_POINTS : LEVAGE_DRIVE_GROUPS_POINTS;
  levage.forEach(point => addEntry(point, 'Levage - Groupes', 'levage:drive-groups'));

  getPouliesDriveGroupsPoints(craneId).forEach(point => addEntry(point, 'Poulies - Groupes', 'poulies:drive-groups'));

  const pouliesOverview = craneId === 'tukan' ? getTukanPouliesOverviewPoints() : getPouliesOverviewPoints(craneId);
  pouliesOverview
    .filter(point => !point.id.includes('nav'))
    .forEach(point => addEntry(point, 'Poulies - Systeme', 'poulies'));

  return entries;
};

const formatAmount = (value: number | null | undefined) => {
  if (value === null || value === undefined) return '-';
  const rounded = Math.round((value + Number.EPSILON) * 100) / 100;
  return `${rounded}`;
};

const CriticalPointsPanel = ({ craneId, images }: CriticalPointsPanelProps) => {
  const navigate = useNavigate();

  const entries = useMemo(() => buildEntries(craneId, images), [craneId, images]);

  const dbNames = useMemo(() => {
    const names = new Set<string>();
    entries.forEach(entry => entry.dbCandidates.forEach(name => names.add(name)));
    return [...names];
  }, [entries]);

  const { lubricationDataMap } = useLubricationPointBatch(dbNames);

  const criticalEntries = useMemo(() => {
    const list: CriticalEntryWithData[] = [];

    entries.forEach(entry => {
      const data = pickLubricationData(lubricationDataMap, entry.dbCandidates);
      if (isCriticalLubricationPoint(data) && data) {
        list.push({ ...entry, data });
      }
    });

    return list.sort(
      (a, b) => a.sectionLabel.localeCompare(b.sectionLabel) || a.label.localeCompare(b.label),
    );
  }, [entries, lubricationDataMap]);

  const handleNavigate = (entry: CriticalPointEntry) => {
    const path = stepToPath(craneId, entry.stepId);
    navigate(path, { state: { focusPointId: entry.point.id, fromCriticalPanel: true } });
  };

  if (!criticalEntries.length) {
    return (
      <aside className="critical-panel" aria-label="Points critiques">
        <header className="critical-panel__header">
          <div>
            <p className="critical-panel__eyebrow">Surveillance</p>
            <h2 className="critical-panel__title">Points critiques</h2>
          </div>
          <span className="critical-panel__pill critical-panel__pill--muted">0</span>
        </header>
        <p className="critical-panel__empty">Aucun point rouge actuellement.</p>
      </aside>
    );
  }

  return (
    <aside className="critical-panel" aria-label="Points critiques">
      <header className="critical-panel__header">
        <div>
          <p className="critical-panel__eyebrow">Surveillance</p>
          <h2 className="critical-panel__title">Points critiques</h2>
        </div>
        <span className="critical-panel__pill">{criticalEntries.length}</span>
      </header>

      <div className="critical-panel__list" role="list">
        {criticalEntries.map(entry => {
          const data = pickLubricationData(lubricationDataMap, entry.dbCandidates);
          const isMissingActual = data?.actualAmount === null || data?.actualAmount === undefined;
          return (
            <button
              key={entry.point.id}
              type="button"
              className="critical-panel__item"
              onClick={() => handleNavigate(entry)}
              aria-label={`Aller au point ${entry.label}`}
            >
              <div className="critical-panel__item-header">
                <span className="critical-panel__name">{entry.label}</span>
                <span className="critical-panel__chip">{entry.sectionLabel}</span>
              </div>
              <div className="critical-panel__meta">
                <span className="critical-panel__tag">{entry.tagLabel}</span>
                <span className="critical-panel__values">
                  {isMissingActual
                    ? 'Qté réelle manquante'
                    : `Planifié ${formatAmount(data?.plannedAmount)} / Réel ${formatAmount(data?.actualAmount)}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default CriticalPointsPanel;

import { type DiagramPoint } from '../types';
import { ARDELT_K3_MARKERS } from '../ardelt/ardeltK3Markers';
import { TUKAN_MARKERS } from '../tukan/tukanMarkers';

const POULIES_DRIVE_GROUPS_NAV_POINT: DiagramPoint = {
  id: 'poulies:drive-groups-nav',
  name: 'Navigation groupes entrainement poulies',
  shortDescription: '',
  details: '',
  tagPrimary: '',
  frequency: '',
  plannedAmount: '',
  markerColor: '34, 197, 94',
  markerScale: 1.25,
  xPercent: 82.66,
  yPercent: 95.6,
};

const baseMarkersByCrane = (craneId: string): DiagramPoint[] => {
  return craneId === 'ardelt' ? ARDELT_K3_MARKERS : TUKAN_MARKERS;
};

export const getPouliesSystemPoints = (craneId: string): DiagramPoint[] => {
  return baseMarkersByCrane(craneId).filter(point => point.id.startsWith('poulies:'));
};

export const getPouliesOverviewPoints = (craneId: string): DiagramPoint[] => {
  return [...getPouliesSystemPoints(craneId), POULIES_DRIVE_GROUPS_NAV_POINT];
};

const buildPouliesGroupPoint = (
  id: string,
  xPercent: number,
  yPercent: number,
  identifiers: string[],
  markerColor = '34, 197, 94',
): DiagramPoint => {
  return {
    id,
    name: identifiers.join(' / '),
    shortDescription: 'SYSTÈME DES POULIES DES CABLES',
    details: '',
    dbName: identifiers[0],
    tagPrimary: identifiers.join(' / '),
    frequency: '',
    plannedAmount: '',
    markerColor,
    xPercent,
    yPercent,
  };
};

const TUKAN_POULIES_NAV_POINT: DiagramPoint = {
  id: 'poulies:drive-groups-nav',
  name: 'Groupes d’entrainement',
  shortDescription: 'SYSTÈME DES POULIES DES CABLES',
  details: '',
  tagPrimary: '',
  frequency: '',
  plannedAmount: '',
  markerLabel: 'Groupes d’entrainement',
  markerLabelVariant: 'arrow',
  markerColor: '234, 179, 8',
  markerScale: 1.35,
  xPercent: 84.88,
  yPercent: 42.25,
};

export const getTukanPouliesOverviewPoints = (): DiagramPoint[] => {
  const points = [
    buildPouliesGroupPoint('tukan-poulies-p2', 39.34, 23.71, [
      'T2-POULIE-R05',
      'T2-POULIE-R06',
      'T2-POULIE-R07',
      'T2-POULIE-R08',
    ]),
    buildPouliesGroupPoint('tukan-poulies-p1', 6.4, 75.57, [
      'T2-POULIE-R01',
      'T2-POULIE-R02',
      'T2-POULIE-R03',
      'T2-POULIE-R04',
    ]),
    buildPouliesGroupPoint('tukan-poulies-p3', 82.46, 29.96, [
      'T2-POULIE-R09',
      'T2-POULIE-R10',
      'T2-POULIE-R11',
      'T2-POULIE-R12',
    ]),
  ];

  return [...points, TUKAN_POULIES_NAV_POINT];
};

const buildDriveGroupsPoint = (
  id: string,
  xPercent: number,
  yPercent: number,
  dbName: string,
  identifiers: string,
  markerColor: string,
): DiagramPoint => {
  return {
    id,
    name: id,
    shortDescription: 'Groupes d’entrainement',
    details: '',
    dbName,
    tagPrimary: identifiers,
    frequency: '',
    plannedAmount: '',
    markerColor,
    xPercent,
    yPercent,
  };
};

type Position = { suffix: string; xPercent: number; yPercent: number };

type DriveGroupTemplate = {
  id: string;
  first: number;
  last: number;
  markerColor: string;
  positions: Position[];
};

const formatPoulieIdentifier = (index: number): string => `K3-POULIE-P${String(index).padStart(2, '0')}`;

const buildIdentifierGroup = (first: number, last: number): { dbName: string; identifiers: string } => {
  const values = Array.from({ length: last - first + 1 }, (_, offset) => formatPoulieIdentifier(first + offset));
  return {
    dbName: values[0],
    identifiers: values.join(' / '),
  };
};

const DRIVE_GROUP_TEMPLATES: DriveGroupTemplate[] = [
  {
    id: 'P13-P16',
    first: 13,
    last: 16,
    markerColor: '34, 197, 94',
    positions: [
      { suffix: 'a', xPercent: 80.77, yPercent: 18.84 },
      { suffix: 'b', xPercent: 49.52, yPercent: 3.52 },
    ],
  },
  {
    id: 'P09-P12',
    first: 9,
    last: 12,
    markerColor: '59, 130, 246',
    positions: [
      { suffix: 'a', xPercent: 43.51, yPercent: 34.39 },
      { suffix: 'b', xPercent: 75.36, yPercent: 48.7 },
    ],
  },
  {
    id: 'P05-P08',
    first: 5,
    last: 8,
    markerColor: '234, 179, 8',
    positions: [
      { suffix: 'a', xPercent: 53.12, yPercent: 48.22 },
      { suffix: 'b', xPercent: 20.67, yPercent: 32 },
    ],
  },
  {
    id: 'P01-P04',
    first: 1,
    last: 4,
    markerColor: '168, 85, 247',
    positions: [
      { suffix: 'a', xPercent: 47.32, yPercent: 78.46 },
      { suffix: 'b', xPercent: 14.66, yPercent: 62.05 },
    ],
  },
];

export const POULIES_DRIVE_GROUPS_POINTS: DiagramPoint[] = DRIVE_GROUP_TEMPLATES.flatMap(template => {
  const { dbName, identifiers } = buildIdentifierGroup(template.first, template.last);

  return template.positions.map(position =>
    buildDriveGroupsPoint(
      `poulies-drive:${template.id}-${position.suffix}`,
      position.xPercent,
      position.yPercent,
      dbName,
      identifiers,
      template.markerColor,
    ),
  );
});

const swapPrefix = (value: string, fromPrefix: string, toPrefix: string) => {
  if (!value) {
    return value;
  }

  const escaped = fromPrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return value.replace(new RegExp(escaped, 'g'), toPrefix);
};

const mapDriveGroupPointForCrane = (point: DiagramPoint, craneId: string): DiagramPoint => {
  if (craneId !== 'tukan') {
    return point;
  }

  return {
    ...point,
    name: swapPrefix(point.name, 'K3-', 'T2-'),
    dbName: point.dbName ? swapPrefix(point.dbName, 'K3-', 'T2-') : point.dbName,
    tagPrimary: swapPrefix(point.tagPrimary, 'K3-', 'T2-'),
    tagSecondary: point.tagSecondary ? swapPrefix(point.tagSecondary, 'K3-', 'T2-') : point.tagSecondary,
  };
};

export const getPouliesDriveGroupsPoints = (craneId: string): DiagramPoint[] => {
  return POULIES_DRIVE_GROUPS_POINTS.map(point => mapDriveGroupPointForCrane(point, craneId));
};


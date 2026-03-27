import { type DiagramPoint } from '../types';

export type TukanSystem = 'poulies' | 'translation' | 'rotation' | 'relevage' | 'levage';

type MarkerConfig = {
  id: string;
  xPercent: number;
  yPercent: number;
};

const SYSTEM_LABELS: Record<TukanSystem, string> = {
  poulies: 'SYSTÈME DES POULIES DES CABLES',
  translation: 'SYSTÈME DE TRANSLATION',
  rotation: 'SYSTÈME DE ROTATION',
  relevage: 'SYSTÈME DE RELEVAGE DE LA FLECHE',
  levage: 'SYSTÈME DE LEVAGE',
};

const SYSTEM_COLORS: Record<TukanSystem, string> = {
  poulies: '34, 197, 94',
  translation: '59, 130, 246',
  rotation: '234, 179, 8',
  relevage: '168, 85, 247',
  levage: '14, 116, 144',
};

const SYSTEM_MARKERS: Record<TukanSystem, MarkerConfig[]> = {
  poulies: [
    { id: 'P1', xPercent: 4.98, yPercent: 42.79 },
    { id: 'P2', xPercent: 36.11, yPercent: 8.77 },
    { id: 'P3', xPercent: 72.41, yPercent: 17.81 },
  ],
  levage: [{ id: 'P3', xPercent: 81.85, yPercent: 45.43 }],
  relevage: [
    { id: 'P2', xPercent: 67.08, yPercent: 34.31 },
    { id: 'P3', xPercent: 77.25, yPercent: 29.2 },
  ],
  rotation: [{ id: 'P3', xPercent: 72.89, yPercent: 56.32 }],
  translation: [
    { id: 'P2', xPercent: 77.97, yPercent: 92.77 },
    { id: 'P3', xPercent: 95.88, yPercent: 84.33 },
  ],
};

const buildMarkers = (): DiagramPoint[] => {
  const markers: DiagramPoint[] = [];

  (Object.keys(SYSTEM_MARKERS) as TukanSystem[]).forEach(systemKey => {
    SYSTEM_MARKERS[systemKey].forEach(marker => {
      markers.push({
        id: `${systemKey}:${marker.id}`,
        name: `${SYSTEM_LABELS[systemKey]} ${marker.id}`,
        dbName: '',
        shortDescription: SYSTEM_LABELS[systemKey],
        details: '',
        tagPrimary: '',
        frequency: '',
        plannedAmount: '',
        markerColor: SYSTEM_COLORS[systemKey],
        xPercent: marker.xPercent,
        yPercent: marker.yPercent,
      });
    });
  });

  return markers;
};

export const TUKAN_MARKERS = buildMarkers();

export const getTukanSystemForPoint = (pointId: string): TukanSystem | null => {
  const [systemKey] = pointId.split(':');
  if (systemKey in SYSTEM_LABELS) {
    return systemKey as TukanSystem;
  }

  return null;
};


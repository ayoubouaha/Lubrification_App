import { type DiagramPoint } from '../types';

export type ArdeltK3System = 'poulies' | 'translation' | 'rotation' | 'relevage' | 'levage';

type MarkerConfig = {
  id: string;
  xPercent: number;
  yPercent: number;
};

const SYSTEM_LABELS: Record<ArdeltK3System, string> = {
  poulies: 'SYSTÈME DES POULIES DES CABLES',
  translation: 'SYSTÈME DE TRANSLATION',
  rotation: 'SYSTÈME DE ROTATION',
  relevage: 'SYSTÈME DE RELEVAGE DE LA FLECHE',
  levage: 'SYSTÈME DE LEVAGE',
};

const SYSTEM_COLORS: Record<ArdeltK3System, string> = {
  poulies: '34, 197, 94',
  translation: '59, 130, 246',
  rotation: '234, 179, 8',
  relevage: '168, 85, 247',
  levage: '14, 116, 144',
};

const POINT_OVERRIDES: Partial<
  Record<
    string,
    {
      dbName: string;
      tagPrimary: string;
      frequency: string;
      plannedAmount: string;
    }
  >
> = {
  'poulies:P1': {
    dbName: 'K3-POULIE-R05',
    tagPrimary: 'K3-POULIE-R05 / K3-POULIE-R06 / K3-POULIE-R07 / K3-POULIE-R08',
    frequency: '7 jours',
    plannedAmount: '290 g',
  },
  'poulies:P2': {
    dbName: 'K3-POULIE-R01',
    tagPrimary: 'K3-POULIE-R01 / K3-POULIE-R02 / K3-POULIE-R03 / K3-POULIE-R04',
    frequency: '7 jours',
    plannedAmount: '290 g',
  },
  'poulies:P3': {
    dbName: 'K3-POULIE-R09',
    tagPrimary: 'K3-POULIE-R09 / K3-POULIE-R10 / K3-POULIE-R11 / K3-POULIE-R12',
    frequency: '7 jours',
    plannedAmount: '290 g',
  },
};

const SYSTEM_MARKERS: Record<ArdeltK3System, MarkerConfig[]> = {
  poulies: [
    { id: 'P1', xPercent: 34.36, yPercent: 2.05 },
    { id: 'P2', xPercent: 2.61, yPercent: 67.64 },
    { id: 'P3', xPercent: 75.36, yPercent: 73.37 },
  ],
  translation: [
    { id: 'P1', xPercent: 69.86, yPercent: 97.16 },
    { id: 'P2', xPercent: 93.84, yPercent: 97.16 },
  ],
  rotation: [{ id: 'P1', xPercent: 83.91, yPercent: 54.25 }],
  relevage: [
    { id: 'P1', xPercent: 84.64, yPercent: 35.51 },
    { id: 'P2', xPercent: 73.5, yPercent: 36.19 },
  ],
  levage: [{ id: 'P1', xPercent: 83.43, yPercent: 44.54 }],
};

const OVERVIEW_POULIES_NAV_MARKERS: DiagramPoint[] = [
  {
    id: 'overview-poulies:P1',
    name: 'Navigation poulies P1',
    shortDescription: '',
    details: '',
    tagPrimary: '',
    frequency: '',
    plannedAmount: '',
    markerColor: SYSTEM_COLORS.poulies,
    xPercent: 40.68,
    yPercent: 2.26,
  },
  {
    id: 'overview-poulies:P2',
    name: 'Navigation poulies P2',
    shortDescription: '',
    details: '',
    tagPrimary: '',
    frequency: '',
    plannedAmount: '',
    markerColor: SYSTEM_COLORS.poulies,
    xPercent: 2.22,
    yPercent: 23.1,
  },
  {
    id: 'overview-poulies:P3',
    name: 'Navigation poulies P3',
    shortDescription: '',
    details: '',
    tagPrimary: '',
    frequency: '',
    plannedAmount: '',
    markerColor: SYSTEM_COLORS.poulies,
    xPercent: 84.32,
    yPercent: 26.84,
  },
];

const buildMarkers = (): DiagramPoint[] => {
  const markers: DiagramPoint[] = [];

  (Object.keys(SYSTEM_MARKERS) as ArdeltK3System[]).forEach(systemKey => {
    SYSTEM_MARKERS[systemKey].forEach(marker => {
      const pointId = `${systemKey}:${marker.id}`;
      const override = POINT_OVERRIDES[pointId];
      markers.push({
        id: pointId,
        name: `${SYSTEM_LABELS[systemKey]} ${marker.id}`,
        dbName: override?.dbName,
        shortDescription: SYSTEM_LABELS[systemKey],
        details: '',
        tagPrimary: override?.tagPrimary ?? '',
        frequency: override?.frequency ?? '',
        plannedAmount: override?.plannedAmount ?? '',
        markerColor: SYSTEM_COLORS[systemKey],
        xPercent: marker.xPercent,
        yPercent: marker.yPercent,
      });
    });
  });

  return markers;
};

export const ARDELT_K3_MARKERS = [...buildMarkers(), ...OVERVIEW_POULIES_NAV_MARKERS];

export const getArdeltK3SystemForPoint = (pointId: string): ArdeltK3System | null => {
  if (pointId.startsWith('overview-poulies:')) {
    return 'poulies';
  }

  const [systemKey] = pointId.split(':');
  if (systemKey in SYSTEM_LABELS) {
    return systemKey as ArdeltK3System;
  }

  return null;
};


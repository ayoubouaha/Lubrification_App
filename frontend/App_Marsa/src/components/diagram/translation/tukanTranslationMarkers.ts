import { type DiagramPoint } from '../types';

const SYSTEM_LABEL = 'SYSTÈME DE TRANSLATION';

const MARKERS: Array<{
  id: string;
  name: string;
  xPercent: number;
  yPercent: number;
  color: string;
}> = [
  {
    id: 'translation-nord-a',
    name: '3.1.1. Coté Mer / Nord - A',
    xPercent: 82.88,
    yPercent: 77.04,
    color: '59, 130, 246',
  },
  {
    id: 'translation-sud-b',
    name: '3.1.2. Coté Mer / Sud - B',
    xPercent: 24.69,
    yPercent: 76.51,
    color: '34, 197, 94',
  },
  {
    id: 'translation-sud-c',
    name: '3.1.3. Coté Terre / Sud - C',
    xPercent: 24.37,
    yPercent: 29.87,
    color: '168, 85, 247',
  },
  {
    id: 'translation-nord-d',
    name: '3.1.4. Coté Terre / Nord - D',
    xPercent: 82.69,
    yPercent: 28.63,
    color: '234, 179, 8',
  },
];

export const TUKAN_TRANSLATION_MARKERS: DiagramPoint[] = MARKERS.map(marker => ({
  id: marker.id,
  name: marker.name,
  shortDescription: SYSTEM_LABEL,
  details: '',
  tagPrimary: '',
  frequency: '',
  plannedAmount: '',
  markerLabel: marker.name,
  alwaysShowLabel: true,
  markerLabelVariant: 'arrow',
  markerColor: marker.color,
  xPercent: marker.xPercent,
  yPercent: marker.yPercent,
}));


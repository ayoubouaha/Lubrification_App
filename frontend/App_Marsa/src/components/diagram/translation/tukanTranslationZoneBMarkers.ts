import { type DiagramPoint } from '../types';

const SYSTEM_LABEL = 'SYSTEME DE TRANSLATION';

const buildMarker = (id: string, xPercent: number, yPercent: number, tagPrimary: string, tagSecondary?: string): DiagramPoint => {
  const displayName = tagSecondary ? `${tagPrimary} / ${tagSecondary}` : tagPrimary;

  return {
    id,
    name: displayName,
    shortDescription: SYSTEM_LABEL,
    details: '',
    tagPrimary,
    tagSecondary,
    frequency: '',
    plannedAmount: '',
    xPercent,
    yPercent,
  };
};

export const TUKAN_TRANSLATION_ZONE_B_MARKERS: DiagramPoint[] = [
  buildMarker('tukan-translation-b-02', 16.81, 88.31, 'T2-STR-B02'),
  buildMarker('tukan-translation-b-03', 40.55, 75.3, 'T2-STR-B03'),
  buildMarker('tukan-translation-b-04', 71.56, 46.69, 'T2-STR-B04'),
  buildMarker('tukan-translation-b-05', 85.85, 34.99, 'T2-STR-B05'),
  buildMarker('tukan-translation-b-07-08', 20.69, 83.22, 'T2-STR-B07', 'T2-STR-B08'),
  buildMarker('tukan-translation-b-06', 93.84, 29.78, 'T2-STR-B06'),
  buildMarker('tukan-translation-b-11-12', 73.98, 35.96, 'T2-STR-B11', 'T2-STR-B12'),
  buildMarker('tukan-translation-b-13-14', 80.76, 23.93, 'T2-STR-B13', 'T2-STR-B14'),
  buildMarker('tukan-translation-b-17-18', 25.53, 65.49, 'T2-STR-B17', 'T2-STR-B18'),
  buildMarker('tukan-translation-b-15-16', 54.84, 42.79, 'T2-STR-B15', 'T2-STR-B16'),
  buildMarker('tukan-translation-b-09-10', 28.44, 76.51, 'T2-STR-B09', 'T2-STR-B10'),
  buildMarker('tukan-translation-b-01', 8.34, 94.81, 'T2-STR-B01'),
];


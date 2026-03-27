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

export const TUKAN_TRANSLATION_ZONE_D_MARKERS: DiagramPoint[] = [
  buildMarker('tukan-translation-d-02', 16.81, 88.31, 'T2-STR-D02'),
  buildMarker('tukan-translation-d-03', 40.55, 75.3, 'T2-STR-D03'),
  buildMarker('tukan-translation-d-04', 71.56, 46.69, 'T2-STR-D04'),
  buildMarker('tukan-translation-d-05', 85.85, 34.99, 'T2-STR-D05'),
  buildMarker('tukan-translation-d-07-08', 20.69, 83.22, 'T2-STR-D07', 'T2-STR-D08'),
  buildMarker('tukan-translation-d-06', 93.84, 29.78, 'T2-STR-D06'),
  buildMarker('tukan-translation-d-11-12', 73.98, 35.96, 'T2-STR-D11', 'T2-STR-D12'),
  buildMarker('tukan-translation-d-13-14', 80.76, 23.93, 'T2-STR-D13', 'T2-STR-D14'),
  buildMarker('tukan-translation-d-17-18', 25.53, 65.49, 'T2-STR-D17', 'T2-STR-D18'),
  buildMarker('tukan-translation-d-15-16', 54.84, 42.79, 'T2-STR-D15', 'T2-STR-D16'),
  buildMarker('tukan-translation-d-09-10', 28.44, 76.51, 'T2-STR-D09', 'T2-STR-D10'),
  buildMarker('tukan-translation-d-01', 8.34, 94.81, 'T2-STR-D01'),
];


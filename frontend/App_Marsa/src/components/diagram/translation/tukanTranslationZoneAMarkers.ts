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

export const TUKAN_TRANSLATION_ZONE_A_MARKERS: DiagramPoint[] = [
  buildMarker('tukan-translation-a-19-20', 23.04, 63.29, 'T2-STR-A19', 'T2-STR-A20'),
  buildMarker('tukan-translation-a-06', 81.85, 29.77, 'T2-STR-A06'),
  buildMarker('tukan-translation-a-11-12', 25.7, 73.89, 'T2-STR-A11', 'T2-STR-A12'),
  buildMarker('tukan-translation-a-17-18', 48.94, 40.31, 'T2-STR-A17', 'T2-STR-A18'),
  buildMarker('tukan-translation-a-21-22', 94.19, 22.98, 'T2-STR-A21', 'T2-STR-A22'),
  buildMarker('tukan-translation-a-09-10', 19.9, 78.49, 'T2-STR-A09', 'T2-STR-A10'),
  buildMarker('tukan-translation-a-15-16', 71.92, 21.21, 'T2-STR-A15', 'T2-STR-A16'),
  buildMarker('tukan-translation-a-13-14', 68.54, 31.43, 'T2-STR-A13', 'T2-STR-A14'),
  buildMarker('tukan-translation-a-03', 36.84, 71.07, 'T2-STR-A03'),
  buildMarker('tukan-translation-a-04', 61.76, 49.5, 'T2-STR-A04'),
  buildMarker('tukan-translation-a-07-08', 68.29, 45.1, 'T2-STR-A07', 'T2-STR-A08'),
  buildMarker('tukan-translation-a-01', 9.73, 90.16, 'T2-STR-A01'),
  buildMarker('tukan-translation-a-02', 16.75, 84.85, 'T2-STR-A02'),
  buildMarker('tukan-translation-a-05', 75.07, 36.49, 'T2-STR-A05'),
];


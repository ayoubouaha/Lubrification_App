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

export const TUKAN_TRANSLATION_ZONE_C_MARKERS: DiagramPoint[] = [
  buildMarker('tukan-translation-c-19-20', 23.04, 63.29, 'T2-STR-C19', 'T2-STR-C20'),
  buildMarker('tukan-translation-c-06', 81.85, 29.77, 'T2-STR-C06'),
  buildMarker('tukan-translation-c-11-12', 25.7, 73.89, 'T2-STR-C11', 'T2-STR-C12'),
  buildMarker('tukan-translation-c-17-18', 48.94, 40.31, 'T2-STR-C17', 'T2-STR-C18'),
  buildMarker('tukan-translation-c-09-10', 19.9, 78.49, 'T2-STR-C09', 'T2-STR-C10'),
  buildMarker('tukan-translation-c-15-16', 71.92, 21.21, 'T2-STR-C15', 'T2-STR-C16'),
  buildMarker('tukan-translation-c-13-14', 68.54, 31.43, 'T2-STR-C13', 'T2-STR-C14'),
  buildMarker('tukan-translation-c-03', 36.84, 71.07, 'T2-STR-C03'),
  buildMarker('tukan-translation-c-04', 61.76, 49.5, 'T2-STR-C04'),
  buildMarker('tukan-translation-c-07-08', 68.29, 45.1, 'T2-STR-C07', 'T2-STR-C08'),
  buildMarker('tukan-translation-c-01', 9.73, 90.16, 'T2-STR-C01'),
  buildMarker('tukan-translation-c-02', 16.75, 84.85, 'T2-STR-C02'),
  buildMarker('tukan-translation-c-05', 75.07, 36.49, 'T2-STR-C05'),
];


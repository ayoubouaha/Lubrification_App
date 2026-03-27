import { type DiagramPoint } from '../types';

const buildPoint = (id: string, xPercent: number, yPercent: number, tagPrimary: string): DiagramPoint => {
  return {
    id,
    name: tagPrimary,
    shortDescription: '',
    details: '',
    tagPrimary,
    dbName: tagPrimary,
    frequency: '',
    plannedAmount: '',
    xPercent,
    yPercent,
  };
};

export const TUKAN_LEVAGE_DRIVE_GROUPS_POINTS: DiagramPoint[] = [
  buildPoint('tukan-levage-m04', 38.37, 8.82, 'T2-SLEV-M04'),
  buildPoint('tukan-levage-m03', 23.11, 15.27, 'T2-SLEV-M03'),
  buildPoint('tukan-levage-t06', 7.37, 31.34, 'T2-SLEV-T06'),
  buildPoint('tukan-levage-t05', 36.19, 55.12, 'T2-SLEV-T05'),
  buildPoint('tukan-levage-m01', 52.91, 45.8, 'T2-SLEV-M01'),
  buildPoint('tukan-levage-m02', 65.5, 36.47, 'T2-SLEV-M02'),
  buildPoint('tukan-levage-t01', 76.4, 62.82, 'T2-SLEV-T01'),
  buildPoint('tukan-levage-t02', 86.82, 54.31, 'T2-SLEV-T02'),
  buildPoint('tukan-levage-t03', 52.91, 34.04, 'T2-SLEV-T03'),
  buildPoint('tukan-levage-t04', 62.11, 24.71, 'T2-SLEV-T04'),
];


import { type DiagramPoint } from '../types';

const buildPoint = (
  id: string,
  xPercent: number,
  yPercent: number,
  tagPrimary: string,
  tagSecondary?: string,
): DiagramPoint => {
  const displayName = tagSecondary ? `${tagPrimary} / ${tagSecondary}` : tagPrimary;

  return {
    id,
    name: displayName,
    shortDescription: '',
    details: '',
    tagPrimary,
    tagSecondary,
    dbName: tagPrimary,
    frequency: '',
    plannedAmount: '',
    xPercent,
    yPercent,
  };
};

export const TUKAN_RELEVAGE_DRIVE_GROUPS_POINTS: DiagramPoint[] = [
  buildPoint('tukan-relevage-drive-p01', 3.13, 8.14, 'T2-FLECHE-P01'),
  buildPoint('tukan-relevage-drive-r01', 58.88, 86.28, 'T2-FLECHE-R01'),
  buildPoint('tukan-relevage-drive-r02-r03', 70.64, 57.92, 'T2-FLECHE-R02', 'T2-FLECHE-R03'),
  buildPoint('tukan-relevage-drive-m02', 88.94, 68.73, 'T2-FLECHE-M02'),
  buildPoint('tukan-relevage-drive-m01', 79.57, 71.45, 'T2-FLECHE-M01'),
];


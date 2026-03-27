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

export const TUKAN_ROTATION_DRIVE_GROUPS_LEFT_POINTS: DiagramPoint[] = [
  buildPoint('tukan-rotation-left-1', 43.02, 11.52, 'T2-SROT-M01'),
  buildPoint('tukan-rotation-left-2', 41.11, 24.35, 'T2-SROT-M02'),
];

export const TUKAN_ROTATION_DRIVE_GROUPS_RIGHT_POINTS: DiagramPoint[] = [
  buildPoint('tukan-rotation-right-1', 61.52, 11.06, 'T2-SROT-M03'),
  buildPoint('tukan-rotation-right-2', 61.52, 25.27, 'T2-SROT-M04'),
];


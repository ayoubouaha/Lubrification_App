import { type DiagramPoint } from '../types';

const buildPoint = (
  id: string,
  xPercent: number,
  yPercent: number,
  tagPrimary: string,
  dbName: string,
  frequency: string,
  plannedAmount: string,
): DiagramPoint => {
  return {
    id,
    name: id,
    shortDescription: '',
    details: '',
    tagPrimary,
    dbName,
    frequency,
    plannedAmount,
    xPercent,
    yPercent,
  };
};

export const ROTATION_DRIVE_GROUPS_LEFT_POINTS: DiagramPoint[] = [
  buildPoint('drive-left-1', 50.87, 7.56, 'K3-SROT-M01', 'T2-SROT-M01', '02,5ans', '30g'),
  buildPoint('drive-left-2', 50.5, 25.73, 'K3-SROT-M02', 'T2-SROT-M02', '02,5ans', '30g'),
];

export const ROTATION_DRIVE_GROUPS_RIGHT_POINTS: DiagramPoint[] = [
  buildPoint('drive-right-1', 57.97, 8.15, 'K3-SROT-M03', 'T2-SROT-M03', '02,5ans', '30g'),
  buildPoint('drive-right-2', 57.76, 25.47, 'K3-SROT-M04', 'T2-SROT-M04', '02,5ans', '30g'),
];


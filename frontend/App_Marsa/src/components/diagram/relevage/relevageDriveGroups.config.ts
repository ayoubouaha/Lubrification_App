import { type DiagramPoint } from '../types';

const buildPoint = (
  id: string,
  xPercent: number,
  yPercent: number,
  tagPrimary: string,
  frequency: string,
  plannedAmount: string,
): DiagramPoint => {
  return {
    id,
    name: id,
    shortDescription: '',
    details: '',
    tagPrimary,
    frequency,
    plannedAmount,
    xPercent,
    yPercent,
  };
};

export const RELEVAGE_DRIVE_GROUPS_POINTS: DiagramPoint[] = [
  buildPoint('relevage-drive-1', 71.2, 4.75, 'K3-FLECHE-P01', '07j', '2000g'),
  buildPoint('relevage-drive-2', 89.81, 75.27, 'K3-FLECHE-M01', '03ans', '30g'),
  buildPoint('relevage-drive-3', 34.42, 15.24, 'K3-FLECHE-R02/R03', '07j', '500g'),
  buildPoint('relevage-drive-4', 62, 77.32, 'K3-FLECHE-M02', '03ans', '30g'),
  buildPoint('relevage-drive-5', 7.31, 76.76, 'K3-FLECHE-R01', '07j', '200g'),
];


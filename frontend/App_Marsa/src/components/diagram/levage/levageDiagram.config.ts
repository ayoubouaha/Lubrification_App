import { type DiagramPoint } from '../types';

const buildPoint = (id: string, xPercent: number, yPercent: number): DiagramPoint => {
  return {
    id,
    name: id,
    shortDescription: '',
    details: '',
    tagPrimary: '',
    frequency: '',
    plannedAmount: '',
    xPercent,
    yPercent,
  };
};

export const LEVAGE_LINK_POINTS: DiagramPoint[] = [
  buildPoint('levage-drive-link-1', 80.46, 89.09),
  buildPoint('levage-drive-link-2', 88.01, 89.09),
];


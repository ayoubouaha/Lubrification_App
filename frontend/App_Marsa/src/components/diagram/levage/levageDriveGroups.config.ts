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

export const LEVAGE_DRIVE_GROUPS_POINTS: DiagramPoint[] = [
  buildPoint('levage-drive-1', 64.44, 13.92, 'K3-SLEV-M03', '02ans', '40g'),
  buildPoint('levage-drive-2', 42.47, 11.48, 'K3-SLEV-M04', '02ans', '40g'),
  buildPoint('levage-drive-3', 22.49, 4.96, 'K3-SLEV-T06', '07j', '10g'),
  buildPoint('levage-drive-4', 22.49, 53.38, 'K3-SLEV-T05', '07j', '10g'),
  buildPoint('levage-drive-5', 42.18, 60.41, 'K3-SLEV-M02', '02ans', '40g'),
  buildPoint('levage-drive-6', 65.01, 60.41, 'K3-SLEV-M01', '02ans', '40g'),
  buildPoint('levage-drive-7', 51.6, 96.79, 'K3-SLEV-T01', '07j', '25g'),
  buildPoint('levage-drive-8', 71, 97.04, 'K3-SLEV-T02', '07j', '25g'),
  buildPoint('levage-drive-9', 54.17, 48.62, 'K3-SLEV-T03', '07j', '25g'),
  buildPoint('levage-drive-10', 70.43, 49.12, 'K3-SLEV-T04', '07j', '25g'),
];


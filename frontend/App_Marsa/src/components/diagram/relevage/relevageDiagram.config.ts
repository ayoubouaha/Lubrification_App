import { type DiagramPoint } from '../types';

const buildPoint = (
  id: string,
  xPercent: number,
  yPercent: number,
  markerLabel: string,
  markerColor: string,
  action?: 'relevage-drive-groups',
): DiagramPoint => {
  return {
    id,
    name: markerLabel,
    markerLabel,
    markerColor,
    action,
    shortDescription: '',
    details: '',
    tagPrimary: '',
    frequency: '',
    plannedAmount: '',
    xPercent,
    yPercent,
  };
};

export const RELEVAGE_LINK_POINTS: DiagramPoint[] = [
  buildPoint(
    'relevage-link-1',
    54.56,
    79.94,
    "Groupe d'entrainement",
    '34, 197, 94',
    'relevage-drive-groups',
  ),
  buildPoint('relevage-link-2', 49.33, 76.32, 'Crémaillère', '59, 130, 246'),
  buildPoint('relevage-link-3', 91.7, 74.96, 'Crémaillère', '59, 130, 246'),
];


import type { ComponentType } from 'react';
import {
  ArrowLeftRight,
  ArrowUpDown,
  Droplet,
  LayoutDashboard,
  Link2,
  RotateCw,
  Wrench,
} from 'lucide-react';

export interface SidebarItem {
  id: string;
  label: string;
  to?: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  children?: SidebarItem[];
}

const POINTS_DE_GRAISSAGE = (craneId: 'ardelt' | 'tukan'): SidebarItem => ({
  id: `${craneId}:points` ,
  label: 'Points de graissage',
  icon: Droplet,
  children: [
    {
      id: `${craneId}:translation`,
      label: 'SYSTÈME DE TRANSLATION',
      to: `/crane/${craneId}/points/translation`,
      icon: ArrowLeftRight,
      children: [
        { id: `${craneId}:translation:nord-a`, label: 'Côté Mer / Nord - A', to: `/crane/${craneId}/points/translation/nord-a` },
        { id: `${craneId}:translation:sud-b`, label: 'Côté Mer / Sud - B', to: `/crane/${craneId}/points/translation/sud-b` },
        { id: `${craneId}:translation:sud-c`, label: 'Côté Terre / Sud - C', to: `/crane/${craneId}/points/translation/sud-c` },
        { id: `${craneId}:translation:nord-d`, label: 'Côté Terre / Nord - D', to: `/crane/${craneId}/points/translation/nord-d` },
      ],
    },
    {
      id: `${craneId}:rotation`,
      label: 'SYSTÈME DE ROTATION',
      to: `/crane/${craneId}/points/rotation`,
      icon: RotateCw,
      children: [
        { id: `${craneId}:rotation:groups`, label: 'Groupes d’entraînement', to: `/crane/${craneId}/points/rotation/groupes` },
      ],
    },
    {
      id: `${craneId}:relevage`,
      label: 'SYSTÈME DE RELEVAGE DE LA FLÈCHE',
      to: `/crane/${craneId}/points/relevage`,
      icon: ArrowUpDown,
      children: [
        { id: `${craneId}:relevage:groups`, label: 'Groupes d’entraînement', to: `/crane/${craneId}/points/relevage/groupes` },
      ],
    },
    {
      id: `${craneId}:levage`,
      label: 'SYSTÈME DE LEVAGE',
      to: `/crane/${craneId}/points/levage`,
      icon: ArrowUpDown,
      children: [
        { id: `${craneId}:levage:groups`, label: 'Groupes d’entraînement', to: `/crane/${craneId}/points/levage/groupes` },
      ],
    },
    {
      id: `${craneId}:poulies`,
      label: 'SYSTÈME DES POULIES DES CÂBLES',
      to: `/crane/${craneId}/points/poulies`,
      icon: Link2,
      children: [
        { id: `${craneId}:poulies:groups`, label: 'Groupes d’entrainement', to: `/crane/${craneId}/points/poulies/groupes` },
      ],
    },
  ],
});

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    to: '/crane/:craneId/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'ardelt',
    label: 'KRANBAU K1, K2 (38T)',
    to: '/crane/ardelt/ardelt-k3',
    icon: Wrench,
    children: [POINTS_DE_GRAISSAGE('ardelt')],
  },
  {
    id: 'tukan',
    label: 'TUKAN 2, 3 (40T)',
    to: '/crane/tukan/tukan',
    icon: Wrench,
    children: [POINTS_DE_GRAISSAGE('tukan')],
  },
];

export const resolveSidebarTo = (to: string, currentCraneId: string) => {
  return to.replace(':craneId', currentCraneId);
};

export interface NavigationItem {
  label: string;
  href?: string;
  children?: NavigationItem[];
}

const POINTS_DE_GRAISSAGE_CHILDREN: NavigationItem[] = [
  {
    label: 'SYSTÈME DE TRANSLATION',
    children: [
      { label: 'Coté Mer / Nord - A', href: '#' },
      { label: 'Coté Mer / Sud - B', href: '#' },
      { label: 'Coté Mer / Sud - C', href: '#' },
      { label: 'Coté Mer / Nord - D', href: '#' },
    ],
  },
  {
    label: 'SYSTÈME DE ROTATION',
    children: [{ label: 'Groupes d’entrainement', href: 'rotation-drive-groups' }],
  },
  {
    label: 'SYSTÈME DE RELEVAGE DE LA FLECHE',
    children: [{ label: 'Groupes d’entrainement', href: 'relevage-drive-groups' }],
  },
  {
    label: 'SYSTÈME DE LEVAGE',
    children: [{ label: 'Groupes d’entrainement', href: 'levage-drive-groups' }],
  },
  {
    label: 'SYSTÈME DES POULIES DES CABLES',
  },
];

const SHARED_CRANE_ITEMS: NavigationItem[] = [
  {
    label: 'Points de graissage',
    children: POINTS_DE_GRAISSAGE_CHILDREN,
  },
];

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Dashboard', href: '#' },
  {
    label: 'ARDELT K3',
    children: SHARED_CRANE_ITEMS,
  },
  {
    label: '3. TUKAN 2, 3 (40T)',
    children: SHARED_CRANE_ITEMS,
  },
];
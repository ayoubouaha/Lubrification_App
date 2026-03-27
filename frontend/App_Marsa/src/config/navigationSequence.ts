/**
 * Defines the sequential navigation order for diagram pages.
 * This configuration controls the Next/Previous button flow.
 */

export type PageId = 
  | 'nord-a'
  | 'sud-b'
  | 'sud-c'
  | 'nord-d'
  | 'rotation'
  | 'relevage'
  | 'levage'
  | 'poulies';

export interface NavigationSequenceItem {
  id: PageId;
  title: string;
  description?: string;
}

/**
 * The main navigation sequence for crane systems.
 * Defines the order users navigate through when using Next/Previous buttons.
 */
export const NAVIGATION_SEQUENCE: NavigationSequenceItem[] = [
  {
    id: 'nord-a',
    title: 'Coté Mer / Nord - A',
    description: 'SYSTÈME DE TRANSLATION - Zone A',
  },
  {
    id: 'sud-b',
    title: 'Coté Mer / Sud - B',
    description: 'SYSTÈME DE TRANSLATION - Zone B',
  },
  {
    id: 'sud-c',
    title: 'Coté Mer / Sud - C',
    description: 'SYSTÈME DE TRANSLATION - Zone C',
  },
  {
    id: 'nord-d',
    title: 'Coté Mer / Nord - D',
    description: 'SYSTÈME DE TRANSLATION - Zone D',
  },
  {
    id: 'rotation',
    title: 'SYSTÈME DE ROTATION',
    description: 'Groupes d\'entrainement',
  },
  {
    id: 'relevage',
    title: 'SYSTÈME DE RELEVAGE DE LA FLÈCHE',
    description: 'Groupes d\'entrainement',
  },
  {
    id: 'levage',
    title: 'SYSTÈME DE LEVAGE',
    description: 'Groupes d\'entrainement',
  },
  {
    id: 'poulies',
    title: 'SYSTÈME DES POULIES DES CÂBLES',
    description: 'Poulies et câbles',
  },
];

/**
 * Get the navigation item by its ID.
 */
export const getNavigationItem = (id: PageId): NavigationSequenceItem | null => {
  return NAVIGATION_SEQUENCE.find(item => item.id === id) || null;
};

/**
 * Get the index of a page in the sequence.
 * Returns -1 if not found.
 */
export const getPageIndex = (pageId: PageId): number => {
  return NAVIGATION_SEQUENCE.findIndex(item => item.id === pageId);
};

/**
 * Get the next page ID in sequence.
 * Returns null if on the last page.
 */
export const getNextPageId = (currentPageId: PageId): PageId | null => {
  const currentIndex = getPageIndex(currentPageId);
  if (currentIndex === -1 || currentIndex >= NAVIGATION_SEQUENCE.length - 1) {
    return null;
  }
  return NAVIGATION_SEQUENCE[currentIndex + 1].id;
};

/**
 * Get the previous page ID in sequence.
 * Returns null if on the first page.
 */
export const getPreviousPageId = (currentPageId: PageId): PageId | null => {
  const currentIndex = getPageIndex(currentPageId);
  if (currentIndex <= 0) {
    return null;
  }
  return NAVIGATION_SEQUENCE[currentIndex - 1].id;
};

/**
 * Check if a page is the last in the sequence.
 */
export const isLastPage = (pageId: PageId): boolean => {
  const index = getPageIndex(pageId);
  return index === NAVIGATION_SEQUENCE.length - 1;
};

/**
 * Check if a page is the first in the sequence.
 */
export const isFirstPage = (pageId: PageId): boolean => {
  return getPageIndex(pageId) === 0;
};

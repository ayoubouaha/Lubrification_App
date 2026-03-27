import type { ZoneKey } from '../components/diagram/zones/zoneDiagram.config';

export type TranslationZoneStepId = `translation:${ZoneKey}`;

export type StepId =
  | 'dashboard'
  | 'ardelt-k3'
  | 'tukan'
  | 'translation'
  | TranslationZoneStepId
  | 'rotation'
  | 'rotation:drive-groups'
  | 'relevage'
  | 'relevage:drive-groups'
  | 'levage'
  | 'levage:drive-groups'
  | 'poulies'
  | 'poulies:drive-groups';

export interface StepDefinition {
  id: StepId;
  title: string;
  description?: string;
}

export const TRANSLATION_ZONE_STEPS: StepDefinition[] = [
  {
    id: 'translation:nord-a',
    title: 'Côté Mer / Nord - A',
    description: 'SYSTÈME DE TRANSLATION - Zone A',
  },
  {
    id: 'translation:sud-b',
    title: 'Côté Mer / Sud - B',
    description: 'SYSTÈME DE TRANSLATION - Zone B',
  },
  {
    id: 'translation:sud-c',
    title: 'Côté Terre / Sud - C',
    description: 'SYSTÈME DE TRANSLATION - Zone C',
  },
  {
    id: 'translation:nord-d',
    title: 'Côté Terre / Nord - D',
    description: 'SYSTÈME DE TRANSLATION - Zone D',
  },
];

/**
 * Technician flow (Précédente / Suivante).
 * Keeps the order identical for ARDELT and TUKAN.
 */
export const STEP_SEQUENCE: StepDefinition[] = [
  {
    id: 'translation',
    title: 'SYSTÈME DE TRANSLATION',
  },
  ...TRANSLATION_ZONE_STEPS,
  {
    id: 'rotation',
    title: 'SYSTÈME DE ROTATION',
  },
  {
    id: 'rotation:drive-groups',
    title: 'Groupes d’entraînement',
    description: 'SYSTÈME DE ROTATION',
  },
  {
    id: 'relevage',
    title: 'SYSTÈME DE RELEVAGE DE LA FLÈCHE',
  },
  {
    id: 'relevage:drive-groups',
    title: 'Groupes d’entraînement',
    description: 'SYSTÈME DE RELEVAGE DE LA FLÈCHE',
  },
  {
    id: 'levage',
    title: 'SYSTÈME DE LEVAGE',
  },
  {
    id: 'levage:drive-groups',
    title: 'Groupes d’entraînement',
    description: 'SYSTÈME DE LEVAGE',
  },
  {
    id: 'poulies',
    title: 'SYSTÈME DES POULIES DES CÂBLES',
  },
  {
    id: 'poulies:drive-groups',
    title: 'Groupes d’entrainement',
    description: 'SYSTÈME DES POULIES DES CÂBLES',
  },
];

export const getStepDefinition = (id: StepId): StepDefinition | null => {
  return STEP_SEQUENCE.find(step => step.id === id) ?? null;
};

export const getStepIndex = (id: StepId): number => {
  return STEP_SEQUENCE.findIndex(step => step.id === id);
};

export const getNextStepId = (current: StepId): StepId | null => {
  const index = getStepIndex(current);
  if (index === -1 || index >= STEP_SEQUENCE.length - 1) return null;
  return STEP_SEQUENCE[index + 1].id;
};

export const getPreviousStepId = (current: StepId): StepId | null => {
  const index = getStepIndex(current);
  if (index <= 0) return null;
  return STEP_SEQUENCE[index - 1].id;
};

export const isFirstStep = (id: StepId): boolean => getStepIndex(id) === 0;

export const isLastStep = (id: StepId): boolean => getStepIndex(id) === STEP_SEQUENCE.length - 1;

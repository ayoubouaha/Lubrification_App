import { useNavigate, useParams } from 'react-router-dom';
import type { StepId } from '../navigation/steps';
import {
  getNextStepId,
  getPreviousStepId,
  getStepDefinition,
  isFirstStep,
  isLastStep,
} from '../navigation/steps';
import { stepToPath } from '../navigation/paths';

/**
 * Hook for managing sequential navigation through the technician flow.
 * Navigation is URL-based (no location.state), so refresh/back works reliably.
 */
export const useSequentialNavigation = (currentStepId: StepId) => {
  const navigate = useNavigate();
  const { craneId } = useParams();

  const navigateToStep = (stepId: StepId) => {
    if (!craneId) return;
    navigate(stepToPath(craneId, stepId));
  };

  const handleNextClick = () => {
    const nextStepId = getNextStepId(currentStepId);
    if (nextStepId) {
      navigateToStep(nextStepId);
    }
  };

  const handlePreviousClick = () => {
    const prevStepId = getPreviousStepId(currentStepId);
    if (prevStepId) {
      navigateToStep(prevStepId);
    }
  };

  const nextStepId = getNextStepId(currentStepId);
  const previousStepId = getPreviousStepId(currentStepId);
  const nextStepInfo = nextStepId ? getStepDefinition(nextStepId) : null;
  const previousStepInfo = previousStepId ? getStepDefinition(previousStepId) : null;

  return {
    handleNextClick,
    handlePreviousClick,
    hasNext: nextStepId !== null,
    hasPrevious: previousStepId !== null,
    isFirst: isFirstStep(currentStepId),
    isLast: isLastStep(currentStepId),
    nextStepId,
    previousStepId,
    nextStepInfo,
    previousStepInfo,
  };
};

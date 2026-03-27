import InteractiveDiagram from '../InteractiveDiagram/InteractiveDiagram';
import {
  ROTATION_DRIVE_GROUPS_LEFT_POINTS,
  ROTATION_DRIVE_GROUPS_RIGHT_POINTS,
} from './rotationDriveGroups.config';
import {
  TUKAN_ROTATION_DRIVE_GROUPS_LEFT_POINTS,
  TUKAN_ROTATION_DRIVE_GROUPS_RIGHT_POINTS,
} from './rotationDriveGroups.tukan.config';
import './RotationDriveGroupsPage.css';
import { useCrane } from '../../../hooks/useCrane';
import { useSequentialNavigation } from '../../../hooks/useSequentialNavigation';
import SequentialNavigationButtons from '../SequentialNavigationButtons/SequentialNavigationButtons';
import { useLocation } from 'react-router-dom';

const RotationDriveGroupsPage = () => {
  const { id, images } = useCrane();
  const location = useLocation();
  const isTukan = id === 'tukan';
  const focusPointId =
    (location.state as { focusPointId?: string } | null)?.focusPointId ?? '';
  const leftPoints = isTukan ? TUKAN_ROTATION_DRIVE_GROUPS_LEFT_POINTS : ROTATION_DRIVE_GROUPS_LEFT_POINTS;
  const rightPoints = isTukan ? TUKAN_ROTATION_DRIVE_GROUPS_RIGHT_POINTS : ROTATION_DRIVE_GROUPS_RIGHT_POINTS;
  const leftFocus = leftPoints.some(point => point.id === focusPointId) ? focusPointId : '';
  const rightFocus = rightPoints.some(point => point.id === focusPointId) ? focusPointId : '';
  const {
    handleNextClick,
    handlePreviousClick,
    hasNext,
    hasPrevious,
    nextStepInfo,
    previousStepInfo,
  } = useSequentialNavigation('rotation:drive-groups');

  return (
    <section className="rotation-groups" aria-label="Groupes d'entrainement">
      <header className="rotation-groups__header">
        <h1 className="rotation-groups__title">Groupes d'entrainement</h1>
      </header>

      <div className="rotation-groups__grid">
        <InteractiveDiagram
          title="Groupes d'entrainement gauche"
          subtitle=""
          imageSrc={images.rotationDriveGroups}
          imageAlt="Schema groupes d'entrainement gauche"
          points={leftPoints}
          size="compact"
          showHeader={false}
          initialActivePointId={leftFocus}
        />
        <InteractiveDiagram
          title="Groupes d'entrainement droite"
          subtitle=""
          imageSrc={images.rotationDriveGroups}
          imageAlt="Schema groupes d'entrainement droite"
          points={rightPoints}
          size="compact"
          showHeader={false}
          initialActivePointId={rightFocus}
        />
      </div>

      <SequentialNavigationButtons
        onNextClick={handleNextClick}
        onPreviousClick={handlePreviousClick}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        nextLabel={nextStepInfo?.title}
        previousLabel={previousStepInfo?.title}
      />
    </section>
  );
};

export default RotationDriveGroupsPage;

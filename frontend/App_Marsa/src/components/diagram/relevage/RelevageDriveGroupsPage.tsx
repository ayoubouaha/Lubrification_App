import InteractiveDiagram from '../InteractiveDiagram/InteractiveDiagram';
import { RELEVAGE_DRIVE_GROUPS_POINTS } from './relevageDriveGroups.config';
import { TUKAN_RELEVAGE_DRIVE_GROUPS_POINTS } from './relevageDriveGroups.tukan.config';
import { useCrane } from '../../../hooks/useCrane';
import { useSequentialNavigation } from '../../../hooks/useSequentialNavigation';
import SequentialNavigationButtons from '../SequentialNavigationButtons/SequentialNavigationButtons';
import { useLocation } from 'react-router-dom';

const RelevageDriveGroupsPage = () => {
  const { id, images } = useCrane();
  const location = useLocation();
  const isTukan = id === 'tukan';
  const focusPointId =
    (location.state as { focusPointId?: string } | null)?.focusPointId ?? '';
  const points = isTukan ? TUKAN_RELEVAGE_DRIVE_GROUPS_POINTS : RELEVAGE_DRIVE_GROUPS_POINTS;
  const initialActivePointId = points.some(point => point.id === focusPointId) ? focusPointId : '';
  const {
    handleNextClick,
    handlePreviousClick,
    hasNext,
    hasPrevious,
    nextStepInfo,
    previousStepInfo,
  } = useSequentialNavigation('relevage:drive-groups');

  return (
    <div className="relevage-drive-groups-page">
      <InteractiveDiagram
        title="Groupes d'entrainement"
        subtitle=""
        imageSrc={images.relevageDriveGroups}
        imageAlt="Schema relevage fleche groupes d'entrainement"
        points={points}
        size="compact"
        enableCoordinatePicker
        initialActivePointId={initialActivePointId}
      />
      <SequentialNavigationButtons
        onNextClick={handleNextClick}
        onPreviousClick={handlePreviousClick}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        nextLabel={nextStepInfo?.title}
        previousLabel={previousStepInfo?.title}
      />
    </div>
  );
};

export default RelevageDriveGroupsPage;

import InteractiveDiagram from '../InteractiveDiagram/InteractiveDiagram';
import { LEVAGE_DRIVE_GROUPS_POINTS } from './levageDriveGroups.config';
import { TUKAN_LEVAGE_DRIVE_GROUPS_POINTS } from './levageDriveGroups.tukan.config';
import { useCrane } from '../../../hooks/useCrane';
import { useSequentialNavigation } from '../../../hooks/useSequentialNavigation';
import SequentialNavigationButtons from '../SequentialNavigationButtons/SequentialNavigationButtons';
import { useLocation } from 'react-router-dom';

const LevageDriveGroupsPage = () => {
  const { id, images } = useCrane();
  const location = useLocation();
  const isTukan = id === 'tukan';
  const focusPointId =
    (location.state as { focusPointId?: string } | null)?.focusPointId ?? '';
  const points = isTukan ? TUKAN_LEVAGE_DRIVE_GROUPS_POINTS : LEVAGE_DRIVE_GROUPS_POINTS;
  const initialActivePointId = points.some(point => point.id === focusPointId) ? focusPointId : '';
  const {
    handleNextClick,
    handlePreviousClick,
    hasNext,
    hasPrevious,
    nextStepInfo,
    previousStepInfo,
  } = useSequentialNavigation('levage:drive-groups');

  return (
    <div className="levage-drive-groups-page">
      <InteractiveDiagram
        title="Groupes d'entrainement"
        subtitle=""
        imageSrc={images.levageDriveGroups}
        imageAlt="Schema levage groupes d'entrainement"
        points={points}
        size={isTukan ? 'compact' : 'small'}
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

export default LevageDriveGroupsPage;

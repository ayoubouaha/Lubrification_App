import InteractiveDiagram from '../InteractiveDiagram/InteractiveDiagram';
import { useCrane } from '../../../hooks/useCrane';
import { useSequentialNavigation } from '../../../hooks/useSequentialNavigation';
import SequentialNavigationButtons from '../SequentialNavigationButtons/SequentialNavigationButtons';
import { getPouliesDriveGroupsPoints } from './pouliesPoints';
import './PouliesDriveGroupsPage.css';
import { useLocation } from 'react-router-dom';

const PouliesDriveGroupsPage = () => {
  const { id, images } = useCrane();
  const location = useLocation();
  const points = getPouliesDriveGroupsPoints(id);
  const focusPointId =
    (location.state as { focusPointId?: string } | null)?.focusPointId ?? '';
  const initialActivePointId = points.some(point => point.id === focusPointId) ? focusPointId : '';
  const {
    handleNextClick,
    handlePreviousClick,
    hasNext,
    hasPrevious,
    nextStepInfo,
    previousStepInfo,
  } = useSequentialNavigation('poulies:drive-groups');

  return (
    <section className="poulies-drive-groups" aria-label="Groupes d'entrainement poulies">
      <header className="poulies-drive-groups__header">
        <h1 className="poulies-drive-groups__title">Groupes d'entrainement</h1>
      </header>

      <div className="poulies-drive-groups__single">
        <InteractiveDiagram
          title="Groupes d'entrainement"
          subtitle=""
          imageSrc={images.pouliesDriveGroups}
          imageAlt="Schema groupes d'entrainement systeme des poulies des cables"
          points={points}
          size="compact"
          showHeader={false}
          enableCoordinatePicker
          showPickerWhenHeaderHidden
          initialActivePointId={initialActivePointId}
        />
      </div>

      <SequentialNavigationButtons
        onNextClick={handleNextClick}
        onPreviousClick={handlePreviousClick}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        nextLabel={nextStepInfo?.title ?? 'Termine'}
        previousLabel={previousStepInfo?.title}
      />
    </section>
  );
};

export default PouliesDriveGroupsPage;

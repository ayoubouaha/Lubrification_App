import InteractiveDiagram from '../InteractiveDiagram/InteractiveDiagram';
import { useCrane } from '../../../hooks/useCrane';
import { getPouliesOverviewPoints, getTukanPouliesOverviewPoints } from './pouliesPoints';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSequentialNavigation } from '../../../hooks/useSequentialNavigation';
import SequentialNavigationButtons from '../SequentialNavigationButtons/SequentialNavigationButtons';

const PouliesCablesPage = () => {
  const { id, images } = useCrane();
  const navigate = useNavigate();
  const { craneId } = useParams();
  const location = useLocation();
  const focusPointId =
    (location.state as { focusPointId?: string } | null)?.focusPointId ?? '';
  const points = id === 'tukan' ? getTukanPouliesOverviewPoints() : getPouliesOverviewPoints(id);
  const initialActivePointId = points.some(point => point.id === focusPointId) ? focusPointId : '';
  const {
    handleNextClick,
    handlePreviousClick,
    hasNext,
    hasPrevious,
    nextStepInfo,
    previousStepInfo,
  } = useSequentialNavigation('poulies');

  return (
    <section className="poulies-page">
      <InteractiveDiagram
        title="SYSTEME DES POULIES DES CABLES"
        subtitle=""
        imageSrc={images.pouliesCables}
        imageAlt="Schema poulies des cables"
        points={points}
        size="compact"
        enableCoordinatePicker
        onPointClick={point => {
          if (point.id === 'poulies:drive-groups-nav' && craneId) {
            navigate(`/crane/${craneId}/points/poulies/groupes`);
          }
        }}
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
    </section>
  );
};

export default PouliesCablesPage;

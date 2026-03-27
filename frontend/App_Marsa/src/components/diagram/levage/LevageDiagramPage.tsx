import InteractiveDiagram from '../InteractiveDiagram/InteractiveDiagram';
import { LEVAGE_LINK_POINTS } from './levageDiagram.config';
import { useCrane } from '../../../hooks/useCrane';
import { useNavigate, useParams } from 'react-router-dom';
import { useSequentialNavigation } from '../../../hooks/useSequentialNavigation';
import SequentialNavigationButtons from '../SequentialNavigationButtons/SequentialNavigationButtons';

const LevageDiagramPage = () => {
  const { images } = useCrane();
  const navigate = useNavigate();
  const { craneId } = useParams();
  const {
    handleNextClick,
    handlePreviousClick,
    hasNext,
    hasPrevious,
    nextStepInfo,
    previousStepInfo,
  } = useSequentialNavigation('levage');

  return (
    <div className="levage-diagram-page">
      <InteractiveDiagram
        title="SYSTÈME DE LEVAGE"
        subtitle=""
        imageSrc={images.levage}
        imageAlt="Schema du systeme de levage"
        points={LEVAGE_LINK_POINTS}
        size="small"
        enableCoordinatePicker
        onPointClick={() => {
          if (!craneId) return;
          navigate(`/crane/${craneId}/points/levage/groupes`);
        }}
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

export default LevageDiagramPage;

import InteractiveDiagram from '../InteractiveDiagram/InteractiveDiagram';
import { RELEVAGE_LINK_POINTS } from './relevageDiagram.config';
import { useCrane } from '../../../hooks/useCrane';
import { useNavigate, useParams } from 'react-router-dom';
import { useSequentialNavigation } from '../../../hooks/useSequentialNavigation';
import SequentialNavigationButtons from '../SequentialNavigationButtons/SequentialNavigationButtons';

const RelevageDiagramPage = () => {
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
  } = useSequentialNavigation('relevage');

  return (
    <div className="relevage-diagram-page">
      <InteractiveDiagram
        title="SYSTÈME DE RELEVAGE DE LA FLÈCHE"
        subtitle=""
        imageSrc={images.relevage}
        imageAlt="Schema du systeme de relevage de la fleche"
        points={RELEVAGE_LINK_POINTS}
        size="default"
        enableCoordinatePicker
        onPointClick={point => {
          if (!craneId) return;
          if (point.action === 'relevage-drive-groups') {
            navigate(`/crane/${craneId}/points/relevage/groupes`);
          }
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

export default RelevageDiagramPage;

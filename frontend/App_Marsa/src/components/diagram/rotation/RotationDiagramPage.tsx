import InteractiveDiagram from '../InteractiveDiagram/InteractiveDiagram';
import { ROTATION_DIAGRAM_CONFIG } from './rotationDiagram.config';
import { useCrane } from '../../../hooks/useCrane';
import { useSequentialNavigation } from '../../../hooks/useSequentialNavigation';
import SequentialNavigationButtons from '../SequentialNavigationButtons/SequentialNavigationButtons';

const RotationDiagramPage = () => {
  const { images } = useCrane();
  const {
    handleNextClick,
    handlePreviousClick,
    hasNext,
    hasPrevious,
    nextStepInfo,
    previousStepInfo,
  } = useSequentialNavigation('rotation');

  return (
    <div className="rotation-diagram-page">
      <InteractiveDiagram
        title={ROTATION_DIAGRAM_CONFIG.title}
        subtitle={ROTATION_DIAGRAM_CONFIG.subtitle}
        imageSrc={images.rotation}
        imageAlt={ROTATION_DIAGRAM_CONFIG.imageAlt}
        points={ROTATION_DIAGRAM_CONFIG.points}
        size="compact"
        enableCoordinatePicker
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

export default RotationDiagramPage;
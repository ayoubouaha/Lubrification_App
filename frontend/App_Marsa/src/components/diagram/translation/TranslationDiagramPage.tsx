import InteractiveDiagram from '../InteractiveDiagram/InteractiveDiagram';
import { useCrane } from '../../../hooks/useCrane';
import { ARDELT_TRANSLATION_MARKERS } from './ardeltTranslationMarkers';
import { TUKAN_TRANSLATION_MARKERS } from './tukanTranslationMarkers';
import { useNavigate, useParams } from 'react-router-dom';
import { useSequentialNavigation } from '../../../hooks/useSequentialNavigation';
import SequentialNavigationButtons from '../SequentialNavigationButtons/SequentialNavigationButtons';
import './TranslationDiagramPage.css';

interface TranslationDiagramPageProps {
  enableCoordinatePicker?: boolean;
}

const TranslationDiagramPage = ({ enableCoordinatePicker }: TranslationDiagramPageProps) => {
  const { id, images } = useCrane();
  const navigate = useNavigate();
  const { craneId } = useParams();
  const imageSrc = images.translation ?? images.nordA;
  const markers = id === 'ardelt' ? ARDELT_TRANSLATION_MARKERS : TUKAN_TRANSLATION_MARKERS;
  const shouldEnableCoordinatePicker = enableCoordinatePicker ?? id === 'tukan';
  const {
    handleNextClick,
    handlePreviousClick,
    hasNext,
    hasPrevious,
    nextStepInfo,
    previousStepInfo,
  } = useSequentialNavigation('translation');

  return (
    <section className="translation-page">
      <InteractiveDiagram
        title="SYSTÈME DE TRANSLATION"
        subtitle=""
        imageSrc={imageSrc}
        imageAlt="Schema du systeme de translation"
        points={markers}
        size="compact"
        enableCoordinatePicker={shouldEnableCoordinatePicker}
        onPointClick={point => {
          if (!craneId) return;
          if (!point.id.startsWith('translation-')) return;

          const zoneKey = point.id.replace('translation-', '');
          navigate(`/crane/${craneId}/points/translation/${zoneKey}`);
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
    </section>
  );
};

export default TranslationDiagramPage;

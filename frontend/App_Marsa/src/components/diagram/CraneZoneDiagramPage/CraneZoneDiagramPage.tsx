import InteractiveDiagram from '../InteractiveDiagram/InteractiveDiagram';
import { getZoneDiagramConfig, type ZoneKey } from '../zones/zoneDiagram.config.ts';
import { useCrane } from '../../../hooks/useCrane';
import { useSequentialNavigation } from '../../../hooks/useSequentialNavigation';
import SequentialNavigationButtons from '../SequentialNavigationButtons/SequentialNavigationButtons';
import { TUKAN_TRANSLATION_ZONE_A_MARKERS } from '../translation/tukanTranslationZoneAMarkers';
import { TUKAN_TRANSLATION_ZONE_B_MARKERS } from '../translation/tukanTranslationZoneBMarkers';
import { TUKAN_TRANSLATION_ZONE_C_MARKERS } from '../translation/tukanTranslationZoneCMarkers';
import { TUKAN_TRANSLATION_ZONE_D_MARKERS } from '../translation/tukanTranslationZoneDMarkers';
import { useLocation } from 'react-router-dom';

interface CraneZoneDiagramPageProps {
  zoneKey: ZoneKey;
}

const CraneZoneDiagramPage = ({ zoneKey }: CraneZoneDiagramPageProps) => {
  const { id, images } = useCrane();
  const location = useLocation();
  const focusPointId =
    (location.state as { focusPointId?: string } | null)?.focusPointId ?? '';
  const zoneDiagramConfig = getZoneDiagramConfig(zoneKey, images);
  const {
    handleNextClick,
    handlePreviousClick,
    hasNext,
    hasPrevious,
    nextStepInfo,
    previousStepInfo,
  } = useSequentialNavigation(`translation:${zoneKey}`);

  return (
    <div className="zone-diagram-page">
      <InteractiveDiagram
        title={zoneDiagramConfig.title}
        subtitle={zoneDiagramConfig.subtitle}
        imageSrc={zoneDiagramConfig.imageSrc}
        imageAlt={zoneDiagramConfig.imageAlt}
        points={
          id === 'tukan'
            ? zoneKey === 'nord-a'
              ? TUKAN_TRANSLATION_ZONE_A_MARKERS
              : zoneKey === 'sud-b'
                ? TUKAN_TRANSLATION_ZONE_B_MARKERS
                : zoneKey === 'sud-c'
                  ? TUKAN_TRANSLATION_ZONE_C_MARKERS
                  : zoneKey === 'nord-d'
                    ? TUKAN_TRANSLATION_ZONE_D_MARKERS
                    : []
            : zoneDiagramConfig.points
        }
        size={id === 'tukan' ? 'compact' : 'default'}
        enableCoordinatePicker={id === 'tukan'}
        initialActivePointId={focusPointId}
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

export default CraneZoneDiagramPage;

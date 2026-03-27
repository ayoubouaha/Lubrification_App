import './SequentialNavigationButtons.css';

interface SequentialNavigationButtonsProps {
  onNextClick: () => void;
  onPreviousClick: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  nextLabel?: string;
  previousLabel?: string;
  showLabels?: boolean;
}

/**
 * Reusable component for sequential navigation.
 * Displays Next and Previous buttons at the bottom of pages.
 * Buttons are automatically disabled when at the start/end of sequence.
 */
const SequentialNavigationButtons = ({
  onNextClick,
  onPreviousClick,
  hasNext,
  hasPrevious,
  nextLabel = 'Suivante',
  previousLabel = 'Précédente',
  showLabels = true,
}: SequentialNavigationButtonsProps) => {
  return (
    <div className="sequential-nav-buttons">
      <button
        className="sequential-nav-button sequential-nav-button--previous"
        onClick={onPreviousClick}
        disabled={!hasPrevious}
        aria-label={previousLabel}
        title={!hasPrevious ? 'Première étape' : `Aller à : ${previousLabel}`}
      >
        <svg className="sequential-nav-button__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        {showLabels && <span className="sequential-nav-button__text">{previousLabel}</span>}
      </button>

      <button
        className="sequential-nav-button sequential-nav-button--next"
        onClick={onNextClick}
        disabled={!hasNext}
        aria-label={nextLabel}
        title={!hasNext ? 'Dernière étape' : `Aller à : ${nextLabel}`}
      >
        {showLabels && <span className="sequential-nav-button__text">{nextLabel}</span>}
        <svg className="sequential-nav-button__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default SequentialNavigationButtons;

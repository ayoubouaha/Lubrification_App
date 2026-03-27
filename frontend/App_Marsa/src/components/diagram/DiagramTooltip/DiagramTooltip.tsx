import './DiagramTooltip.css';

interface DiagramTooltipProps {
  text: string;
  isVisible?: boolean;
  variant?: 'default' | 'arrow';
}

const DiagramTooltip = ({ text, isVisible = false, variant = 'default' }: DiagramTooltipProps) => {
  return (
    <span className={`diagram-tooltip diagram-tooltip--${variant} ${isVisible ? 'diagram-tooltip--visible' : ''}`}>
      {text}
    </span>
  );
};

export default DiagramTooltip;

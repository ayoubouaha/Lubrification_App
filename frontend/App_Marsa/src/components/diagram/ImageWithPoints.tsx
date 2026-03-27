import InteractiveDiagram from './InteractiveDiagram/InteractiveDiagram';
import { type DiagramPoint } from './types';

interface ImageWithPointsProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  points: DiagramPoint[];
  size?: 'default' | 'compact' | 'small';
  enableCoordinatePicker?: boolean;
  showHeader?: boolean;
  showPickerWhenHeaderHidden?: boolean;
  onPointClick?: (point: DiagramPoint) => void;
}

const ImageWithPoints = ({
  title,
  subtitle = '',
  imageSrc,
  imageAlt,
  points,
  size = 'default',
  enableCoordinatePicker = false,
  showHeader = true,
  showPickerWhenHeaderHidden = false,
  onPointClick,
}: ImageWithPointsProps) => {
  return (
    <InteractiveDiagram
      title={title}
      subtitle={subtitle}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      points={points}
      size={size}
      enableCoordinatePicker={enableCoordinatePicker}
      showHeader={showHeader}
      showPickerWhenHeaderHidden={showPickerWhenHeaderHidden}
      onPointClick={onPointClick}
    />
  );
};

export default ImageWithPoints;
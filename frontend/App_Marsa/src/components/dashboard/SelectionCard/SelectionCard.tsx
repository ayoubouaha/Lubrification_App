import './SelectionCard.css';

interface SelectionCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  onClick: () => void;
}

const SelectionCard = ({ title, imageSrc, imageAlt, onClick }: SelectionCardProps) => {
  return (
    <button type="button" className="selection-card" onClick={onClick}>
      <div className="selection-card__media">
        <img className="selection-card__image" src={imageSrc} alt={imageAlt} />
      </div>
      <span className="selection-card__title">{title}</span>
      <span className="selection-card__cta">Accéder</span>
    </button>
  );
};

export default SelectionCard;

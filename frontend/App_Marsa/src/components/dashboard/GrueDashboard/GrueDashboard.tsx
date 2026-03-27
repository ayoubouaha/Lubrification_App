import SelectionCard from '../SelectionCard/SelectionCard';
import { getCraneCardsByCategory } from '../../../config/cranesConfig';
import './GrueDashboard.css';

interface GrueDashboardProps {
  onSelectCrane: (craneId: string) => void;
}
const GrueDashboard = ({ onSelectCrane }: GrueDashboardProps) => {
  const { rail, mobile } = getCraneCardsByCategory();
  const railCount = rail.length;
  const mobileCount = mobile.length;
  const handleCardClick = (cardId: string, hasData: boolean) => {
    if (!hasData) {
      return;
    }

    onSelectCrane(cardId);
  };

  return (
    <section className="grue-dashboard" aria-label="Grue dashboard">
      <header className="grue-dashboard__header">
        <p className="grue-dashboard__eyebrow">Tableau de bord maintenance</p>
        <h1 className="grue-dashboard__title">Gestion de graissage des grues</h1>
        <p className="grue-dashboard__subtitle">
          Accédez aux systèmes de graissage et aux schémas interactifs pour guider les interventions.
        </p>
      </header>

      <div className="grue-dashboard__sections">
        <section className="grue-dashboard__category" aria-labelledby="rail-cranes">
          <div className="grue-dashboard__category-header">
            <h2 className="grue-dashboard__category-title" id="rail-cranes">
              GRUES SUR RAILS
            </h2>
            <span className="grue-dashboard__category-tag">{railCount} unités</span>
          </div>
          <div className="grue-dashboard__grid grue-dashboard__grid--three">
            {rail.map(card => (
              <SelectionCard
                key={card.id}
                title={card.dashboardLabel}
                imageSrc={card.dashboardImage}
                imageAlt={card.dashboardImageAlt}
                onClick={() => handleCardClick(card.id, card.hasData)}
              />
            ))}
          </div>
        </section>

        <section className="grue-dashboard__category" aria-labelledby="mobile-cranes">
          <div className="grue-dashboard__category-header">
            <h2 className="grue-dashboard__category-title" id="mobile-cranes">
              GRUES MOBILES
            </h2>
            <span className="grue-dashboard__category-tag">{mobileCount} unités</span>
          </div>
          <div className="grue-dashboard__grid grue-dashboard__grid--two">
            {mobile.map(card => (
              <SelectionCard
                key={card.id}
                title={card.dashboardLabel}
                imageSrc={card.dashboardImage}
                imageAlt={card.dashboardImageAlt}
                onClick={() => handleCardClick(card.id, card.hasData)}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default GrueDashboard;

import InteractiveDiagram from '../InteractiveDiagram/InteractiveDiagram';
import { useCrane } from '../../../hooks/useCrane';
import { TUKAN_MARKERS, getTukanSystemForPoint, type TukanSystem } from './tukanMarkers';
import CriticalPointsPanel from '../../dashboard/CriticalPointsPanel/CriticalPointsPanel';
import './TukanPage.css';

interface TukanPageProps {
  onNavigateToSystem: (system: TukanSystem) => void;
}

const TukanPage = ({ onNavigateToSystem }: TukanPageProps) => {
  const { id, images } = useCrane();
  const imageSrc = images.overview ?? images.nordA;

  return (
    <section className="tukan-page">
      <div className="tukan-page__layout">
        <div className="tukan-page__critical">
          <CriticalPointsPanel craneId={id} images={images} />
        </div>

        <div className="tukan-page__diagram">
          <InteractiveDiagram
          title="3. TUKAN 2, 3 (40T)"
          subtitle=""
          imageSrc={imageSrc}
          imageAlt="Schema de la grue TUKAN"
          points={TUKAN_MARKERS}
          size="compact"
          enableCoordinatePicker
          showHeader={false}
          onPointClick={point => {
            const system = getTukanSystemForPoint(point.id);
            if (system) {
              onNavigateToSystem(system);
            }
            }}
          />
        </div>

        <aside className="tukan-page__legend" aria-label="Legende des systemes">
          <h2 className="tukan-page__legend-title">Legende</h2>
          <ul className="tukan-page__legend-list">
            <li className="tukan-page__legend-item">
              <span className="tukan-page__legend-swatch tukan-page__legend-swatch--poulies" aria-hidden="true" />
              <span>SYSTEME DES POULIES DES CABLES</span>
            </li>
            <li className="tukan-page__legend-item">
              <span className="tukan-page__legend-swatch tukan-page__legend-swatch--relevage" aria-hidden="true" />
              <span>SYSTEME DE RELEVAGE DE LA FLECHE</span>
            </li>
            <li className="tukan-page__legend-item">
              <span className="tukan-page__legend-swatch tukan-page__legend-swatch--rotation" aria-hidden="true" />
              <span>SYSTEME DE ROTATION</span>
            </li>
            <li className="tukan-page__legend-item">
              <span className="tukan-page__legend-swatch tukan-page__legend-swatch--levage" aria-hidden="true" />
              <span>SYSTEME DE LEVAGE</span>
            </li>
            <li className="tukan-page__legend-item">
              <span className="tukan-page__legend-swatch tukan-page__legend-swatch--translation" aria-hidden="true" />
              <span>SYSTEME DE TRANSLATION</span>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default TukanPage;

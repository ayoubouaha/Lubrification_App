import InteractiveDiagram from '../InteractiveDiagram/InteractiveDiagram';
import { useCrane } from '../../../hooks/useCrane';
import { ARDELT_K3_MARKERS, getArdeltK3SystemForPoint, type ArdeltK3System } from './ardeltK3Markers';
import CriticalPointsPanel from '../../dashboard/CriticalPointsPanel/CriticalPointsPanel';
import './ArdeltK3Page.css';

interface ArdeltK3PageProps {
  onNavigateToSystem: (system: ArdeltK3System) => void;
}

const ArdeltK3Page = ({ onNavigateToSystem }: ArdeltK3PageProps) => {
  const { id, images } = useCrane();
  const imageSrc = images.overview ?? images.nordA;
  const overviewPoints = ARDELT_K3_MARKERS.filter(point => !point.id.startsWith('poulies:'));

  return (
    <section className="ardelt-k3-page">
      <div className="ardelt-k3-page__layout">
        <div className="ardelt-k3-page__critical">
          <CriticalPointsPanel craneId={id} images={images} />
        </div>

        <div className="ardelt-k3-page__diagram">
          <InteractiveDiagram
          title="ARDELT K3 (40T)"
          subtitle=""
          imageSrc={imageSrc}
          imageAlt="Schema de la grue ARDELT K3"
          points={overviewPoints}
          size="compact"
          enableCoordinatePicker
          showHeader={false}
          onPointClick={point => {
            const system = getArdeltK3SystemForPoint(point.id);
            if (system) {
              onNavigateToSystem(system);
            }
            }}
          />
        </div>

        <aside className="ardelt-k3-page__legend" aria-label="Legende des systemes">
          <h2 className="ardelt-k3-page__legend-title">Legende</h2>
          <ul className="ardelt-k3-page__legend-list">
            <li className="ardelt-k3-page__legend-item">
              <span className="ardelt-k3-page__legend-swatch ardelt-k3-page__legend-swatch--poulies" aria-hidden="true" />
              <span>SYSTEME DES POULIES DES CABLES</span>
            </li>
            <li className="ardelt-k3-page__legend-item">
              <span className="ardelt-k3-page__legend-swatch ardelt-k3-page__legend-swatch--relevage" aria-hidden="true" />
              <span>SYSTEME DE RELEVAGE DE LA FLECHE</span>
            </li>
            <li className="ardelt-k3-page__legend-item">
              <span className="ardelt-k3-page__legend-swatch ardelt-k3-page__legend-swatch--rotation" aria-hidden="true" />
              <span>SYSTEME DE ROTATION</span>
            </li>
            <li className="ardelt-k3-page__legend-item">
              <span className="ardelt-k3-page__legend-swatch ardelt-k3-page__legend-swatch--levage" aria-hidden="true" />
              <span>SYSTEME DE LEVAGE</span>
            </li>
            <li className="ardelt-k3-page__legend-item">
              <span className="ardelt-k3-page__legend-swatch ardelt-k3-page__legend-swatch--translation" aria-hidden="true" />
              <span>SYSTEME DE TRANSLATION</span>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default ArdeltK3Page;

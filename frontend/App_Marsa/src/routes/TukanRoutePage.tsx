import { useNavigate } from 'react-router-dom';
import TukanPage from '../components/diagram/tukan/TukanPage';
import type { TukanSystem } from '../components/diagram/tukan/tukanMarkers';

const TukanRoutePage = () => {
  const navigate = useNavigate();

  const handleSystemNavigate = (system: TukanSystem) => {
    switch (system) {
      case 'translation':
        navigate('/crane/tukan/points/translation');
        break;
      case 'rotation':
        navigate('/crane/tukan/points/rotation');
        break;
      case 'relevage':
        navigate('/crane/tukan/points/relevage');
        break;
      case 'levage':
        navigate('/crane/tukan/points/levage');
        break;
      case 'poulies':
        navigate('/crane/tukan/points/poulies');
        break;
    }
  };

  return <TukanPage onNavigateToSystem={handleSystemNavigate} />;
};

export default TukanRoutePage;

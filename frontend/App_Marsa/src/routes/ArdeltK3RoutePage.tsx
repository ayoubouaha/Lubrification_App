import { useNavigate } from 'react-router-dom';
import ArdeltK3Page from '../components/diagram/ardelt/ArdeltK3Page';
import type { ArdeltK3System } from '../components/diagram/ardelt/ardeltK3Markers';

const ArdeltK3RoutePage = () => {
  const navigate = useNavigate();

  const handleSystemNavigate = (system: ArdeltK3System) => {
    switch (system) {
      case 'translation':
        navigate('/crane/ardelt/points/translation');
        break;
      case 'rotation':
        navigate('/crane/ardelt/points/rotation');
        break;
      case 'relevage':
        navigate('/crane/ardelt/points/relevage');
        break;
      case 'levage':
        navigate('/crane/ardelt/points/levage');
        break;
      case 'poulies':
        navigate('/crane/ardelt/points/poulies');
        break;
    }
  };

  return <ArdeltK3Page onNavigateToSystem={handleSystemNavigate} />;
};

export default ArdeltK3RoutePage;

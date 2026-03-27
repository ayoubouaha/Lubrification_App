import { useNavigate } from 'react-router-dom';
import GrueDashboard from '../components/dashboard/GrueDashboard/GrueDashboard';

const DashboardRoutePage = () => {
  const navigate = useNavigate();

  return (
    <GrueDashboard
      onSelectCrane={craneId => {
        if (craneId === 'ardelt') {
          navigate('/crane/ardelt/ardelt-k3');
          return;
        }

        if (craneId === 'tukan') {
          navigate('/crane/tukan/tukan');
        }
      }}
    />
  );
};

export default DashboardRoutePage;

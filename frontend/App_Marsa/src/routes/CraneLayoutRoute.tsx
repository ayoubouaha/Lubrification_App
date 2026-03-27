import { Outlet } from 'react-router-dom';
import Layout from '../components/layout/Layout/Layout';

const CraneLayoutRoute = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default CraneLayoutRoute;

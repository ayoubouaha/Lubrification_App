import { Navigate, Route, Routes } from 'react-router-dom';
import { DEFAULT_CRANE_ID } from './config/cranesConfig';
import CraneLayoutRoute from './routes/CraneLayoutRoute';
import DashboardRoutePage from './routes/DashboardRoutePage';
import ArdeltK3RoutePage from './routes/ArdeltK3RoutePage';
import TukanRoutePage from './routes/TukanRoutePage';
import TranslationZoneRoutePage from './routes/TranslationZoneRoutePage';
import TranslationDiagramPage from './components/diagram/translation/TranslationDiagramPage';
import RotationDiagramPage from './components/diagram/rotation/RotationDiagramPage';
import RotationDriveGroupsPage from './components/diagram/rotation/RotationDriveGroupsPage';
import RelevageDiagramPage from './components/diagram/relevage/RelevageDiagramPage';
import RelevageDriveGroupsPage from './components/diagram/relevage/RelevageDriveGroupsPage';
import LevageDiagramPage from './components/diagram/levage/LevageDiagramPage';
import LevageDriveGroupsPage from './components/diagram/levage/LevageDriveGroupsPage';
import PouliesCablesPage from './components/diagram/poulies/PouliesCablesPage';
import PouliesDriveGroupsPage from './components/diagram/poulies/PouliesDriveGroupsPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/crane/${DEFAULT_CRANE_ID}/dashboard`} replace />} />

      <Route path="/crane/:craneId" element={<CraneLayoutRoute />}>
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<DashboardRoutePage />} />
        <Route path="ardelt-k3" element={<ArdeltK3RoutePage />} />
        <Route path="tukan" element={<TukanRoutePage />} />

        <Route path="points/translation" element={<TranslationDiagramPage />} />
        <Route path="points/translation/:zoneKey" element={<TranslationZoneRoutePage />} />

        <Route path="points/rotation" element={<RotationDiagramPage />} />
        <Route path="points/rotation/groupes" element={<RotationDriveGroupsPage />} />

        <Route path="points/relevage" element={<RelevageDiagramPage />} />
        <Route path="points/relevage/groupes" element={<RelevageDriveGroupsPage />} />

        <Route path="points/levage" element={<LevageDiagramPage />} />
        <Route path="points/levage/groupes" element={<LevageDriveGroupsPage />} />

        <Route path="points/poulies" element={<PouliesCablesPage />} />
        <Route path="points/poulies/groupes" element={<PouliesDriveGroupsPage />} />

        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>

      <Route path="*" element={<Navigate to={`/crane/${DEFAULT_CRANE_ID}/dashboard`} replace />} />
    </Routes>
  );
};

export default App;

import { Navigate, useParams } from 'react-router-dom';
import CraneZoneDiagramPage from '../components/diagram/CraneZoneDiagramPage/CraneZoneDiagramPage';
import type { ZoneKey } from '../components/diagram/zones/zoneDiagram.config';

const isZoneKey = (value: string | undefined): value is ZoneKey => {
  return value === 'nord-a' || value === 'sud-b' || value === 'sud-c' || value === 'nord-d';
};

const TranslationZoneRoutePage = () => {
  const { zoneKey } = useParams();

  if (!isZoneKey(zoneKey)) {
    return <Navigate to="../translation" replace />;
  }

  return <CraneZoneDiagramPage zoneKey={zoneKey} />;
};

export default TranslationZoneRoutePage;

import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getCraneConfig, type CraneConfig } from '../config/cranesConfig';

export const useCrane = (): CraneConfig => {
  const { craneId } = useParams();

  return useMemo(() => getCraneConfig(craneId), [craneId]);
};

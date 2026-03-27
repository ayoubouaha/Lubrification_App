import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchLubricationPoint } from '../services/lubricationApi';
import { type LubricationFetchStatus, type LubricationPointDto } from '../types/lubricationPoint';

const POLL_INTERVAL_MS = 5000;

interface UseLubricationPointResult {
  data: LubricationPointDto | null;
  status: LubricationFetchStatus;
  errorMessage: string;
  refresh: () => Promise<void>;
}

export const useLubricationPoint = (
  names: string[] | null,
  enabled: boolean,
  signal?: AbortSignal,
): UseLubricationPointResult => {
  const [data, setData] = useState<LubricationPointDto | null>(null);
  const [status, setStatus] = useState<LubricationFetchStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const requestSeqRef = useRef(0);

  const normalizedNames = useMemo(() => {
    if (!names?.length) {
      return [];
    }

    return names
      .map(name => name.trim())
      .filter(name => name.length > 0);
  }, [names]);

  const refresh = useCallback(async () => {
    if (!enabled || !normalizedNames.length) {
      return;
    }

    const seq = ++requestSeqRef.current;
    const controller = new AbortController();
    
    // Listen to external abort signal if provided
    signal?.addEventListener('abort', () => {
      controller.abort();
    });

    setStatus(previous => (previous === 'success' ? previous : 'loading'));
    setErrorMessage('');

    try {
      let payload = null;
      let lastError: unknown = null;

      for (const candidateName of normalizedNames) {
        try {
          payload = await fetchLubricationPoint(candidateName, controller.signal);
          break;
        } catch (error) {
          lastError = error;

          if (error instanceof Error && 'status' in error && (error as { status?: number }).status === 404) {
            continue;
          }

          throw error;
        }
      }

      if (!payload) {
        throw (lastError ?? new Error('Unable to load lubrication data'));
      }

      if (seq !== requestSeqRef.current) {
        return;
      }

      setData(payload);
      setStatus('success');
    } catch (error) {
      if (seq !== requestSeqRef.current) {
        return;
      }

      setStatus('error');
      setData(null);
      setErrorMessage(error instanceof Error ? error.message : 'Unable to load lubrication data');
    }
  }, [enabled, normalizedNames]);

  useEffect(() => {
    if (!enabled || !normalizedNames.length) {
      setData(null);
      setStatus('idle');
      setErrorMessage('');
      return;
    }

    setStatus('loading');
    void refresh();

    const intervalId = window.setInterval(() => {
      void refresh();
    }, POLL_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [enabled, normalizedNames, refresh]);

  return {
    data,
    status,
    errorMessage,
    refresh,
  };
};

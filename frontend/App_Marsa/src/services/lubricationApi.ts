import { type LubricationPointDto } from '../types/lubricationPoint';

export class LubricationApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'LubricationApiError';
    this.status = status;
  }
}

export const fetchLubricationPoint = async (
  name: string,
  signal?: AbortSignal,
): Promise<LubricationPointDto> => {
  const encodedName = encodeURIComponent(name);
  const cacheBuster = `__ts=${Date.now()}`;
  const url = `/api/lubrication/latest/${encodedName}?${cacheBuster}`;

  const response = await fetch(url, {
    signal,
    cache: 'no-store',
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const payload = (await response.json()) as { message?: string };
      if (payload.message) {
        message = payload.message;
      }
    } catch {
      // Keep default message when body is not JSON.
    }

    throw new LubricationApiError(response.status, message);
  }

  return (await response.json()) as LubricationPointDto;
};

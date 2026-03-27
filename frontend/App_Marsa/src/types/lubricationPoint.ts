export interface LubricationPointDto {
  name: string;
  interval: number | null;
  plannedAmount: number | null;
  actualAmount: number | null;
  timestamp: string | null;
}

export type LubricationFetchStatus = 'idle' | 'loading' | 'success' | 'error';

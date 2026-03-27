export interface DiagramCoordinates {
  xPercent: number;
  yPercent: number;
}

export interface MarkerMetadata {
  id: string;
  name: string;
  dbName?: string;
  shortDescription: string;
  details: string;
  tagPrimary: string;
  tagSecondary?: string;
  frequency: string;
  plannedAmount: string;
  markerLabel?: string;
  alwaysShowLabel?: boolean;
  markerLabelVariant?: 'default' | 'arrow';
  markerColor?: string;
  markerScale?: number;
  action?: 'relevage-drive-groups';
}

export interface DiagramPoint extends MarkerMetadata, DiagramCoordinates {}

export type MarkerMetadataOverride = Partial<Omit<MarkerMetadata, 'id'>>;

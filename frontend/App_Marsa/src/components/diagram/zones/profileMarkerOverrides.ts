import { type MarkerMetadataOverride } from '../types';
import { type MarkerId } from './markerCatalog';
import { type ZoneProfile } from './coordinateProfiles';

export type MarkerOverrideMap = Partial<Record<MarkerId, MarkerMetadataOverride>>;

export const PROFILE_MARKER_OVERRIDES: Record<ZoneProfile, MarkerOverrideMap> = {
  'profile-ac': {},
  'profile-db': {
    
    'left-bogie-upper-pin': {
      tagPrimary: 'K3-STR-B01',
      frequency: '07j',
      plannedAmount: '415g',
      details: 'DB-specific maintenance instructions...',
    },
    'left-bogie-center': {
      tagPrimary: 'K3-STR-B02',
      frequency: '07j',
      plannedAmount: '415g',
      details: 'DB-specific maintenance instructions...',
    },
    'left-bogie-wheel-inner': {
      tagPrimary: 'K3-STR-B03',
      frequency: '07j',
      plannedAmount: '415g',
      details: 'DB-specific maintenance instructions...',
    },
    'center-turret-bearing': {
      tagPrimary: 'K3-STR-B04',
      frequency: '07j',
      plannedAmount: '415g',
      details: 'DB-specific maintenance instructions...',
    },
    'right-bogie-upper-pin': {
      tagPrimary: 'K3-STR-B05',
      frequency: '07j',
      plannedAmount: '415g',
      details: 'DB-specific maintenance instructions...',
    },
    'right-bogie-center': {
      tagPrimary: 'K3-STR-B06',
      frequency: '07j',
      plannedAmount: '415g',
      details: 'DB-specific maintenance instructions...',
    },
    'left-bogie-lower-link': {
      tagPrimary: 'K3-STR-B07',
      tagSecondary: 'K3-STR-B08',
      frequency: '07j',
      plannedAmount: '125g',
      details: 'DB-specific maintenance instructions...',
    },
    'right-stop-roller-1': {
      tagPrimary: 'K3-STR-B09',
      tagSecondary: 'K3-STR-B10',
      frequency: '07j',
      plannedAmount: '100g',
      details: 'DB-specific maintenance instructions...',
    },
    'right-bogie-lower-link': {
      tagPrimary: 'K3-STR-B11',
      tagSecondary: 'K3-STR-B12',
      frequency: '07j',
      plannedAmount: '125g',
      details: 'DB-specific maintenance instructions...',
    },
    'right-bogie-wheel-inner': {
      tagPrimary: 'K3-STR-B13',
      tagSecondary: 'K3-STR-B14',
      frequency: '07j',
      plannedAmount: '125g',
      details: 'DB-specific maintenance instructions...',
    },
    'right-wheel-hub-outer': {
      tagPrimary: 'K3-STR-B15',
      tagSecondary: 'K3-STR-B16',
      frequency: '07j',
      plannedAmount: '250g',
      details: 'DB-specific maintenance instructions...',
    },

    'left-wheel-hub-outer': {
      tagPrimary: 'K3-STR-B17',
      tagSecondary: 'K3-STR-B18',
      frequency: '07j',
      plannedAmount: '125g',
      details: 'DB-specific maintenance instructions...',
    },

  },
};


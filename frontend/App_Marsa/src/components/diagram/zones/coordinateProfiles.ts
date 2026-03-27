import { type DiagramCoordinates } from '../types';
import { BASE_MARKERS, type MarkerId } from './markerCatalog';

export type ZoneProfile = 'profile-ac' | 'profile-db';
export type MarkerCoordinateMap = Partial<Record<MarkerId, DiagramCoordinates>>;

export const PROFILE_AC_COORDINATES: MarkerCoordinateMap = {
  'left-wheel-hub-outer': { xPercent: 12.2, yPercent: 89.28 },
  'left-bogie-upper-pin': { xPercent: 24.75, yPercent: 57.96 },
  'left-bogie-center': { xPercent: 84.47, yPercent: 88.82 },
  'left-bogie-lower-link': { xPercent: 97.29, yPercent: 96.24 },
  'left-bogie-wheel-inner': { xPercent: 71.82, yPercent: 90.79 },
  'center-turret-bearing': { xPercent: 48.3, yPercent: 54.74 },
  'right-bogie-upper-pin': { xPercent: 59.65, yPercent: 91.69 },
  'right-bogie-center': { xPercent: 24.64, yPercent: 90.94 },
  'right-bogie-lower-link': { xPercent: 27.7, yPercent: 74.57 },
  'right-bogie-wheel-inner': { xPercent: 68.9, yPercent: 75.32 },
  'right-wheel-hub-outer': { xPercent: 31.24, yPercent: 87.33 },
  'right-stop-roller-1': { xPercent: 36.74, yPercent: 91.24 },
  'right-stop-roller-2': { xPercent: 71.82, yPercent: 58.95 },
  'right-stop-roller-3': { xPercent: 65.7, yPercent: 87.33 },
};

export const PROFILE_DB_COORDINATES: MarkerCoordinateMap = {
  'left-wheel-hub-outer': { xPercent: 23.22, yPercent: 58.71 },
  'left-bogie-upper-pin': { xPercent: 8.8, yPercent: 89.48 },
  'left-bogie-center': { xPercent: 22.56, yPercent: 90.47 },
  'left-bogie-lower-link': { xPercent: 30.25, yPercent: 84.27 },
  'left-bogie-wheel-inner': { xPercent: 37.93, yPercent: 91.22 },
  'center-turret-bearing': { xPercent: 63.69, yPercent: 88.95 },
  'right-bogie-upper-pin': { xPercent: 78.54, yPercent: 89.67 },
  'right-bogie-center': { xPercent: 93.1, yPercent: 89.67 },
  'right-bogie-lower-link': { xPercent: 73.55, yPercent: 67.93 },
  'right-bogie-wheel-inner': { xPercent: 79.11, yPercent: 57.48 },
  'right-wheel-hub-outer': { xPercent: 50.86, yPercent: 54.45 },
  'right-stop-roller-1': { xPercent: 27.7, yPercent: 74.57 },
};

export const PROFILE_DISABLED_MARKERS: Record<ZoneProfile, readonly MarkerId[]> = {
  'profile-ac': [],
  'profile-db': ['right-stop-roller-2', 'right-stop-roller-3'],
};

export const PROFILE_COORDINATES: Record<ZoneProfile, MarkerCoordinateMap> = {
  'profile-ac': PROFILE_AC_COORDINATES,
  'profile-db': PROFILE_DB_COORDINATES,
};

const validateProfileCoordinates = () => {
  for (const [profileName, coordinateMap] of Object.entries(PROFILE_COORDINATES)) {
    const disabledMarkers = new Set(PROFILE_DISABLED_MARKERS[profileName as ZoneProfile]);

    for (const marker of BASE_MARKERS) {
      if (disabledMarkers.has(marker.id)) {
        continue;
      }

      const coordinates = coordinateMap[marker.id];

      if (!coordinates) {
        throw new Error(`Missing coordinates for marker ${marker.id} in ${profileName}`);
      }

      if (!Number.isFinite(coordinates.xPercent) || !Number.isFinite(coordinates.yPercent)) {
        throw new Error(`Invalid coordinates for marker ${marker.id} in ${profileName}`);
      }
    }
  }
};

validateProfileCoordinates();

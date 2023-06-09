export interface TrackerDetails {
  id: number;
  name: string;
}

export interface NewTrackerData {
  routeId: number;
  name: string;
  imie: string;
  updateFrequency: number;
  isActive: boolean;
  organisationID: number;
}

export interface EditTracker {
  routeID: number;
  id: string;
  name: string;
  imie: string;
  updateFrequency: number;
  isActive: boolean;
  organisationID: number;
}

export interface TimelineData {
  address: string;
  created: string;
  distanceToDestination: number;
  latitude: number;
  longitude: number;
}

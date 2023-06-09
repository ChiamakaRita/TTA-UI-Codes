export interface Route {
  origin: string;
  destination: string;
  organisationID: number;
}

export interface RouteList {
  id: number;
  name: string;
}

export interface ShipmentTrackerRoute {
  id: number;
  origin: string;
  destination: string;
}

export interface TrackerData {
  id: string;
  name: string;
  imie: string;
  updateFrequency: number;
  isActive: boolean;
  created: string;
}

export interface RouteDetail {
  id: string;
  uniqueID: string;
  origin: string;
  destination: string;
  created: string;
  organisationID: number;
  trackers: TrackerData[];
}

export interface RouteDescription {
  id: number;
  origin: string;
  destination: string;
}

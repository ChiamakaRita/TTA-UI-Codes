export interface PlaceData {
  id: number;
  origin: string;
  destinationState: string;
  destinationCity: string;
  leadtime: number;
  distance: number;
}

export interface CreateOrUpdatePlace {
  origin: string;
  destinationState: string;
  destinationCity: string;
  leadtime: number;
  distance: number;
}

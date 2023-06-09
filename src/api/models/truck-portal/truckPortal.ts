export interface TruckPortalData {
  id: number;
  shipperId: number;
  shipperName: string;
  transporterId: number;
  transporterName: string;
  driverName: string;
  driverPhone: string;
  destination: string;
  truckNumber: string;
  truckSize: number;
  isRequested: boolean;
  loadingPoint: string;
  isLoadingComplete: boolean;
  isLoadingCancelled: boolean;
  cancelReason: string;
  isDelivered: boolean;
  dateAdded: string;
  dateModified: string;
  transporterEmail: string;
  shipperEmail: string;
}

export interface MakeTruckAvailablePayload {
  shipperId: number;
  shipperName: string;
  transporterId: number;
  transporterName: string;
  driverName: string;
  driverPhone: string;
  destination: string;
  truckNumber: string;
  truckSize: number;
  shipperEmail: string;
  transporterEmail: string;
  transporterPhone: string;
}

export interface RequestToLoadPayload {
  id: number;
  loadingPoint: string;
}
export interface CancelTruckLoadingPayload {
  id: number;
  cancelReason: string;
}

export interface TruckUpdateData {
  id: string;
  requestId: number;
  transporterId: number;
  shipperId: number;
  isCurrent: boolean;
  origin: string;
  destination: string;
  truckNumber: string;
  currentLocation: string;
  remainingDistance: number;
  dateAdded: string;
}

export interface TruckUpdatePayload {
  requestId: number;
  transporterId: number;
  shipperId: number;
  isCurrent: boolean;
  origin: string;
  destination: string;
  truckNumber: string;
  currentLocation: string;
  remainingDistance: number;
}

export interface TruckUpdateTimelineData {
  id: string;
  currentLocation: string;
  remainingDistance: number;
  dateAdded: string;
}

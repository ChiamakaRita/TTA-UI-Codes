export interface ShipmentData {
  id: number;
  uniqueID: string;
  recipientName: string;
  recipientAddress: string;
  price: number;
  weight: number;
  deliveryDate: string;
  estimatedDeliveryDate: string;
  trackingNumber: string;
  truckNumber: string;
  isActive: boolean;
  routeID: number;
  created: string;
  modified: string;
  location: {
    id: number;
    longitude: number;
    latitude: number;
    address: string;
    distanceToDestination: number;
    metaData: string;
    created: string;
    shipmentId: number;
  };
}

export interface ActiveShipmentLocations {
  id: number;
  longitude: number;
  latitude: number;
  address: string;
  distanceToDestination: number;
  metaData: string;
  created: string;
  shipmentId: number;
}

interface ShipmentTracking {
  id: number;
  longitude: number;
  latitude: number;
  address: string;
  distanceToDestination: number;
  metaData: string;
  created: string;
}

export interface ShipmentDetail {
  id: number;
  uniqueID: string;
  created: string;
  organisationID: number;
  recipientName: string;
  recipientAddress: string;
  recipientPhone: string;
  price: number;
  weight: number;
  modified: string;
  deliveryDate: string;
  estimatedDeliveryDate: string;
  trackingNumber: string;
  truckNumber: string;
  isActive: true;
  isDeleted: false;
  routeID: number;
  trackerID: number;
  shipperID: number;
  driverName: string;
  driverPhone: string;
  version: number;
  shipmentTracking: ShipmentTracking[];
  contentDescription: string;
  contentCategory: string;
}

export interface CreateShipmentForm {
  recipientName: string;
  recipientAddress: string;
  recipientPhone: string;
  price: number | null;
  weight: number | undefined;
  estimatedDeliveryDate: string;
  routeID: number;
  trackerID: number;
  shipperID: number;
  driverName: string;
  driverPhone: string;
  organisationId: number;
  contentDescription: string;
  contentCategory: string;
  truckNumber: string;
}

export interface EditShipment {
  shipmentId: number;
  organisationId: number;
  recipientName: string;
  recipientAddress: string;
  recipientPhone: string;
  deliveryDate: string;
  isActive: boolean;
  isDeleted: boolean;
  driverName: string;
  driverPhone: string;
  contentDescription: string;
  contentCategory: string;
  truckNumber: string;
}

export interface Locations {
  lat: number;
  lng: number;
  address: string;
  distanceRemaining: number;
  shipmentId: number;
}

export interface Center {
  lat: number;
  lng: number;
}

export interface DataForTruckUpdateTable {
  truckNumber: string;
  origin: string | undefined;
  destination: string | undefined;
  recipient: string;
  currentLocation?: string;
  dateTime?: string;
  shipmentId: number;
  distanceRemaining?: number;
}

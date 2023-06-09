export interface FleetData {
  uniqueId: string;
  id: number;
  truckType: string;
  truckSize: number;
  insuranceType: string;
  insuranceExpiryDate: string;
  isInTransit: boolean;
  isInMaintenance: boolean;
  nextMaintenanceDate: string;
  dateAdded: string;
  region: string;
  investorId: number;
  driverId: number;
  truckNumber: string;
  truckModel: string;
  driverName: string;
  currentRoute: string;
  goodsLoaded: string;
  dateModified: string;
}

export interface RegisterOrUpdateFleet {
  id?: number;
  truckType: string;
  truckSize: number | undefined;
  insuranceType: string;
  insuranceExpiryDate: string;
  isInTransit: boolean;
  isInMaintenance: boolean;
  nextMaintenanceDate: string;
  region: string;
  investorId: number;
  driverId: number | undefined;
  truckModel: string;
  truckNumber: string;
  driverName: string;
  currentRoute: string;
  goodsLoaded: string;
}

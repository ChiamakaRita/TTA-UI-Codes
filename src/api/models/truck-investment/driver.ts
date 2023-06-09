export interface DriverData {
  uniqueId: string;
  id: number;
  firstName: string;
  lastName: string;
  identificationType: string;
  identificationNumber: string;
  phone: string;
  dateAdded: string;
  email: string;
}

export interface RegisterDriverModel {
  firstName: string | undefined;
  lastName: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  phone: string | undefined;
  email: string | null;
}

export interface DriverWithTruck {
  id: number;
  truckNumber: string;
  driverName: string;
  driverPhone: string;
}

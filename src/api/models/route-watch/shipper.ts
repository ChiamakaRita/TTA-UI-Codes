export interface ShipperDetails {
  id: number;
  uniqueID: string;
  name: string;
  contactEmail: string;
  phone: string;
  created: string;
  lastModified: string;
  officeAddress: string;
  organisationId: number;
}

export interface RegisterShipperForm {
  name: string;
  contactEmail: string;
  phone: string;
  officeAddress: string;
  organisationId: number;
}

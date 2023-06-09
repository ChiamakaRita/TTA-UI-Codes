export interface CreateOrganisation {
  name: string;
  contactEmail: string;
  reportEmail: string;
  phone: string;
  accountType: string;
}

export interface OrganisationData {
  id: number;
  uniqueID: string;
  name: string;
  contactEmail: string;
  reportEmail: string;
  phone: string;
  created: string;
  lastModified: string;
  accountType: string;
}

export interface CarrierOrganisation {
  id: number;
  name: string;
  contactEmail: string;
  contactPhone: string;
}

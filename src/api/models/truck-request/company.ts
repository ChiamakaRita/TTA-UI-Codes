export interface CreateOrUpdateCompanyPayload {
  name: string;
  origin: string;
  originState: string;
  productType: string;
}

export interface CompanyData {
  id: number;
  name: string;
  origin: string;
  originState: string;
  productType: string;
}

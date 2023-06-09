export interface CreateInvestorClient {
  name: string;
  address: string;
  productCategory: string;
  dateAdded: Date;
}

export interface InvestorClient {
  id: number;
  uniqueId: string;
  name: string;
  address: string;
  productCategory: string;
  dateAdded: string;
}

export interface InvestorClientPrice {
  id: number;
  uniqueId: string;
  truckSize: number;
  origin: string;
  destination: string;
  price: number;
  effectDate: string;
  dateAdded: string;
  shipperId: number;
  distance: number;
}

export interface CreateOrUpdateInvestorClientPrice {
  id?: number;
  truckSize: number;
  origin: string;
  destination: string;
  price: number;
  effectDate: string | Date | null;
  shipperId: number;
  distance: number;
}

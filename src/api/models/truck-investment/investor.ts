import { RouteDetail } from "../route-watch/routes";
import { InvestorClientPrice } from "./investorClients";

export interface InvestorApplicationModel {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfApplication: string;
  email: string;
  isApproved: boolean;
  orgId: number;
}

export interface InvestorData {
  uniqueId: string;
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  investorCode: string;
  dateAdded: string;
  email: string;
  dateOfApplication: string;
  isApproved: boolean;
  dateOfBirth: string;
  userId: string;
}

export interface InvestorProfile {
  investorData: InvestorData;
  bankDetail: BankDetails[];
}

export interface BankDetails {
  uniqueId: string;
  id: number;
  bankName: string;
  accountName: string;
  accountNumber: string;
  investorId: number;
  dateAdded: string;
}

export interface CreateBankDetailsModel {
  bankName: string;
  accountName: string;
  accountNumber: string;
  investorId: number;
}

export interface DataForRevenueForm {
  truckNumber: string;
  fleetId: number;
  investorId: number;
}

export interface DataForRevenueComputation {
  route: RouteDetail;
  priceData: InvestorClientPrice[];
}

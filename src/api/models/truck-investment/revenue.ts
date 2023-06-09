import { BankDetails, InvestorData } from "./investor";

export interface CreateOrUpdateRevenueModel {
  id?: number;
  fleetId: number;
  investorId: number;
  truckNumber: string;
  dieselCost: number;
  driverWage: number;
  miscellaneous: number;
  tripPrice: number;
  managementCost: number;
  isConfirmed: boolean;
  dateAdded?: Date | string;
  dateModified: Date | string;
  route: string;
  miscellaneousExpenses?: MiscellaneousData[];
  managementPercentage: number;
  debtPaid: number;
}

export interface RevenueData {
  id: number;
  uniqueId: string;
  fleetId: number;
  investorId: number;
  truckNumber: string;
  dieselCost: number;
  driverWage: number;
  miscellaneous: number;
  tripPrice: number;
  managementCost: number;
  isConfirmed: boolean;
  dateAdded: string;
  dateModified: string;
  modifiedBy: string;
  route: string;
  isReturnTrip: boolean;
  grossProfit: number;
  miscellaneousExpenses: MiscellaneousData[];
  managementPercentage: number;
  debtPaid: number;
}

export interface RevenueAndWithdraws {
  totalRevenue: number;
  totalWithdraw: number;
}

export interface MiscellaneousData {
  id: number;
  title: string;
  amount: number;
}

export interface ConfirmedRevenueParameter {
  month?: number;
  year: number;
  investorId: number;
  organisationId: number;
}

export interface AnnualRevenueHistoryData {
  monthName: string;
  tripCount: number;
  income: number;
  dieselCost: number;
  driverWage: number;
  miscellaneous: number;
  managementCost: number;
}

export interface PaymentRequestModel {
  id: number;
  uniqueId: string;
  investorId: number;
  amountRequested: number;
  isPaid: boolean;
  amountPaid: number;
  balanceUnpaid: number;
  dateAdded: string;
}

export interface PaymentRequestFormData {
  investorId: number;
  amountRequested: number | undefined;
}

export interface PayRequestModalData {
  investor: InvestorData;
  bank: BankDetails[];
  clickedData: PaymentRequestModel;
}

export interface RevenueExpenseVariables {
  id: number;
  fuelPrice: number;
  thhCommissionPercent: number;
  constantForDieselByTruck: number;
  constantForDieselEmptyTruck: number;
  driverWagePercent: number;
  dateModified?: string;
}

export interface DebitAndCredit {
  type: string;
  amount: number;
  dateOccurred: string;
}

export interface TruckActivityRecord {
  id: number;
  route: string;
  truckNumber: string;
  tripPrice: number;
  dieselCost: number;
  driverWage: number;
  managementCost: number;
  miscellaneous: number;
  grossProfit: number;
  dateModified: string;
  miscellaneousExpenses: MiscellaneousData[];
  debtPaid: number;
}

export interface AvailableMonths {
  value: number;
  monthName: string;
}

export interface ReturnTrip {
  initialRevenue: RevenueData;
  tripPrice: number;
  goodsLoaded: string;
}

import { BankDetails, InvestorData } from "./investor";

export interface SettlePaymentRequestModel {
  id: number;
  uniqueId: string;
  investorId: number;
  amountRequested: number;
  isPaid: boolean;
  amountPaid: number;
  balanceUnpaid: number;
  dateAdded: Date;
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

export interface PayRequestModalData {
  investor: InvestorData;
  bank: BankDetails[];
  clickedData: PaymentRequestModel;
}

export interface WithdrawalRecordModel {
  id: number;
  amountRequested: number;
  amountPaid: number;
  balanceUnpaid: number;
  isPaid: boolean;
  dateModified: string;
}

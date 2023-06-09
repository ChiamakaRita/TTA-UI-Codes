import requests from "../../main/apiConfig";
import {
  BankDetails,
  CreateBankDetailsModel,
  InvestorApplicationModel,
  InvestorData,
} from "../../models/truck-investment/investor";

export const Investor = {
  applyAsInvestor: (payload: InvestorApplicationModel) =>
    requests.post<InvestorData>("/investors", payload),

  approveApplicant: (guid: string) =>
    requests.patch(`/investors/${guid}/approve-investor`),

  declineApplicant: (guid: string) =>
    requests.post(`/investors/${guid}/decline-investor`),

  getAllInvestors: (investorStatus?: string) =>
    requests.get<InvestorData[]>(`/investors?investorStatus=${investorStatus}`),

  investorById: (id: number) => requests.get<InvestorData>(`/investors/${id}`),

  investorByGuid: (guid: string) =>
    requests.get<InvestorData>(`/investors/by-guid/${guid}`),

  getInvestorBankDetails: (investorId: number) =>
    requests.get<BankDetails[]>(`/investors/${investorId}/bank-details`),

  createBankDetail: (payload: CreateBankDetailsModel) =>
    requests.post<BankDetails>(
      `/investors/${payload.investorId}/bank-details`,
      payload
    ),
};

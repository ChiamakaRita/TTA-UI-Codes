import requests from "../../main/apiConfig";
import {
  CreateInvestorDebtPayload,
  InvestorDebtModel,
  InvestorDebtSummary,
  UpdateInvestorDebtPayload,
} from "../../models/truck-investment/investorDebt";

export const InvestorDebt = {
  getDebtSummary: (investorId: number) =>
    requests.get<InvestorDebtSummary>(
      `/investor-debts/does-invest-debt_exist/${investorId}`
    ),

  getDebts: (investorId: number) =>
    requests.get<InvestorDebtModel[]>(`/investor-debts/${investorId}`),

  addInvestorDebt: (values: CreateInvestorDebtPayload) =>
    requests.post<InvestorDebtModel>("/investor-debts", values),

  updateInvestorDebt: (values: UpdateInvestorDebtPayload) =>
    requests.put<InvestorDebtModel>("/investor-debts", values),
};

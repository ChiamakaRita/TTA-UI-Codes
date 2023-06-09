export interface InvestorDebtSummary {
  hasDebt: boolean;
  totalDebt: number;
}

export interface InvestorDebtModel {
  id: number;
  description: string;
  truckNumber: string;
  total: number;
  paid: number;
  balance: number;
  dateAdded: string;
  investorId: number;
}

export interface CreateInvestorDebtPayload {
  investorId: number;
  description: string;
  truckNumber: string;
  total: number;
  dateAdded: string;
}

export interface UpdateInvestorDebtPayload {
  id: number;
  description: string;
  truckNumber: string;
  total: number;
  paid: number;
  investorId: number;
}

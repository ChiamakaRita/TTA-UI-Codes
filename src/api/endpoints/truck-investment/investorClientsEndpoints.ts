import requests from "../../main/apiConfig";
import {
  CreateInvestorClient,
  CreateOrUpdateInvestorClientPrice,
  InvestorClient,
  InvestorClientPrice,
} from "../../models/truck-investment/investorClients";

export const InvestorClients = {
  all: () => requests.get<InvestorClient[]>(`/investors/shippers`),

  create: (payload: CreateInvestorClient) =>
    requests.post<InvestorClient>(`/investors/shippers`, payload),

  prices: (clientId: number) =>
    requests.get<InvestorClientPrice[]>(
      `/investors/${clientId}/shippers-price`
    ),

  addPrice: (payload: CreateOrUpdateInvestorClientPrice) =>
    requests.post<InvestorClientPrice>("/investors/shippers-price", payload),

  updatePrice: (payload: CreateOrUpdateInvestorClientPrice) =>
    requests.put<InvestorClientPrice>("/investors/shippers-price", payload),
};

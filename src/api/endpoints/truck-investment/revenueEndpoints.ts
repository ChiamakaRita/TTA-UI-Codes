import requests from "../../main/apiConfig";
import {
  AnnualRevenueHistoryData,
  AvailableMonths,
  ConfirmedRevenueParameter,
  CreateOrUpdateRevenueModel,
  DebitAndCredit,
  PaymentRequestFormData,
  PaymentRequestModel,
  ReturnTrip,
  RevenueAndWithdraws,
  RevenueData,
  TruckActivityRecord,
} from "../../models/truck-investment/revenue";

export const Revenue = {
  createRevenue: (payload: CreateOrUpdateRevenueModel) =>
    requests.post<RevenueData>(`/investors/revenue`, payload),

  updateRevenue: (payload: CreateOrUpdateRevenueModel) =>
    requests.put<RevenueData>(`/investors/revenue`, payload),

  createReturnTripRevenue: (payload: ReturnTrip) =>
    requests.post<RevenueData>(`/investors/return-trip-revenue`, payload),

  confirmedRevenue: (payload: ConfirmedRevenueParameter) =>
    requests.get<RevenueData[]>(
      `/investors/${payload.investorId}/confirmed-revenue/${payload.month}/${payload.year}?organisationId=${payload.organisationId}`
    ),

  withdrawableAmount: (investorId: number) =>
    requests.get<number>(
      `/investor-payments/${investorId}/withdrawable-amount`
    ),
  revenueAndWithdraws: (investorId: number) =>
    requests.get<RevenueAndWithdraws>(
      `/investor-payments/${investorId}/revenues-and-withdraws`
    ),

  unConfirmedRevenue: (investorId: number) =>
    requests.get<RevenueData[]>(`/investors/${investorId}/unconfirmed-revenue`),

  outboundTripsRevenue: () =>
    requests.get<RevenueData[]>(`/investors/outbound-trips-revenue`),

  annualRevenueHistory: (payload: ConfirmedRevenueParameter) =>
    requests.get<AnnualRevenueHistoryData[]>(
      `/investors/${payload.investorId}/annual-revenue-history/${payload.year}?organisationId=${payload.organisationId}`
    ),

  requestPayment: (payload: PaymentRequestFormData) =>
    requests.post<PaymentRequestModel>("/investor-payments", payload),

  getAccountStatement: (period: number, investorId: number) =>
    requests.get<DebitAndCredit[]>(
      `/investor-payments/${investorId}/account-statement/${period}`
    ),

  getAvailableMonths: () =>
    requests.get<AvailableMonths[]>("/investors/available-months"),

  getAvailableYears: () => requests.get<number[]>("/investors/available-years"),

  getTruckActivityRecords: (
    investorId: number,
    month: number,
    year: number,
    orgId: number
  ) =>
    requests.get<TruckActivityRecord[]>(
      `/investors/${investorId}/truck-activity-records/${month}/${year}?organisationId=${orgId}`
    ),
};

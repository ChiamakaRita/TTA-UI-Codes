import requests from "../../main/apiConfig";
import {
  PaymentRequestModel,
  SettlePaymentRequestModel,
  WithdrawalRecordModel,
} from "../../models/truck-investment/payment";

export const Payment = {
  getPaymentRequests: () =>
    requests.get<PaymentRequestModel[]>("/investor-payments"),

  settlePaymentRequest: (payload: SettlePaymentRequestModel) =>
    requests.put<PaymentRequestModel>("/investor-payments", payload),

  getWithdrawalRecords: (investorId: number, month: number, year: number) =>
    requests.get<WithdrawalRecordModel[]>(
      `investor-payments/${investorId}/withdrawal-records/${month}/${year}`
    ),
};

import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../main/apiAgent";
import { store } from "../../main/appStore";
import {
  PaymentRequestModel,
  PayRequestModalData,
  SettlePaymentRequestModel,
  WithdrawalRecordModel,
} from "../../models/truck-investment/payment";

export class PaymentStore {
  paymentRequests: PaymentRequestModel[] = [];
  withdrawals: WithdrawalRecordModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getPaymentRequests = async () => {
    try {
      store.commonStore.setLoading(true);

      const paymentRequests = await agent.Payment.getPaymentRequests();

      runInAction(() => {
        this.paymentRequests = paymentRequests;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getWithdrawalRecords = async (
    investorId: number,
    month: number,
    year: number
  ) => {
    try {
      const withdrawals = await agent.Payment.getWithdrawalRecords(
        investorId,
        month,
        year
      );

      runInAction(() => {
        this.withdrawals = withdrawals;
      });
    } catch (error) {
      throw error;
    }
  };

  handlePayRequestDetail = async (value: PaymentRequestModel) => {
    try {
      store.commonStore.setLoading(true);

      const investor = await store.investorStore.getInvestorById(
        value.investorId
      );

      const bank = await store.investorStore.getInvestorBankDetails(
        value.investorId
      );

      const resultingData: PayRequestModalData = {
        investor,
        bank,
        clickedData: value,
      };

      return resultingData;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  settlePaymentRequest = async (values: SettlePaymentRequestModel) => {
    try {
      await agent.Payment.settlePaymentRequest(values);
      store.commonStore.setSuccess("Settled a pay request ✓");
      store.commonStore.setModalVisible(false);
      this.getPaymentRequests();
    } catch (error) {
      throw error;
    }
  };
}

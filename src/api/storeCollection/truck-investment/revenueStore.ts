import { makeAutoObservable, runInAction } from "mobx";
import { customHistory } from "../../..";
import { NairaFormatter } from "../../../helper-functions/sharedFunctions";
import { combinedRoute } from "../../../helper-functions/truckInvestmentFunction";
import agent from "../../main/apiAgent";
import { store } from "../../main/appStore";
import {
  AnnualRevenueHistoryData,
  AvailableMonths,
  ConfirmedRevenueParameter,
  CreateOrUpdateRevenueModel,
  PaymentRequestFormData,
  PaymentRequestModel,
  ReturnTrip,
  RevenueData,
  RevenueExpenseVariables,
  TruckActivityRecord,
} from "../../models/truck-investment/revenue";

export default class RevenueStore {
  confirmedRevenueForTheMonth: RevenueData[] = [];
  unconfirmedRevenue: RevenueData[] = [];
  annualRevenueList: AnnualRevenueHistoryData[] = [];
  paymentRequests: PaymentRequestModel[] = [];
  revenueExpenseVariables: RevenueExpenseVariables[] = [];
  withdrawableAmount: number | null = null;
  availableMonths: AvailableMonths[] = [];
  availableYears: number[] = [];
  truckActivityRecords: TruckActivityRecord[] = [];
  outboundTripsRevenue: RevenueData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  createRevenue = async (values: CreateOrUpdateRevenueModel) => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);
      await agent.Revenue.createRevenue(values);

      store.commonStore.setSuccess("Revenue posted successfully ✓");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  createReturnTripRevenue = async (values: ReturnTrip) => {
    try {
      store.commonStore.setLoading(true);
      await agent.Revenue.createReturnTripRevenue(values);

      store.commonStore.setSuccess("Return trip revenue created ✓");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };

  updateRevenue = async (values: CreateOrUpdateRevenueModel) => {
    try {
      store.commonStore.setLoading(true);
      await agent.Revenue.updateRevenue(values);

      store.commonStore.setSuccess("Revenue Updated Successfully");

      this.getUnConfirmedRevenue(values.investorId);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };

  handleConfirmRevenue = async (values: CreateOrUpdateRevenueModel) => {
    try {
      store.commonStore.setLoading(true);

      const fleetData = await store.assetStore.getAnInvestorFleetById(
        values.investorId,
        values.fleetId
      );

      /* This if condition is to ensure that
       you don't reset a truck's current route 
       when there is still a reverse trip ongoing. */
      if (
        (fleetData.currentRoute !== "n/a" || fleetData.goodsLoaded !== "n/a") &&
        fleetData.currentRoute === combinedRoute(values.route)
      ) {
        await store.assetStore.updateAnInvestorFleet({
          ...fleetData,
          isInTransit: false,
          currentRoute: "n/a",
          goodsLoaded: "n/a",
        });
      }

      await this.updateRevenue({
        ...values,
        isConfirmed: true,
      });

      this.getUnConfirmedRevenue(values.investorId);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getConfirmedRevenue = async (values: ConfirmedRevenueParameter) => {
    try {
      const confirmedRevenue = await agent.Revenue.confirmedRevenue(values);

      runInAction(() => {
        this.confirmedRevenueForTheMonth = confirmedRevenue;
      });
    } catch (error) {
      throw error;
    }
  };

  getUnConfirmedRevenue = async (investorId: number) => {
    try {
      store.commonStore.setLoading(true);

      const unconfirmedRevenue = await agent.Revenue.unConfirmedRevenue(
        investorId
      );

      runInAction(() => {
        this.unconfirmedRevenue = unconfirmedRevenue;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getOutboundTripsRevenue = async () => {
    try {
      store.commonStore.setLoading(true);

      const result = await agent.Revenue.outboundTripsRevenue();

      runInAction(() => {
        this.outboundTripsRevenue = result;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getWithdrawableAmount = async (investorId: number) => {
    try {
      store.commonStore.setLoading(true);

      const amountLeft = await agent.Revenue.withdrawableAmount(investorId);

      runInAction(() => {
        this.withdrawableAmount = amountLeft;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
  getRevenueAndWithdraw = async (investorId: number) => {
    try {
      return await agent.Revenue.revenueAndWithdraws(investorId);
    } catch (error) {
      throw error;
    }
  };

  getAnnualRevenueHistory = async (values: ConfirmedRevenueParameter) => {
    try {
      const annualRevenue = await agent.Revenue.annualRevenueHistory(values);

      runInAction(() => {
        this.annualRevenueList = annualRevenue;
      });
    } catch (error) {
      throw error;
    }
  };

  makePaymentRequest = async (values: PaymentRequestFormData) => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);

      await agent.Revenue.requestPayment(values);
      this.getWithdrawableAmount(values.investorId);

      store.commonStore.setSuccess(
        `You have requested to withdraw ${NairaFormatter(
          +values.amountRequested!
        )} successfully ✓`
      );
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getAccountStatement = async (period: number, investorId: number) => {
    try {
      const debitAndCredit = await agent.Revenue.getAccountStatement(
        period,
        investorId
      );

      return debitAndCredit;
    } catch (error) {
      throw error;
    }
  };

  getAvailableMonths = async () => {
    try {
      const months = await agent.Revenue.getAvailableMonths();

      runInAction(() => {
        this.availableMonths = months;
      });
    } catch (error) {
      throw error;
    }
  };

  getAvailableYears = async () => {
    try {
      const years = await agent.Revenue.getAvailableYears();

      runInAction(() => {
        this.availableYears = years;
      });
    } catch (error) {
      throw error;
    }
  };

  getTruckActivityRecords = async (
    investorId: number,
    month: number,
    year: number
  ) => {
    try {
      store.commonStore.setLoading(true);

      const orgId = store.userAccountStore.user?.organisationId;

      const data = await agent.Revenue.getTruckActivityRecords(
        investorId,
        month,
        year,
        orgId!
      );

      runInAction(() => {
        this.truckActivityRecords = data;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getRelevantRevenueData = async () => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);

      const investorId = store.investorStore.investorId;
      const organisationId = store.userAccountStore.user?.organisationId;

      if (investorId && organisationId) {
        await this.getAnnualRevenueHistory({
          year: new Date().getFullYear(),
          investorId: +investorId,
          organisationId: organisationId,
        });

        await store.investorStore.getInvestorById(+investorId);

        await this.getConfirmedRevenue({
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          investorId: +investorId,
          organisationId: organisationId,
        });
      } else {
        customHistory.push("/account/login");
      }
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}

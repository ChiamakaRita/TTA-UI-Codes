import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../main/apiAgent";
import { store } from "../../main/appStore";
import {
  CreateInvestorClient,
  InvestorClient,
  InvestorClientPrice,
  CreateOrUpdateInvestorClientPrice,
} from "../../models/truck-investment/investorClients";

export class InvestorClientStore {
  investorClients: InvestorClient[] = [];
  investorClientPrices: InvestorClientPrice[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  createInvestorShipper = async (values: CreateInvestorClient) => {
    try {
      store.commonStore.setLoading(true);

      await agent.InvestorClients.create(values);
      store.commonStore.setSuccess("New Client Added ✓");

      this.getInvestorClients();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };

  getInvestorClients = async () => {
    try {
      store.commonStore.setLoading(true);
      const investorClients = await agent.InvestorClients.all();

      runInAction(() => {
        this.investorClients = investorClients;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getInvestorClientPrices = async (clientId: number) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.InvestorClients.prices(clientId);

      runInAction(() => {
        this.investorClientPrices = result;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  createInvestorClientPrice = async (
    values: CreateOrUpdateInvestorClientPrice
  ) => {
    try {
      store.commonStore.setLoading(true);

      await agent.InvestorClients.addPrice(values);
      store.commonStore.setSuccess("Shipper's Price Added ✓");

      this.getInvestorClientPrices(values.shipperId);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
      store.commonStore.setLoading(false);
    }
  };

  updateInvestorClientPrice = async (
    values: CreateOrUpdateInvestorClientPrice
  ) => {
    try {
      store.commonStore.setLoading(true);

      await agent.InvestorClients.updatePrice(values);
      store.commonStore.setSuccess("Shipper's Price Updated ✓");

      this.getInvestorClientPrices(values.shipperId);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
      store.commonStore.setLoading(false);
    }
  };
}

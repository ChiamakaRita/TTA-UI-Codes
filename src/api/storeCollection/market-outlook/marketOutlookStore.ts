import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../main/apiAgent";
import { store } from "../../main/appStore";
import {
  MarketOutlookData,
  MarketOutlookPayload,
} from "../../models/market-outlook/marketOutlook";

export class MarketOutlookStore {
  marketOutlooks: MarketOutlookData[] = [];

  currentNewsArticle: MarketOutlookData | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getMarketOutlooks = async (isActive = 1) => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);

      const list = await agent.MarketOutlook.list(isActive);
      runInAction(() => {
        this.marketOutlooks = list;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  createMarketOutlook = async (values: MarketOutlookPayload) => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);

      await agent.MarketOutlook.create(values);
      store.commonStore.setSuccess("Market outlook article posted ✓");

      this.getMarketOutlooks();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  editMarketOutlook = async (
    data: MarketOutlookData,
    activeStatus: boolean
  ) => {
    try {
      store.commonStore.setLoading(true);

      const userId = store.userAccountStore.user?.recordId!;

      const values: MarketOutlookPayload = {
        ...data,
        active: activeStatus,
        userId,
      };

      await agent.MarketOutlook.edit(data.id, values);
      store.commonStore.setSuccess("Market outlook article updated ✓");

      if (activeStatus) {
        this.getMarketOutlooks();
      }
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };

  deleteMarketOutlook = async (articleId: number) => {
    try {
      store.commonStore.setLoading(true);

      await agent.MarketOutlook.delete(articleId);
      store.commonStore.setSuccess("Market outlook article removed ✓");

      this.getMarketOutlooks();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getMarketOutlook = async (articleId: number) => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);
      const result = await agent.MarketOutlook.detail(articleId);

      runInAction(() => {
        this.currentNewsArticle = result;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  setCurrentArticle = (news: MarketOutlookData) => {
    window.scrollTo(0, 0);
    this.currentNewsArticle = news;
  };
}

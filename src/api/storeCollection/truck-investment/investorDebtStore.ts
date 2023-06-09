import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../main/apiAgent";
import { store } from "../../main/appStore";
import {
  CreateInvestorDebtPayload,
  InvestorDebtModel,
  InvestorDebtSummary,
  UpdateInvestorDebtPayload,
} from "../../models/truck-investment/investorDebt";

export class InvestorDebtStore {
  investorDebtSummary: InvestorDebtSummary | null = null;

  investorDebts: InvestorDebtModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getInvestorDebtSummary = async (investorId: number) => {
    try {
      const result = await agent.InvestorDebt.getDebtSummary(investorId);

      runInAction(() => {
        this.investorDebtSummary = result;
      });
    } catch (error) {
      throw error;
    }
  };

  getInvestorDebts = async (investorId: number) => {
    try {
      store.commonStore.setLoading(true);
      const debts = await agent.InvestorDebt.getDebts(investorId);

      runInAction(() => {
        this.investorDebts = debts;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  createInvestorDebt = async (values: CreateInvestorDebtPayload) => {
    try {
      const result = await agent.InvestorDebt.addInvestorDebt(values);

      store.commonStore.setSuccess("Debt added successfully ✓");

      this.getInvestorDebts(values.investorId);
      store.commonStore.setModalVisible(false);
      return result;
    } catch (error) {
      throw error;
    }
  };

  updateInvestorDebt = async (values: UpdateInvestorDebtPayload) => {
    try {
      const result = await agent.InvestorDebt.updateInvestorDebt(values);

      store.commonStore.setSuccess("Debt updated successfully ✓");
      this.getInvestorDebts(values.investorId);
      store.commonStore.setModalVisible(false);
      return result;
    } catch (error) {
      throw error;
    }
  };
}

import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../main/apiAgent";
import { store } from "../../main/appStore";
import {
  CreateExpenseData,
  DeclineExpenseData,
  ExpenseData,
  PayExpenseData,
} from "../../models/thh-expense/expense";

export class ThhExpenseStore {
  myPendingExpense: ExpenseData[] = [];
  expensesAwaitingPayment: ExpenseData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  createExpense = async (values: CreateExpenseData) => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);

      const result = await agent.ThhExpense.create(values);
      this.getMyPendingExpense();

      store.commonStore.setSuccess(
        `Your ${result.expenseCategory} expense has been sent ✓`
      );
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getMyPendingExpense = async () => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);
      const result = await agent.ThhExpense.myPendingExpenses();

      runInAction(() => (this.myPendingExpense = result));
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getExpensesAwaitingPayment = async () => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);
      const result = await agent.ThhExpense.expensesAwaitingPayment();

      runInAction(() => (this.expensesAwaitingPayment = result));
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  declineExpense = async (values: DeclineExpenseData) => {
    try {
      store.commonStore.setLoading(true);

      const result = await agent.ThhExpense.decline(values);

      store.commonStore.setSuccess(
        `${result.expenseCategory} expense poseted by ${result.creatorName} has been declined`
      );
      this.getExpensesAwaitingPayment();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };

  payExpense = async (values: PayExpenseData) => {
    try {
      store.commonStore.setLoading(true);

      const result = await agent.ThhExpense.pay(values);

      store.commonStore.setSuccess(
        `Expense by ${result.creatorName} settled successfully ✓`
      );

      this.getExpensesAwaitingPayment();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };
}

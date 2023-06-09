import requests from "../../main/apiConfig";
import {
  CreateExpenseData,
  DeclineExpenseData,
  ExpenseData,
  PayExpenseData,
} from "../../models/thh-expense/expense";

export const ThhExpense = {
  create: (values: CreateExpenseData) =>
    requests.post<ExpenseData>("/thh-expenses/create", values),

  myPendingExpenses: () =>
    requests.get<ExpenseData[]>("/thh-expenses/my-pending-expenses"),

  expensesAwaitingPayment: () =>
    requests.get<ExpenseData[]>("/thh-expenses/awaiting-payments"),

  decline: (values: DeclineExpenseData) =>
    requests.post<ExpenseData>("/thh-expenses/reject", values),

  pay: (values: PayExpenseData) =>
    requests.post<ExpenseData>("/thh-expenses/pay", values),
};

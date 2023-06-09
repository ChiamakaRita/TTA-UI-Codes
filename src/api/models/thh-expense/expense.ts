export interface CreateExpenseData {
  expenseCategory: string;
  details: string;
  amount: number;
}

export interface ExpenseData {
  id: number;
  creatorName: string;
  creatorEmail: string;
  expenseCategory: string;
  details: string;
  amount: number;
  isPaid: boolean;
  amountPaid: number;
  unpaidAmount: number;
  isResolved: boolean;
  isRejected: boolean;
  rejectReason: string;
  userId: number;
  dateAdded: string;
}

export interface DeclineExpenseData {
  id: number;
  rejectReason: string;
}

export interface PayExpenseData {
  id: number;
  amountPaid: number;
}

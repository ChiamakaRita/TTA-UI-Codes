export interface ExpenseVariableData {}

export interface InvestmentExpenseVariables {
  id: number;
  fuelPrice: number;
  thhCommissionPercent: number;
  constantForDieselByTruck: number;
  constantForDieselEmptyTruck: number;
  driverWagePercent: number;
  dateModified?: string;
}

export interface PriceCheckPayload {
  truckSize: number;
  dieselFactor: number;
  routes: RouteIds[];
  customDieselPrice: number;
}

export interface PredictedPricing {
  prices: RoutePrice[];
  independentVariables: IndependentVariables;
  truckVariables: TruckVariables;
}

export interface RouteIds {
  originId: number;
  destinationId: number;
}

export interface Origin {
  id: number;
  name: string;
}
export interface OriginPayload {
  name: string;
  state: string;
}

export interface TruckSize {
  id: number;
  truckSize: number;
}

export interface Destination {
  id: number;
  name: string;
  state: string;
}

export interface DestinationPayload {
  name: string;
  state: string;
  originId: number;
  originName: string;
  distance: number;
  leadTime: number;
}

export interface RoutePrice {
  origin: string;
  destination: string;
  price: number;
}

export interface IndependentVariables {
  id: number;
  loadingDays: number;
  offloadingDays: number;
  delayDays: number;
  scrappingPercent: number;
  truckUsefulLife: number;
  insurancePercent: number;
  dieselCost: number;
  gitInsurance: number;
  profitPercent: number;
  permitLevy: number;
  dateAdded: string;
}

export interface IndependentVariablePayload {
  loadingDays: number;
  offloadingDays: number;
  delayDays: number;
  scrappingPercent: number;
  truckUsefulLife: number;
  insurancePercent: number;
  dieselCost: number;
  gitInsurance: number;
  profitPercent: number;
  permitLevy: number;
}

export interface TruckVariables {
  id: number;
  truckSize: number;
  cost: number;
  dieselConsumption: number;
  maintenanceCost: number;
  driverPay: number;
  adminFees: number;
  dateAdded: string;
}

export interface TruckVariablesPayload {
  truckSize: number;
  cost: number;
  dieselConsumption: number;
  maintenanceCost: number;
  driverPay: number;
  adminFees: number;
}

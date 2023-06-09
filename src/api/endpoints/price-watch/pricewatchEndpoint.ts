import requests from "../../main/apiConfig";
import {
  Destination,
  DestinationPayload,
  IndependentVariablePayload,
  IndependentVariables,
  Origin,
  OriginPayload,
  PredictedPricing,
  PriceCheckPayload,
  TruckSize,
  TruckVariables,
  TruckVariablesPayload,
} from "../../models/price-watch/pricewatch";

export const Pricewatch = {
  origins: () => requests.get<Origin[]>(`/pricewatch/origins`),

  addOrigin: (payload: OriginPayload) =>
    requests.post<Origin>(`/pricewatch/origins`, payload),

  truckSizes: () =>
    requests.get<TruckSize[]>(`/pricewatch/available-truck-sizes`),

  destinations: (originId: number) =>
    requests.get<Destination[]>(`/pricewatch/destinations/${originId}`),

  addDestination: (payload: DestinationPayload) =>
    requests.post<Destination>(`/pricewatch/destinations`, payload),

  predictPrice: (payload: PriceCheckPayload) =>
    requests.post<PredictedPricing>("/pricewatch/predict-price", payload),

  getIndependentVariable: () =>
    requests.get<IndependentVariables>("/pricewatch/independent-variables"),

  addIndependentVariable: (payload: IndependentVariablePayload) =>
    requests.post<IndependentVariables>(
      "/pricewatch/independent-variables",
      payload
    ),

  getTruckVariables: (size: number) =>
    requests.get<TruckVariables>(`/pricewatch/truck-variables/${size}`),

  addTruckVariable: (payload: TruckVariablesPayload) =>
    requests.post<TruckVariables>("/pricewatch/truck-variables", payload),
};

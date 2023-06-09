import requests from "../../main/apiConfig";
import {
  MarketOutlookData,
  MarketOutlookPayload,
} from "../../models/market-outlook/marketOutlook";

export const MarketOutlook = {
  create: (payload: MarketOutlookPayload) =>
    requests.post<MarketOutlookData>(`/truckwatch/market-outlook`, payload),

  edit: (id: number, payload: MarketOutlookPayload) =>
    requests.put<MarketOutlookData>(
      `/truckwatch/market-outlook/${id}`,
      payload
    ),

  detail: (id: number) =>
    requests.get<MarketOutlookData>(`/truckwatch/market-outlook/${id}`),

  list: (isActive: number) =>
    requests.get<MarketOutlookData[]>(
      `/truckwatch/market-outlook?newsStatus=${isActive}`
    ),

  delete: (id: number) => requests.del(`/truckwatch/market-outlook/${id}`),
};

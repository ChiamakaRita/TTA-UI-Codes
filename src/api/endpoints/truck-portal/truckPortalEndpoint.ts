import requests from "../../main/apiConfig";
import {
  CancelTruckLoadingPayload,
  MakeTruckAvailablePayload,
  RequestToLoadPayload,
  TruckPortalData,
  TruckUpdateData,
  TruckUpdatePayload,
  TruckUpdateTimelineData,
} from "../../models/truck-portal/truckPortal";

export const TruckPortal = {
  makeTruckAvailable: (values: MakeTruckAvailablePayload) =>
    requests.post<TruckPortalData>("/truck-portals/make-available", values),

  getShippersAvailableTrucks: (shipperId: number) =>
    requests.get<TruckPortalData[]>(`/truck-portals/${shipperId}`),

  requestToLoadTruck: (shipperId: number, payload: RequestToLoadPayload) =>
    requests.post<TruckPortalData>(
      `/truck-portals/${shipperId}/request-to-load`,
      payload
    ),
  getShippersLoadingTrucks: (shipperId: number) =>
    requests.get<TruckPortalData[]>(`/truck-portals/${shipperId}/loading`),

  getShippersTransitTrucks: (shipperId: number) =>
    requests.get<TruckPortalData[]>(`/truck-portals/${shipperId}/transit`),

  getCarriersTransitTrucks: (transporterId: number) =>
    requests.get<TruckPortalData[]>(
      `/truck-portals/${transporterId}/transporter-transit-trucks`
    ),

  loadingComplete: (shipperId: number, truckId: number) =>
    requests.post<TruckPortalData>(
      `/truck-portals/${shipperId}/loading-complete/${truckId}`
    ),
  deliverLoad: (shipperId: number, truckId: number) =>
    requests.post<TruckPortalData>(
      `/truck-portals/${shipperId}/deliver-goods/${truckId}`
    ),

  cancelTruckLoading: (shipperId: number, payload: CancelTruckLoadingPayload) =>
    requests.post<TruckPortalData>(
      `/truck-portals/${shipperId}/cancel-loading`,
      payload
    ),

  // Truck Updates
  getTruckUpdates: (shipperId: number) =>
    requests.get<TruckUpdateData[]>(`/truck-updates/${shipperId}`),

  postTruckUpdate: (payload: TruckUpdatePayload) =>
    requests.post<TruckUpdateData>("/truck-updates", payload),

  getTruckUpdateTimelines: (truckRequestId: number) =>
    requests.get<TruckUpdateTimelineData[]>(
      `/truck-updates/${truckRequestId}/timelines`
    ),
};

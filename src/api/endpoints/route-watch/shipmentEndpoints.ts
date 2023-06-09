import requests from "../../main/apiConfig";
import {
  ActiveShipmentLocations,
  CreateShipmentForm,
  EditShipment,
  ShipmentData,
  ShipmentDetail,
} from "../../models/route-watch/shipments";

export const Shipment = {
  all: (orgId: number) =>
    requests.get<ShipmentData[]>(`/organisations/${orgId}/shipments`),

  activeLocations: (orgId: number) =>
    requests.get<ActiveShipmentLocations[]>(
      `/organisations/${orgId}/shipments/active-shipments-location`
    ),

  shipmentDetail: (orgId: number, shipmentId: number) =>
    requests.get<ShipmentDetail>(
      `/organisations/${orgId}/shipments/${shipmentId}`
    ),

  create: (data: CreateShipmentForm) =>
    requests.post<ShipmentDetail>(
      `/organisations/${data.organisationId}/shipments`,
      data
    ),

  editShipment: (values: EditShipment) =>
    requests.put(
      `/organisations/${values.organisationId}/shipments/${values.shipmentId}`,
      values
    ),

  getByTruckNumber: (orgId: number, truckNumber: string) =>
    requests.get<ShipmentDetail>(
      `/organisations/${orgId}/shipments/get-by-truck-number/${truckNumber}`
    ),
};

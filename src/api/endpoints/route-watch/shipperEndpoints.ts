import requests from "../../main/apiConfig";
import {
  RegisterShipperForm,
  ShipperDetails,
} from "../../models/route-watch/shipper";

export const Shippers = {
  all: (orgId: number) => requests.get<ShipperDetails[]>(`/shippers/${orgId}`),

  details: (shipperId: number) =>
    requests.get<ShipperDetails>(`/shippers/${shipperId}`),

  create: (values: RegisterShipperForm) =>
    requests.post<ShipperDetails>(`/shippers`, values),
};

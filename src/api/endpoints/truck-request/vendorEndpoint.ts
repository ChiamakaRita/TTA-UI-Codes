import requests from "../../main/apiConfig";
import {
  CreateOrUpdateVendor,
  VendorData,
} from "../../models/truck-request/vendor";

export const Vendor = {
  vendors: () => requests.get<VendorData[]>("/vendors"),

  create: (payload: CreateOrUpdateVendor) =>
    requests.post<VendorData>("/vendors", payload),

  update: (id: number, payload: CreateOrUpdateVendor) =>
    requests.put<VendorData>(`/vendors/${id}`, payload),
};

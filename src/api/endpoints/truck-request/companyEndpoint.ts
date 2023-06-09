import requests from "../../main/apiConfig";
import {
  CompanyData,
  CreateOrUpdateCompanyPayload,
} from "../../models/truck-request/company";

export const Company = {
  create: (payload: CreateOrUpdateCompanyPayload) =>
    requests.post<CompanyData>("/companies", payload),

  companies: () => requests.get<CompanyData[]>("/companies"),

  update: (id: number, payload: CreateOrUpdateCompanyPayload) =>
    requests.put<CompanyData>(`/companies/${id}`, payload),
};

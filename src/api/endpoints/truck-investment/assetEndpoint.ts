import requests from "../../main/apiConfig";
import {
  FleetData,
  RegisterOrUpdateFleet,
} from "../../models/truck-investment/asset";

export const Assets = {
  fleetByInvestor: (investorId: number) =>
    requests.get<FleetData[]>(`/investors/${investorId}/fleets`),

  fleetByInvestorById: (investorId: number, fleetId: number) =>
    requests.get<FleetData>(`/investors/${investorId}/fleets/${fleetId}`),

  addNewFleet: (data: RegisterOrUpdateFleet) =>
    requests.post<FleetData>(`/investors/${data.investorId}/fleets`, data),

  updateFleet: (data: RegisterOrUpdateFleet) =>
    requests.put<FleetData>(`/investors/${data.investorId}/fleets`, data),
};

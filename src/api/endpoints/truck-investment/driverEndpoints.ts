import requests from "../../main/apiConfig";
import {
  DriverData,
  DriverWithTruck,
  RegisterDriverModel,
} from "../../models/truck-investment/driver";

export const Driver = {
  all: () => requests.get<DriverData[]>("/drivers"),

  add: (payload: RegisterDriverModel) =>
    requests.post<DriverData>("/drivers", payload),

  edit: (id: number, payload: RegisterDriverModel) =>
    requests.put<DriverData>(`/drivers/${id}`, payload),

  delete: (id: number) => requests.del(`/drivers/${id}`),

  changeDriver: (oldDriverId: number, newDriverId: number) =>
    requests.post(`/drivers/change-driver/${oldDriverId}/${newDriverId}`),

  switchDriver: (driverA: number, driverB: number) =>
    requests.post(`/drivers/switch-driver/${driverA}/${driverB}`),

  driverWithFleet: () => requests.get<DriverWithTruck[]>(`/drivers/with-fleet`),
};

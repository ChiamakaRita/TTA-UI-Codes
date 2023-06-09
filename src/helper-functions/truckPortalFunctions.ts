import { CarrierOrganisation } from "../api/models/organisation";
import { ListItemView } from "../api/models/shared";

export const getShipperEmail = (id: number, shippers: ListItemView[]) => {
  return shippers.find((s) => s.id === id)?.contactEmail ?? "";
};
export const getShipperName = (id: number, shippers: ListItemView[]) => {
  return shippers.find((s) => s.id === id)?.name ?? "";
};
export const getShipperId = (id: number, shippers: ListItemView[]) => {
  return shippers.find((s) => s.id === id)?.id ?? 0;
};
export const getTransporterEmail = (
  id: number,
  transporters: CarrierOrganisation[]
) => {
  return transporters.find((s) => s.id === id)?.contactEmail ?? "";
};
export const getTransporterPhone = (
  id: number,
  transporters: CarrierOrganisation[]
) => {
  return transporters.find((s) => s.id === id)?.contactPhone ?? "";
};
export const getTransporterName = (
  id: number,
  transporters: CarrierOrganisation[]
) => {
  return transporters.find((s) => s.id === id)?.name ?? "";
};

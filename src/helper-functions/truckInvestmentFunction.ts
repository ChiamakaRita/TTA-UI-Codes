import _ from "lodash";
import { RevenueData } from "../api/models/truck-investment/revenue";

export const FleetStatusDecider = (
  transit: boolean,
  maintenance: boolean
): string => {
  if (transit) return "transit";
  if (maintenance) return "maintenance";
  return "parked";
};

export const RevenueAggregator = (value: RevenueData[]) => {
  return {
    diesel: _.sumBy(value, (el) => el.dieselCost),
    driverWage: _.sumBy(value, (el) => el.driverWage),
    managementCost: _.sumBy(value, (el) => el.managementCost),
    tripPrice: _.sumBy(value, (el) => el.tripPrice),
    miscellaneous: _.sumBy(value, (el) => el.miscellaneous),
  };
};

export const combinedRoute = (input: string) =>
  input.split(" to ").join(" to ");

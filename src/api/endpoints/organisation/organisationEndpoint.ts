import requests from "../../main/apiConfig";
import {
  CarrierOrganisation,
  OrganisationData,
} from "../../models/organisation";
import { ListItemView } from "../../models/shared";

export const Organisation = {
  organisation: (orgId: number) =>
    requests.get<OrganisationData>(`/organisations/${orgId}`),

  allShippers: () =>
    requests.get<ListItemView[]>("/organisations/shippers-only"),

  allCarriers: () =>
    requests.get<CarrierOrganisation[]>("/organisations/carriers-only"),
};

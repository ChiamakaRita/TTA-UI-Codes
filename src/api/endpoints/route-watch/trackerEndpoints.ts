import requests from "../../main/apiConfig";
import { EditTracker, NewTrackerData } from "../../models/route-watch/tracker";

export const Trackers = {
  create: (values: NewTrackerData) =>
    requests.post(
      `/organisations/${values.organisationID}/routes/${values.routeId}/trackers`,
      values
    ),

  editTracker: (values: EditTracker) =>
    requests.post(
      `/organisations/${values.organisationID}/routes/${values.routeID}/trackers/${values.id}`,
      values
    ),

  reassignTracker: (
    orgId: number,
    routeId: number,
    trackerId: number,
    newrouteId: number
  ) =>
    requests.post(
      `/organisations/${orgId}/routes/${routeId}/trackers/${trackerId}/assign/${newrouteId}`
    ),
};

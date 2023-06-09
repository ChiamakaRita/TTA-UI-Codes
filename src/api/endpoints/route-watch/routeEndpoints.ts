import requests from "../../main/apiConfig";
import { Route, RouteDetail, RouteList } from "../../models/route-watch/routes";
import { TrackerDetails } from "../../models/route-watch/tracker";

export const Routes = {
  create: (payload: Route) =>
    requests.post<void>(
      `/organisations/${payload.organisationID}/routes`,
      payload
    ),

  all: (orgId: number) =>
    requests.get<RouteList[]>(`/organisations/${orgId}/routes`),

  detail: (orgId: number, routeId: number) =>
    requests.get<RouteDetail>(`/organisations/${orgId}/routes/${routeId}`),

  trackers: (orgId: number, routeId: number) =>
    requests.get<TrackerDetails[]>(
      `/organisations/${orgId}/routes/${routeId}/available-trackers`
    ),

  distanceChecker: (origin: string, destination: string) =>
    requests.get(`/utilities/compute-distance/${origin}/${destination}`),

  uploadRoutes: (excel: any, orgId: number) =>
    requests.post(`/organisations/${orgId}/routes/upload-routes`, excel),
};

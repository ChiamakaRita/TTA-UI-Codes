import requests from "../../main/apiConfig";
import {
  CreateOrUpdatePlace,
  PlaceData,
} from "../../models/truck-request/place";

export const Place = {
  places: () => requests.get<PlaceData[]>("/places"),

  create: (payload: CreateOrUpdatePlace) =>
    requests.post<PlaceData>("/places", payload),

  update: (id: number, payload: CreateOrUpdatePlace) =>
    requests.put<PlaceData>(`/places/${id}`, payload),
};

import requests from "../../main/apiConfig";
import {
  FeedbackData,
  TopTruckRequestModel,
} from "../../models/home/landingInterfaces";

export const Landing = {
  topTruckRequest: () =>
    requests.get<TopTruckRequestModel[]>(`/home/top-truck-requests`),

  sendFeedback: (payload: FeedbackData) =>
    requests.post("/home/feedback", payload),
};

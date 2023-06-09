export interface TopTruckRequestModel {
  destination: string;
  numberOfRequest: number;
  avgTruckSize: number;
}

export interface FeedbackData {
  id?: number;
  topic: string;
  detail: string;
  senderEmail: string;
}

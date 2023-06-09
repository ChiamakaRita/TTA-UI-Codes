import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../../main/apiAgent";
import { store } from "../../main/appStore";
import {
  FeedbackData,
  TopTruckRequestModel,
} from "../../models/home/landingInterfaces";

export class LandingStore {
  topTruckRequests: TopTruckRequestModel[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  getTopTruckRequests = async () => {
    try {
      const result = await agent.Landing.topTruckRequest();
      runInAction(() => {
        this.topTruckRequests = result;
      });
    } catch (error) {
      throw error;
    }
  };

  sendFeedback = async (feedback: FeedbackData) => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);
      await agent.Landing.sendFeedback(feedback);
      toast.success("Your feedback was sent successfully");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}

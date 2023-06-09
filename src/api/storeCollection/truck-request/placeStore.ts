import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../main/apiAgent";
import { store } from "../../main/appStore";
import {
  CreateOrUpdatePlace,
  PlaceData,
} from "../../models/truck-request/place";
export class PlaceStore {
  places: PlaceData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getAllPlaces = async () => {
    try {
      const result = await agent.Place.places();

      runInAction(() => {
        this.places = result;
      });
    } catch (error) {
      throw error;
    }
  };

  addPlace = async (values: CreateOrUpdatePlace) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.Place.create(values);

      store.commonStore.setSuccess(
        `${result.destinationCity} data has been created successfully`
      );
      this.getAllPlaces();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };

  updatePlace = async (id: number, values: CreateOrUpdatePlace) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.Place.update(id, values);

      store.commonStore.setSuccess(
        `${result.destinationCity} data has been updated successfully`
      );
      this.getAllPlaces();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };
}

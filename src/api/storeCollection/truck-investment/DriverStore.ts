import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../main/apiAgent";
import { store } from "../../main/appStore";
import {
  DriverData,
  DriverWithTruck,
  RegisterDriverModel,
} from "../../models/truck-investment/driver";

export class DriverStore {
  drivers: DriverData[] = [];
  driverAndTruckList: DriverWithTruck[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getAllDrivers = async () => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);

      const result = await agent.Driver.all();

      runInAction(() => {
        this.drivers = result;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  createDriver = async (values: RegisterDriverModel) => {
    try {
      store.commonStore.setLoading(true);
      await agent.Driver.add(values);
      store.commonStore.setSuccess("Driver Created");
      this.getAllDrivers();
      store.commonStore.setModalVisible(false);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  updateDriver = async (driverId: number, values: RegisterDriverModel) => {
    try {
      store.commonStore.setLoading(true);
      await agent.Driver.edit(driverId, values);
      store.commonStore.setSuccess("Driver data updated");
      this.getAllDrivers();
      store.commonStore.setModalVisible(false);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  deleteDriver = async (id: number) => {
    try {
      store.commonStore.setLoading(true);

      await agent.Driver.delete(id);
      store.commonStore.setSuccess("Driver removed successfully");

      this.getAllDrivers();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  changeDriver = async (
    oldDriverId: number | null,
    newDriverId: number | null
  ) => {
    try {
      store.commonStore.setLoading(true);

      await agent.Driver.changeDriver(oldDriverId!, newDriverId!);
      store.commonStore.setSuccess("Driver change operation was successful");

      this.getAllDrivers();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };

  switchDriver = async (driverA: number | null, driverB: number | null) => {
    try {
      store.commonStore.setLoading(true);

      await agent.Driver.switchDriver(driverA!, driverB!);
      store.commonStore.setSuccess("Driver switching operation was successful");

      this.getAllDrivers();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };

  getDriverWithFleet = async () => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);

      const result = await agent.Driver.driverWithFleet();

      runInAction(() => {
        this.driverAndTruckList = result;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}

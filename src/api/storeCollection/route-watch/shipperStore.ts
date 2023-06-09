import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../main/apiAgent";
import { store } from "../../main/appStore";
import {
  RegisterShipperForm,
  ShipperDetails,
} from "../../models/route-watch/shipper";

export default class ShipperStore {
  allShippers: ShipperDetails[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getAllShippers = async () => {
    try {
      store.commonStore.setLoading(true);

      const organisationId = store.userAccountStore.user?.organisationId!;

      const shippers = await agent.Shippers.all(organisationId);

      runInAction(() => {
        this.allShippers = shippers;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  createNewShipper = async (payload: RegisterShipperForm) => {
    try {
      store.commonStore.setLoading(true);

      await agent.Shippers.create(payload);
      store.commonStore.setSuccess("Shipper added successfully ✓");

      this.getAllShippers();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
      store.commonStore.setLoading(false);
    }
  };
}

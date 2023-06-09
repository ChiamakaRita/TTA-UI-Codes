import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../main/apiAgent";
import { store } from "../../main/appStore";
import {
  CreateOrUpdateVendor,
  VendorData,
} from "../../models/truck-request/vendor";

export class VendorStore {
  vendors: VendorData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getAllVendors = async () => {
    try {
      const result = await agent.Vendor.vendors();

      runInAction(() => {
        this.vendors = result;
      });
    } catch (error) {
      throw error;
    }
  };

  addVendor = async (values: CreateOrUpdateVendor) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.Vendor.create(values);

      store.commonStore.setSuccess(
        `${result.preferredName} created successfully`
      );
      this.getAllVendors();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };

  updateVendor = async (id: number, values: CreateOrUpdateVendor) => {
    try {
      store.commonStore.setLoading(true);

      await agent.Vendor.update(id, values);
      store.commonStore.setSuccess(`Success ✓`);

      this.getAllVendors();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };

  deleteVendor = (data: VendorData) =>
    this.updateVendor(data.id, { ...data, isActive: false });
}

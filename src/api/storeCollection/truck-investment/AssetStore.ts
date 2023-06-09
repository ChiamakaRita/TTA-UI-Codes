import { toast } from "react-toastify";
import { makeAutoObservable, runInAction } from "mobx";
import { customHistory } from "../../..";
import agent from "../../main/apiAgent";
import { store } from "../../main/appStore";
import {
  FleetData,
  RegisterOrUpdateFleet,
} from "../../models/truck-investment/asset";

export class AssetStore {
  investorFleet: FleetData[] = [];
  isAssetFetched = false;

  constructor() {
    makeAutoObservable(this);
  }

  getAnInvestorFleet = async (investorId: number) => {
    try {
      window.scrollTo(0, 0);

      store.commonStore.setLoading(true);

      const fleet = await agent.Asset.fleetByInvestor(investorId);

      runInAction(() => {
        this.investorFleet = fleet;
      });

      this.setIsAssetFetched(true);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getAnInvestorFleetById = async (investorId: number, fleetId: number) => {
    try {
      const fleet = await agent.Asset.fleetByInvestorById(investorId, fleetId);
      return fleet;
    } catch (error) {
      throw error;
    }
  };

  addFleetToAnInvestor = async (values: RegisterOrUpdateFleet) => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);
      await agent.Asset.addNewFleet(values);

      store.commonStore.setSuccess("Fleet created successfully ✓");

      this.getAnInvestorFleet(values.investorId);
      customHistory.push("/admin/truck-investment");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  updateAnInvestorFleet = async (values: RegisterOrUpdateFleet) => {
    try {
      await agent.Asset.updateFleet(values);
      toast.success("Fleet updated successfully!");
    } catch (error) {
      throw error;
    }
  };

  setIsAssetFetched = (value: boolean) => (this.isAssetFetched = value);

  getRouteDetails = async (routeId: number) => {
    try {
      if (routeId === undefined) {
        throw toast.error(
          "No shipment has been created with this truck number"
        );
      }
      const orgId = store.userAccountStore.user?.organisationId!;

      const details = await agent.Routes.detail(orgId, routeId);

      return details;
    } catch (error) {
      throw error;
    }
  };
}

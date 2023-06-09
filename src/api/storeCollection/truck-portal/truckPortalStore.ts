import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../main/apiAgent";
import { store } from "../../main/appStore";
import {
  CancelTruckLoadingPayload,
  MakeTruckAvailablePayload,
  RequestToLoadPayload,
  TruckPortalData,
  TruckUpdateData,
  TruckUpdatePayload,
} from "../../models/truck-portal/truckPortal";

export class TruckPortalStore {
  availableTrucks: TruckPortalData[] = [];
  loadingTrucks: TruckPortalData[] = [];
  transitTrucks: TruckPortalData[] = [];
  carrierTrucks: TruckPortalData[] = [];

  //Truck Updates
  truckUpdates: TruckUpdateData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getTruckPortalDropdownData = async () => {
    try {
      store.commonStore.setLoading(true);

      if (
        store.userAccountStore.isInHouse &&
        store.organisationStore.allShippersList.length === 0
      ) {
        console.log("Getting shippers");
        await store.organisationStore.getShippersOnlyOrganisation();
      }

      if (store.vendorStore.vendors.length === 0) {
        await store.organisationStore.getCarriersOnlyOrganisation();
      }

      if (store.placeStore.places.length === 0) {
        await store.placeStore.getAllPlaces();
      }
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  makeTruckAvailableToShipper = async (values: MakeTruckAvailablePayload) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.TruckPortal.makeTruckAvailable(values);
      store.commonStore.setSuccess(
        `Success: ${result.truckNumber} now available for ${result.shipperName}`
      );
      return;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };

  getShippersAvailableTrucks = async (shipperId: number) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.TruckPortal.getShippersAvailableTrucks(
        shipperId
      );

      runInAction(() => {
        this.availableTrucks = result;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  requestToLoadTruck = async (
    shipperId: number,
    values: RequestToLoadPayload
  ) => {
    try {
      store.commonStore.setLoading(true);
      await agent.TruckPortal.requestToLoadTruck(shipperId, values);
      store.commonStore.setSuccess(`Request to load was sent successfully ✓`);
      this.getShippersAvailableTrucks(shipperId);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };

  getShippersLoadingTrucks = async (shipperId: number) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.TruckPortal.getShippersLoadingTrucks(
        shipperId
      );

      runInAction(() => {
        this.loadingTrucks = result;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  loadingTruckCompleted = async (truckId: number) => {
    try {
      store.commonStore.setLoading(true);
      const orgId = store.userAccountStore.user?.organisationId!;

      await agent.TruckPortal.loadingComplete(orgId, truckId);

      store.commonStore.setSuccess(`Success ✓`);

      this.getShippersLoadingTrucks(orgId);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };
  deliverLoad = async (truckId: number) => {
    try {
      store.commonStore.setLoading(true);
      const orgId = store.userAccountStore.user?.organisationId!;

      await agent.TruckPortal.deliverLoad(orgId, truckId);

      store.commonStore.setSuccess(`Success ✓`);

      this.getCarriersTransitTrucks(orgId);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };

  cancelTruckLoading = async (values: CancelTruckLoadingPayload) => {
    try {
      store.commonStore.setLoading(true);
      const orgId = store.userAccountStore.user?.organisationId!;

      await agent.TruckPortal.cancelTruckLoading(orgId, values);
      store.commonStore.setSuccess(`Cancellation successful ✓`);

      this.getShippersLoadingTrucks(orgId);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };

  getShippersTransitTrucks = async (shipperId: number) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.TruckPortal.getShippersTransitTrucks(
        shipperId
      );

      runInAction(() => {
        this.transitTrucks = result;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      this.getTruckUpdates(shipperId);
    }
  };

  getCarriersTransitTrucks = async (transporterId: number) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.TruckPortal.getCarriersTransitTrucks(
        transporterId
      );

      runInAction(() => {
        this.carrierTrucks = result;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // Truck Updates Methods
  getTruckUpdates = async (shipperId: number) => {
    try {
      const result = await agent.TruckPortal.getTruckUpdates(shipperId);

      runInAction(() => {
        this.truckUpdates = result;
      });
    } catch (error) {
      throw error;
    }
  };

  sendTruckUpdate = async (values: TruckUpdatePayload) => {
    try {
      await agent.TruckPortal.postTruckUpdate(values);
      store.commonStore.setSuccess(
        `Truck update for ${values.truckNumber} sent ✓`
      );
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
    }
  };

  getTruckUpdateTimelines = async (requestId: number) => {
    try {
      store.commonStore.setLoading(true);
      const response = await agent.TruckPortal.getTruckUpdateTimelines(
        requestId
      );

      return response;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}

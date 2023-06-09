import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../main/apiAgent";
import { store } from "../../main/appStore";
import {
  CreateShipmentForm,
  ShipmentData,
} from "../../models/route-watch/shipments";

export class ShipmentStore {
  activeLoads: ShipmentData[] = [];
  offloadedLoads: ShipmentData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  createShipment = async (data: CreateShipmentForm) => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);

      //Get Route to be ploughed for this shipment
      const routeToBeUsed = await agent.Routes.detail(
        data.organisationId,
        data.routeID
      );

      // Find the actual tracker associated with this shipment on the retrieved route
      const trackerToBeUsed = routeToBeUsed.trackers.find(
        (t) => +t.id === +data.trackerID
      )!;

      // Update the tracker by setting it to be active
      trackerToBeUsed.isActive = true;

      await agent.Trackers.editTracker({
        ...trackerToBeUsed,
        routeID: data.routeID,
        organisationID: data.organisationId,
      });

      // Now create the shipment
      await agent.Shipment.create(data);

      store.commonStore.setSuccess(
        "Shipment creation successful. Tracking will commence shortly"
      );
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getActiveShipments = async () => {
    try {
      store.commonStore.setLoading(true);

      const organisationId = store.userAccountStore.user?.organisationId!;

      const shipments = await agent.Shipment.all(organisationId);

      runInAction(() => {
        this.activeLoads = shipments.filter((el) => el.isActive === true);
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getShipmentDetails = async (orgId: number, shipmentId: number) => {
    try {
      return await agent.Shipment.shipmentDetail(orgId, shipmentId);
    } catch (error) {
      throw error;
    }
  };

  offloadShipment = async (status: boolean, shipment: ShipmentData) => {
    try {
      window.scrollTo(0, 0);

      store.commonStore.setLoading(true);
      const organisationId = store.userAccountStore.user?.organisationId!;

      // Get details of shipment
      const detail = await this.getShipmentDetails(organisationId, shipment.id);

      // Ascertain route used
      const routeUsed = await agent.Routes.detail(
        organisationId,
        detail.routeID
      );

      // Find the specific tracker from list of trackers on the route
      const trackerAttached = routeUsed.trackers.find(
        (t) => +t.id === detail.trackerID
      );

      if (trackerAttached) {
        // Update the status of the tracker based on toggle switch status
        trackerAttached.isActive = status;
        await agent.Trackers.editTracker({
          ...trackerAttached,
          routeID: detail.routeID,
          organisationID: organisationId,
        });
      }

      // Prepare object that edit shipment accepts
      const editData = {
        shipmentId: detail.id,
        organisationId,
        recipientName: detail.recipientName,
        recipientAddress: detail.recipientAddress,
        recipientPhone: detail.recipientPhone,
        deliveryDate: new Date().toISOString(),
        isActive: status,
        driverName: detail.driverName,
        driverPhone: detail.driverPhone,
        isDeleted: false,
        contentDescription: detail.contentDescription,
        contentCategory: detail.contentCategory,
        truckNumber: detail.truckNumber,
      };

      await agent.Shipment.editShipment(editData);

      store.commonStore.setSuccess("Offloading was successful ✓");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getOffloadedShipments = async () => {
    try {
      store.commonStore.setLoading(true);

      const organisationId = store.userAccountStore.user?.organisationId!;
      const shipments = await agent.Shipment.all(organisationId);

      const offloaded = shipments.filter((el) => el.isActive === false);

      runInAction(() => {
        this.offloadedLoads = offloaded;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getShipmentByTruckNumber = async (truckNumber: string) => {
    try {
      const orgId = store.userAccountStore.user?.organisationId!;

      const shipment = await agent.Shipment.getByTruckNumber(
        orgId,
        truckNumber
      );

      return shipment;
    } catch (error) {
      throw error;
    }
  };
}

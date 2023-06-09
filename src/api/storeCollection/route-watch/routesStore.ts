import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../main/apiAgent";
import { store } from "../../main/appStore";
import { Route, RouteDetail, RouteList } from "../../models/route-watch/routes";
import { NewTrackerData } from "../../models/route-watch/tracker";

export default class RouteStore {
  allRoutes: RouteList[] = [];
  currentRouteDetail: RouteDetail | null = null;
  isTrackerFetched = false;

  constructor() {
    makeAutoObservable(this);
  }

  createRoute = async (payload: Route) => {
    try {
      store.commonStore.setLoading(true);

      await agent.Routes.create(payload);
      store.commonStore.setSuccess("Route creation successful ✓");

      this.getAllRoutes();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
      store.commonStore.setLoading(false);
    }
  };

  getAllRoutes = async () => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);

      const organisationId = store.userAccountStore.user?.organisationId!;

      const fetchedRoutes = await agent.Routes.all(organisationId);
      runInAction(() => {
        this.allRoutes = fetchedRoutes;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getRouteDetails = async (routeId: number) => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);

      const orgId = store.userAccountStore.user?.organisationId!;

      const details = await agent.Routes.detail(orgId, routeId);

      runInAction(() => {
        this.currentRouteDetail = details;
      });

      this.setIsTrackerFetched(true);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  createTracker = async (payload: NewTrackerData) => {
    try {
      store.commonStore.setLoading(true);

      await agent.Trackers.create(payload);
      store.commonStore.setSuccess("Tracker added successfully ✓");

      this.getRouteDetails(payload.routeId);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
      store.commonStore.setLoading(false);
    }
  };

  reassingTracker = async (
    orgId: number,
    routeId: number,
    trackerId: number,
    newrouteId: number
  ) => {
    try {
      store.commonStore.setLoading(true);

      await agent.Trackers.reassignTracker(
        orgId,
        routeId,
        trackerId,
        newrouteId
      );
      store.commonStore.setSuccess("Tracker reassignment was successful ✓");

      this.getRouteDetails(routeId);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
      store.commonStore.setLoading(false);
    }
  };

  getAvailableTrackers = async (routeId: number) => {
    try {
      store.commonStore.setLoading(true);

      const organisationId = store.userAccountStore.user?.organisationId!;

      const fetchedTrackers = await agent.Routes.trackers(
        organisationId,
        routeId
      );

      if (fetchedTrackers.length === 0) {
        window.scrollTo(0, 0);
        store.commonStore.setError(
          "No available tracker for this route, assign a tracker and try again"
        );
      }

      return fetchedTrackers;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  uploadRouteExcel = async (excel: any) => {
    try {
      store.commonStore.setLoading(true);

      const orgId = store.userAccountStore.user?.organisationId!;
      await agent.Routes.uploadRoutes(excel, orgId);

      store.commonStore.setSuccess("Routes upload was successful ✓");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  setIsTrackerFetched = (value: boolean) => (this.isTrackerFetched = value);
}

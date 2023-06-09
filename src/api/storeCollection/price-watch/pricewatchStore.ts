import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../main/apiAgent";
import { store } from "../../main/appStore";
import {
  Destination,
  DestinationPayload,
  IndependentVariablePayload,
  IndependentVariables,
  Origin,
  OriginPayload,
  PredictedPricing,
  PriceCheckPayload,
  TruckSize,
  TruckVariablesPayload,
} from "../../models/price-watch/pricewatch";

export class PricewatchStore {
  origins: Origin[] = [];
  destinations: Destination[] = [];
  truckSizes: TruckSize[] = [];
  prediction: PredictedPricing | null = null;
  currentPayload: PriceCheckPayload | null = null;
  independentVariables: IndependentVariables | null = null;
  lastSelectedOriginId: number | null = null;
  lastFetchedDestinations: Destination[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getFormSetupData = async () => {
    try {
      store.commonStore.setLoading(true);

      const origins = await agent.Pricewatch.origins();
      const truckSizes = await agent.Pricewatch.truckSizes();

      runInAction(() => {
        this.origins = origins;
        this.truckSizes = truckSizes;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getOrigins = async () => {
    try {
      store.commonStore.setLoading(true);

      const origins = await agent.Pricewatch.origins();

      runInAction(() => {
        this.origins = origins;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  createOrigin = async (values: OriginPayload) => {
    try {
      store.commonStore.setLoading(true);

      await agent.Pricewatch.addOrigin(values);

      this.getOrigins();

      store.commonStore.setSuccess(
        `${values.name}, ${values.state} added successfully ✓`
      );
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
      store.commonStore.setLoading(false);
    }
  };

  getTruckSizes = async () => {
    try {
      const truckSizes = await agent.Pricewatch.truckSizes();

      runInAction(() => {
        this.truckSizes = truckSizes;
      });
    } catch (error) {
      throw error;
    }
  };

  getDestinationsForPrediction = async (originId: number) => {
    try {
      if (originId === this.lastSelectedOriginId) {
        return this.lastFetchedDestinations;
      }

      store.commonStore.setLoading(true);

      const result = await agent.Pricewatch.destinations(originId);

      this.lastSelectedOriginId = originId;

      runInAction(() => {
        this.lastFetchedDestinations = result;
      });

      return result;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getDestinations = async (originId: number) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.Pricewatch.destinations(originId);

      runInAction(() => {
        this.destinations = result;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  createDestination = async (values: DestinationPayload) => {
    try {
      store.commonStore.setLoading(true);

      await agent.Pricewatch.addDestination(values);

      this.getDestinations(values.originId);

      store.commonStore.setSuccess(
        `${values.name}, ${values.state} added successfully ✓`
      );
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
      store.commonStore.setLoading(false);
    }
  };

  runPricePrediction = async (values: PriceCheckPayload) => {
    try {
      window.scrollTo(0, 0);
      const validRoutes = values.routes.filter(
        (el) => el.originId !== 0 && el.destinationId !== 0
      );

      const validValues = { ...values, routes: validRoutes };

      if (validValues.routes.length === 0) {
        store.commonStore.setError(
          "You must enter atleast one origin & destination"
        );
        return;
      }
      this.setCurrentPayload(validValues);
      store.commonStore.setLoading(true);
      const result = await agent.Pricewatch.predictPrice(validValues);

      runInAction(() => {
        this.prediction = result;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  rerunPrediction = async (dieselCost: number) => {
    try {
      const values = { ...this.currentPayload!, customDieselPrice: dieselCost };

      this.runPricePrediction(values);
    } catch (error) {
      throw error;
    }
  };

  getIndependentVariables = async () => {
    try {
      const result = await agent.Pricewatch.getIndependentVariable();

      runInAction(() => {
        this.independentVariables = result;
      });
    } catch (error) {
      throw error;
    }
  };

  getPricewatchVariables = async () => {
    try {
      store.commonStore.setLoading(true);
      await this.getIndependentVariables();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  postIndependentVariables = async (values: IndependentVariablePayload) => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);
      await agent.Pricewatch.addIndependentVariable(values);

      this.getIndependentVariables();

      store.commonStore.setSuccess(`Update was successful`);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getTruckVariables = async (size: number) => {
    try {
      const result = await agent.Pricewatch.getTruckVariables(size);

      return result;
    } catch (error) {
      throw error;
    }
  };

  postTruckVariables = async (values: TruckVariablesPayload) => {
    try {
      await agent.Pricewatch.addTruckVariable(values);

      this.getTruckVariables(values.truckSize);
      this.getTruckSizes();

      store.commonStore.setSuccess(`Successful ✓`);
      window.scrollTo(0, 0);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
    }
  };

  setResultToNull = () => (this.prediction = null);

  setCurrentPayload = (values: PriceCheckPayload) =>
    (this.currentPayload = values);
}

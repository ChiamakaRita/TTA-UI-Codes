import { makeAutoObservable, runInAction } from "mobx";
import agent from "../main/apiAgent";
import { CarrierOrganisation, OrganisationData } from "../models/organisation";
import { ListItemView } from "../models/shared";

export class OrganisationStore {
  allShippersList: ListItemView[] = [];
  allCarriers: CarrierOrganisation[] = [];
  org: OrganisationData | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isCarrier() {
    return this.org?.accountType === "carrier";
  }

  get isShipper() {
    return this.org?.accountType === "shipper";
  }

  getOrganisation = async (orgId: number) => {
    try {
      const result = await agent.Organisation.organisation(orgId);

      runInAction(() => {
        this.org = result;
      });
    } catch (error) {
      throw error;
    }
  };

  getShippersOnlyOrganisation = async () => {
    try {
      const result = await agent.Organisation.allShippers();

      runInAction(() => {
        this.allShippersList = result;
      });
    } catch (error) {
      throw error;
    }
  };

  getCarriersOnlyOrganisation = async () => {
    try {
      const result = await agent.Organisation.allCarriers();

      runInAction(() => {
        this.allCarriers = result;
      });
    } catch (error) {
      throw error;
    }
  };
}

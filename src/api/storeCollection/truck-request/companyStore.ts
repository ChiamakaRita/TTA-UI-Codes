import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../main/apiAgent";
import { store } from "../../main/appStore";
import {
  CompanyData,
  CreateOrUpdateCompanyPayload,
} from "../../models/truck-request/company";

export class CompanyStore {
  companies: CompanyData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  allCompanies = async () => {
    try {
      const result = await agent.Company.companies();

      runInAction(() => {
        this.companies = result;
      });
    } catch (error) {
      throw error;
    }
  };

  addCompany = async (values: CreateOrUpdateCompanyPayload) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.Company.create(values);

      store.commonStore.setSuccess(
        `${result.name} data has been created successfully`
      );
      this.allCompanies();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };

  updateCompany = async (id: number, values: CreateOrUpdateCompanyPayload) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.Company.update(id, values);

      store.commonStore.setSuccess(
        `${result.name} data has been updated successfully`
      );
      this.allCompanies();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };
}

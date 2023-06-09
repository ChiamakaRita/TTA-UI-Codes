import { makeAutoObservable, reaction, runInAction } from "mobx";
import { toast } from "react-toastify";
import { customHistory } from "../../..";
import agent from "../../main/apiAgent";
import { store } from "../../main/appStore";
import {
  CreateBankDetailsModel,
  InvestorApplicationModel,
  InvestorData,
  InvestorProfile,
} from "../../models/truck-investment/investor";

export class InvestorStore {
  pendingInvestors: InvestorData[] = [];
  verifiedInvestors: InvestorData[] = [];
  currentInvestorProfile: InvestorProfile | null = null;
  investorId: string | null = window.localStorage.getItem("investorId");
  selectedInvestor: InvestorData | null = null;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.investorId,
      (investorId) => {
        if (investorId) {
          window.localStorage.setItem("investorId", investorId);
        } else {
          window.localStorage.removeItem("investorId");
        }
      }
    );
  }

  getInvestorProfile = async (id: number) => {
    try {
      store.commonStore.setLoading(true);

      const investor = await agent.Investor.investorById(id);
      const bankDetail = await agent.Investor.getInvestorBankDetails(id);
      runInAction(() => {
        this.currentInvestorProfile = {
          investorData: investor,
          bankDetail,
        };
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  setInvestorId = (id: string | null) => {
    this.investorId = id;
  };

  applyAsInvestor = async (payload: InvestorApplicationModel) => {
    try {
      window.scrollTo(0, 0);

      store.commonStore.setLoading(true);

      await agent.Investor.applyAsInvestor(payload);
      store.commonStore.setSuccess(
        "Your application has been submitted and you'll be contacted soon ✓"
      );

      customHistory.push("/");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  approveInvestor = async (guid: string) => {
    try {
      store.commonStore.setLoading(true);

      await agent.Investor.approveApplicant(guid);
      store.commonStore.setSuccess("Investor succesfully approved ✓");
      store.commonStore.setModalVisible(false);
      this.getPendingInvestors();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  declineInvestor = async (guid: string) => {
    try {
      store.commonStore.setLoading(true);

      await agent.Investor.declineApplicant(guid);
      store.commonStore.setSuccess("Investor's application declined ");
      store.commonStore.setModalVisible(false);
      this.getPendingInvestors();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getPendingInvestors = async () => {
    try {
      store.commonStore.setLoading(true);

      const investors = await agent.Investor.getAllInvestors("pending");

      runInAction(() => {
        this.pendingInvestors = investors;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getVerifiedInvestors = async () => {
    try {
      store.commonStore.setLoading(true);

      const investors = await agent.Investor.getAllInvestors("approved");

      runInAction(() => {
        this.verifiedInvestors = investors;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getInvestorById = async (id: number) => {
    try {
      var inv = await agent.Investor.investorById(id);

      runInAction(() => {
        this.selectedInvestor = inv;
      });

      return inv;
    } catch (error) {
      throw error;
    }
  };

  getInvestorBankDetails = async (investorId: number) => {
    try {
      const bankDetails = await agent.Investor.getInvestorBankDetails(
        investorId
      );
      return bankDetails;
    } catch (error) {
      throw error;
    }
  };

  createInvestorBankDetails = async (values: CreateBankDetailsModel) => {
    try {
      store.commonStore.setLoading(true);

      const bankDetail = await this.getInvestorBankDetails(values.investorId);

      if (bankDetail.length > 0) {
        toast.error("You already have bank details attached to your profile.");
        throw new Error();
      }

      await agent.Investor.createBankDetail(values);
      toast.success("Your bank details successfully added!");
      await this.getInvestorProfile(values.investorId);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };
}

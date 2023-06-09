import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import { customHistory } from "../..";
import { thhOrgId } from "../../urls";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
import {
  LoginPayload,
  OrganisationUserData,
  PasswordReset,
  RegisterData,
  UpdateUserData,
  UserData,
} from "../models/userAccount";

export class UserAccountStore {
  authenticationErrorMessage: string | null = "";
  user: UserData | null = null;
  usersInOrg: UserData[] = [];
  isLoginBtnClicked = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isAdmin() {
    return this.user?.roles.includes("Admin");
  }

  get isInHouse() {
    return this.user?.organisationId === thhOrgId;
  }

  get isInvestor() {
    return this.user?.roles.includes("Investor");
  }

  get isLoggedIn() {
    return !!this.user;
  }

  setBtnClicked = (value: boolean) => (this.isLoginBtnClicked = value);

  login = async (values: LoginPayload) => {
    try {
      store.commonStore.setLoading(true);

      const result = await agent.UserAccount.login(values);
      store.commonStore.setToken(result.token);
      store.commonStore.setId(result.id);

      runInAction(() => {
        this.user = result;
      });

      if (this.user && this.isInvestor) {
        const investor = await agent.Investor.investorByGuid(this.user.id);
        store.investorStore.setInvestorId(investor.id.toString());
      }

      store.commonStore.redirectDecision();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  register = async (credentials: RegisterData) => {
    try {
      window.scrollTo(0, 0);
      await agent.UserAccount.register(credentials);
      this.login({
        username: credentials.email,
        password: credentials.password,
      });
    } catch (error) {
      throw error;
    }
  };

  setAuthenticationErrorMessage = (title: string | null) => {
    if (title === "Unauthorized" && this.isLoginBtnClicked === false) {
      this.authenticationErrorMessage =
        "Your session expired, please login again";
    } else if (title === "Unauthorized" && this.isLoginBtnClicked) {
      this.authenticationErrorMessage = "Incorrect email or password";
    } else {
      this.authenticationErrorMessage = title;
    }
  };

  myAccount = async (userId: string) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.UserAccount.myAccount(userId);
      store.organisationStore.getOrganisation(result.organisationId);

      runInAction(() => {
        this.user = result;
      });

      if (this.user && this.isInvestor) {
        const investor = await agent.Investor.investorByGuid(this.user.id);
        store.investorStore.setInvestorId(investor.id.toString());
      }

      store.commonStore.redirectDecision();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  update = async (values: UpdateUserData) => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);

      const result = await agent.UserAccount.update({ ...values, email: "" });

      runInAction(() => {
        this.user = result;
      });
      store.commonStore.setSuccess("Profile updated ✓");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  logout = () => {
    store.commonStore.setLastVisitedPathname(null);
    this.user = null;

    store.commonStore.setToken(null);
    store.commonStore.setId(null);

    customHistory.push("/account/login");
  };

  usersInOrganisation = async (id: number) => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);

      const result = await agent.UserAccount.usersInOrganisation(id);

      runInAction(() => {
        this.usersInOrg = result;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  modifyRole = async (userId: string, value: string) => {
    try {
      store.commonStore.setLoading(true);

      const result = await agent.UserAccount.modifyRole(userId, [value]);
      store.commonStore.setSuccess(
        `${result.firstName} ${result.lastName}'s role was modified successfully ✓`
      );

      store.commonStore.setModalVisible(false);
      this.usersInOrganisation(this.user?.organisationId!);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
      store.commonStore.setLoading(false);
    }
  };

  addUserToOrganisation = async (values: OrganisationUserData) => {
    try {
      store.commonStore.setLoading(true);

      const result = await agent.UserAccount.addUserToOrg(values);

      store.commonStore.setSuccess(
        `${result.firstName} ${result.lastName} was added to this organisation ✓`
      );

      store.commonStore.setModalVisible(false);
      this.usersInOrganisation(this.user?.organisationId!);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
      store.commonStore.setLoading(false);
    }
  };

  subscribeNewsLetter = async (emailAddress: string) => {
    try {
      await agent.UserAccount.addNewsLetterSubscriber(emailAddress);
      toast.success("Thanks for subscribing to our news letters!");
    } catch (error) {
      throw error;
    }
  };

  forgotPassword = async (email: string) => {
    try {
      store.commonStore.setLoading(true);

      await agent.UserAccount.forgotPassword(email);
      store.commonStore.setSuccess("Reset link sent to your email");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  reset = async (values: PasswordReset) => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);

      await agent.UserAccount.resetPassword(values);
      store.commonStore.setSuccess("Password successfully changed");
      customHistory.push("/account/login");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}

import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { makeAutoObservable, reaction } from "mobx";
import { customHistory } from "../..";
import { hamburgerMenuData } from "../../local-data/shared/hamburgerMenuData";
import { LinkData } from "../models/shared";

export class CommonStore {
  id: string | null = window.localStorage.getItem("id-thh");
  token: string | null = window.localStorage.getItem("jwt-thh");
  error: string | null = null;
  success: string | null = null;
  loading = false;
  drawerVisible = false;
  drawerData: LinkData[] = hamburgerMenuData;
  modalVisible = false;
  modalContent: ReactJSXElement | null = null;
  isThereError = false;
  isThereSuccess = false;
  lastVisitedPathname: string | null = null;
  onreloadPath: string | null = window.localStorage.getItem("reload-path-thh");
  showFooter: boolean = true;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt-thh", token);
        } else {
          window.localStorage.removeItem("jwt-thh");
        }
      }
    );

    reaction(
      () => this.id,
      (id) => {
        if (id) {
          window.localStorage.setItem("id-thh", id);
        } else {
          window.localStorage.removeItem("id-thh");
        }
      }
    );

    reaction(
      () => this.onreloadPath,
      (onreloadPath) => {
        if (onreloadPath) {
          window.localStorage.setItem("reload-path-thh", onreloadPath);
        } else {
          window.localStorage.removeItem("reload-path-thh");
        }
      }
    );
  }

  setLoading = (value: boolean) => (this.loading = value);

  setDrawerVisible = (value: boolean) => (this.drawerVisible = value);

  setDrawerData = (value: LinkData[]) => (this.drawerData = value);

  setModalVisible = (value: boolean) => (this.modalVisible = value);

  setModalContent = (content: ReactJSXElement) => {
    window.scrollTo(0, 0);
    this.modalVisible = true;
    this.modalContent = content;
  };

  setIsThereError = (value: boolean) => (this.isThereError = value);

  setError = async (message: string | null) => {
    if (message) {
      this.setIsThereError(true);
    }
    this.error = message;

    setTimeout(() => {
      this.setIsThereError(false);
    }, 8000);
  };

  setIsThereSuccess = (value: boolean) => (this.isThereSuccess = value);

  setSuccess = async (message: string | null) => {
    if (message) {
      this.setIsThereSuccess(true);
    }
    this.success = message;

    setTimeout(() => {
      this.setIsThereSuccess(false);
    }, 8000);
  };

  setToken = (token: string | null) => {
    this.token = token;
  };

  setId = (id: string | null) => {
    this.id = id;
  };

  setOnreloadPath = (path: string | null) => {
    this.onreloadPath = path;
  };

  setLastVisitedPathname = (pathname: string | null) => {
    this.lastVisitedPathname = pathname;
  };

  redirectDecision = () => {
    let linkToDirect;

    if (this.lastVisitedPathname === "/" || this.onreloadPath === "/") {
      linkToDirect = "/dashboard";
    } else if (
      this.lastVisitedPathname !== null &&
      this.lastVisitedPathname !== "/account/login" &&
      this.lastVisitedPathname !== "/account/forgot-password"
    ) {
      linkToDirect = this.lastVisitedPathname;
    } else if (
      this.onreloadPath !== null &&
      this.onreloadPath !== "/account/login" &&
      this.onreloadPath !== "/account/forgot-password" &&
      !this.onreloadPath.includes("/account/reset-password") &&
      this.onreloadPath !== "/account/register"
    ) {
      linkToDirect = this.onreloadPath;
    } else {
      linkToDirect = "/account";
    }

    customHistory.push(linkToDirect);
  };

  setShowFooter = (value: boolean) => (this.showFooter = value);

  goBack = () => customHistory.back();
}

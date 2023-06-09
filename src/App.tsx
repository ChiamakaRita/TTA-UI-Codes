import "./App.css";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useStore } from "./api/main/appStore";
import ErrorDisplay from "./components/shared/error-display/ErrorDisplay";
import HamburgerMenu from "./components/shared/hamburger-menu/HamburgerMenu";
import LoadingComponent from "./components/shared/loading-spinner/LoadingComponent";
import MyModal from "./components/shared/modal/MyModal";
import NotFound from "./components/shared/not-found/NotFound";
import SuccessDisplay from "./components/shared/success-display/SuccessDisplay";
import LoginPage from "./pages/user-account/LoginPage";
import MyAccount from "./pages/user-account/MyAccount";
import TruckRequestAdmin from "./pages/admin/TruckRequestAdmin";
import AdminOverview from "./pages/admin/AdminOverview";
import HomePage from "./pages/home/HomePage";
import Footer from "./components/shared/footer/Footer";
import AboutPage from "./pages/about/AboutPage";
import Dashboard from "./pages/dashboard/Dashboard";
import PriceWatch from "./pages/dashboard/PriceWatch";
import RouteWatch from "./pages/dashboard/RouteWatch";
import TruckInvestmentAdmin from "./pages/admin/TruckInvestmentAdmin";
import BecomeInvestor from "./pages/dashboard/BecomeInvestor";
import CreateNewAsset from "./components/admin/truck-investment/investor-assets/CreateNewAsset";
import ClientPrices from "./components/admin/truck-investment/clients/ClientPrices";
import TruckInvestmentAccount from "./pages/dashboard/TruckInvestmentAccount";
import MarketOutlookAdmin from "./pages/admin/MarketOutlookAdmin";
import MarketNewsArticlePage from "./pages/market-outlook/MarketNewsArticlePage";
import RegisterPage from "./pages/user-account/RegisterPage";
import ForgotPasswordPage from "./pages/user-account/ForgotPasswordPage";
import PasswordResetPage from "./pages/user-account/PasswordResetPage";
import TruckRequestPortal from "./pages/dashboard/TruckRequestPortal";
import TruckProvider from "./pages/dashboard/TruckProvider";
import PricewatchAdmin from "./pages/admin/PricewatchAdmin";
import TruckRequestPortalForCarriers from "./pages/dashboard/TruckRequestPortalForCarriers";
import TruckUpdateTimeline from "./components/truck-request-portal/transit-trucks/TruckUpdateTimeline";
import SituationRoom from "./components/route-watch/situation-room/SituationRoom";
import Questions from "./pages/questions/FAQ";
import TruckInspectionAndUptime from "./pages/services/TruckInspectionAndUptime";
import TruckRepairAndMaintenance from "./pages/services/TruckRepairAndMaintenance";
import TyreManagement from "./pages/services/TyreManagement";

export default observer(function App() {
  const { commonStore, userAccountStore } = useStore();

  useEffect(() => {
    if (commonStore.token && commonStore.id) {
      userAccountStore.myAccount(commonStore.id);
    }
    window.addEventListener("unload", () =>
      commonStore.setOnreloadPath(window.location.pathname)
    );
  }, [commonStore.id, commonStore.token, userAccountStore, commonStore]);

  return (
    <>
      <LoadingComponent active={commonStore.loading} />
      <HamburgerMenu visible={commonStore.drawerVisible} />
      <MyModal visible={commonStore.modalVisible} />

      <div className="page-container">
        <ToastContainer position="top-right" autoClose={3000} />
        <ErrorDisplay visible={commonStore.isThereError} />
        <SuccessDisplay visible={commonStore.isThereSuccess} />

        <div className="content-wrap min-vh-100">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="about-us" element={<AboutPage />} />
            <Route path="questions" element={<Questions />} />
            <Route
              path="truckinspection"
              element={<TruckInspectionAndUptime />}
            />
            <Route path="truckrepair" element={<TruckRepairAndMaintenance />} />
            <Route path="tyremgt" element={<TyreManagement />} />
            <Route
              path="/market-outlook/:id"
              element={<MarketNewsArticlePage />}
            />

            <Route path="account">
              <Route index element={<MyAccount />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route
                path="reset-password/:token"
                element={<PasswordResetPage />}
              />
            </Route>

            <Route path="dashboard">
              <Route index element={<Dashboard />} />
              <Route path="price-watch-analytics" element={<PriceWatch />} />

              <Route path="route-watch-analytics">
                <Route index element={<RouteWatch />} />
                <Route path="shipment-tracking" element={<SituationRoom />} />
                <Route path="truck-request-portal">
                  <Route index element={<TruckRequestPortal />} />
                  <Route
                    path="truck-update-timelines"
                    element={<TruckUpdateTimeline />}
                  />
                </Route>
                <Route
                  path="transporter-truck-manager"
                  element={<TruckRequestPortalForCarriers />}
                />
              </Route>

              <Route path="truck-provider" element={<TruckProvider />} />

              <Route path="investor-application" element={<BecomeInvestor />} />

              <Route
                path="truck-investment"
                element={<TruckInvestmentAccount />}
              />
            </Route>

            <Route path="admin">
              <Route index element={<AdminOverview />} />
              <Route path="truck-request" element={<TruckRequestAdmin />} />
              <Route path="market-outlook" element={<MarketOutlookAdmin />} />
              <Route path="pricewatch" element={<PricewatchAdmin />} />
              <Route path="truck-investment">
                <Route index element={<TruckInvestmentAdmin />} />
                <Route
                  path="create-new-asset/:id"
                  element={<CreateNewAsset />}
                />
                <Route path="client-price/:id" element={<ClientPrices />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {commonStore.showFooter ? <Footer /> : null}
      </div>
    </>
  );
});

import "./App.css";
import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Footer from "./components/shared/footer/Footer";
import AboutPage from "./pages/about/AboutPage";
import Questions from "./pages/questions/FAQ";
import TruckInspectionAndUptime from "./pages/services/TruckInspectionAndUptime";
import TruckRepairAndMaintenance from "./pages/services/TruckRepairAndMaintenance";
import TyreManagement from "./pages/services/TyreManagement";

export default observer(function App() {

  return (
    <>
      <div className="page-container">
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
          </Routes>
        </div>
       <Footer />
      </div>
    </>
  );
});

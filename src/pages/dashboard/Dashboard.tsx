import DashboardContent from "../../components/dashboard/DashboardContent";
import Header from "../../components/shared/header/Header";
import "../../components/dashboard/DashboardContent.css";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import { customHistory } from "../..";
import { observer } from "mobx-react-lite";

export default observer(function Dashboard() {
  const { userAccountStore } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!userAccountStore.user) customHistory.push("/account/login");
  }, [userAccountStore.user]);

  return (
    <>
      <Header />

      <div className="dashboard-content-box">
        <DashboardContent />
      </div>
    </>
  );
});

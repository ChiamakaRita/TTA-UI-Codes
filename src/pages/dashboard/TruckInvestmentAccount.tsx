import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { useStore } from "../../api/main/appStore";
import Header from "../../components/shared/header/Header";
import CustomVerticalTab from "../../components/shared/vertical-tab/CustomVerticalTab";
import AssetTracking from "../../components/truck-investor-account/AssetTracking";
import MyDebts from "../../components/truck-investor-account/MyDebts";
import MyFleet from "../../components/truck-investor-account/MyFleet";
import MyProfile from "../../components/truck-investor-account/MyProfile";
import Revenue from "../../components/truck-investor-account/Revenue";
import TruckActivities from "../../components/truck-investor-account/TruckActivities";

export default observer(function TruckInvestmentAccount() {
  const { revenueStore } = useStore();

  useEffect(() => {
    revenueStore.getRelevantRevenueData();
    revenueStore.getAvailableMonths();
    revenueStore.getAvailableYears();
  }, [revenueStore]);

  return (
    <>
      <Header />
      <CustomVerticalTab
        tabs={[
          { icon: <Icon name="money" />, text: "Revenue" },
          { icon: <Icon name="truck" />, text: "My Fleet" },
          { icon: <Icon name="eye" />, text: "Fleet Tracking" },
          { icon: <Icon name="book" />, text: "Transaction Records" },
          { icon: <Icon name="sticky note" />, text: "My Debts" },
          {
            icon: <Icon name="address card outline" />,
            text: "Profile",
          },
        ]}
        panels={[
          <Revenue
            monthlyRevenueData={revenueStore.confirmedRevenueForTheMonth}
            annualRevenueHistory={revenueStore.annualRevenueList}
          />,
          <MyFleet />,
          <AssetTracking />,
          <TruckActivities
            availableMonths={revenueStore.availableMonths}
            availableYears={revenueStore.availableYears}
          />,
          <MyDebts />,
          <MyProfile />,
        ]}
      />
    </>
  );
});

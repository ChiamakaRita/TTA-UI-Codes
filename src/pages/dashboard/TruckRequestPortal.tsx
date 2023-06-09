import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";
import Header from "../../components/shared/header/Header";
import CustomVerticalTab from "../../components/shared/vertical-tab/CustomVerticalTab";
import AvailableTrucks from "../../components/truck-request-portal/available-trucks/AvailableTrucks";
import LoadingTrucks from "../../components/truck-request-portal/loading-trucks/LoadingTrucks";
import TruckPortalBackground from "../../components/truck-request-portal/portal-bg/TruckPortalBackground";
import TransitTrucks from "../../components/truck-request-portal/transit-trucks/TransitTrucks";

export default observer(function TruckRequestPortal() {
  return (
    <>
      <Header />

      <TruckPortalBackground>
        <CustomVerticalTab
          transparentRightBg={true}
          tabs={[
            { icon: <Icon name="shipping fast" />, text: "In Transit" },
            { icon: <Icon name="truck" />, text: "Available  trucks" },
            { icon: <Icon name="spinner" />, text: "Loading trucks " },
            // { icon: <Icon name="folder open outline" />, text: "Records" },
          ]}
          panels={[
            <TransitTrucks />,
            <AvailableTrucks />,
            <LoadingTrucks />,
            // <></>,
          ]}
        />
      </TruckPortalBackground>
    </>
  );
});

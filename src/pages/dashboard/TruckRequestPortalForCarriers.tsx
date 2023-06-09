import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";
import Header from "../../components/shared/header/Header";
import CustomVerticalTab from "../../components/shared/vertical-tab/CustomVerticalTab";
import TruckPortalBackground from "../../components/truck-request-portal/portal-bg/TruckPortalBackground";
import TransitTrucksForCarriers from "../../components/truck-request-portal/transit-trucks/TransitTrucksForCarriers";

export default observer(function TruckRequestPortalForCarriers() {
  return (
    <>
      <Header />

      <TruckPortalBackground>
        <CustomVerticalTab
          transparentRightBg={true}
          tabs={[{ icon: <Icon name="shipping fast" />, text: "In Transit" }]}
          panels={[<TransitTrucksForCarriers />]}
        />
      </TruckPortalBackground>
    </>
  );
});

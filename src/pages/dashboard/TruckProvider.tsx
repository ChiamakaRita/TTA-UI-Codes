import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { useStore } from "../../api/main/appStore";
import Header from "../../components/shared/header/Header";
import CustomVerticalTab from "../../components/shared/vertical-tab/CustomVerticalTab";
import TruckPortalBackground from "../../components/truck-request-portal/portal-bg/TruckPortalBackground";
import ProvideTruck from "../../components/truck-request-portal/provide-truck/ProvideTruck";

export default observer(function TruckProvider() {
  const { truckPortalStore, placeStore, organisationStore, userAccountStore } =
    useStore();

  useEffect(() => {
    if (userAccountStore.user) {
      (async function getData() {
        await truckPortalStore.getTruckPortalDropdownData();
      })();
    }
  }, [truckPortalStore, userAccountStore.user]);

  return (
    <>
      <Header />

      <TruckPortalBackground>
        <CustomVerticalTab
          transparentRightBg={true}
          tabs={[{ icon: <Icon name="book" />, text: "Truck Registry" }]}
          panels={[
            <ProvideTruck
              shippers={organisationStore.allShippersList}
              places={placeStore.places}
              transporters={organisationStore.allCarriers}
              organisation={organisationStore.org}
              isShipper={organisationStore.isShipper}
            />,
          ]}
        />
      </TruckPortalBackground>
    </>
  );
});

import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import CustomDefaultTabHeading from "../../shared/headings/CustomDefaultTabHeading";
import BasicHorizontalTab from "../../shared/horizontal-tab/BasicHorizontalTab";
import ActiveShipment from "./ActiveShipments";
import CreateShipment from "./CreateShipment";
import ShipmentHistory from "./ShipmentHistory";

export default observer(function Shipments() {
  const { routeStore, shipperStore, driverStore, userAccountStore } =
    useStore();

  useEffect(() => {
    (async function getData() {
      await routeStore.getAllRoutes();
      await shipperStore.getAllShippers();
      if (userAccountStore.isAdmin && userAccountStore.isInHouse) {
        await driverStore.getDriverWithFleet();
      }
    })();
  }, [routeStore, shipperStore, userAccountStore, driverStore]);

  return (
    <>
      <CustomDefaultTabHeading content="Shipments Management" />
      <BasicHorizontalTab
        tabs={[
          {
            text: "New Shipment",
            icon: <Icon name="pencil" />,
          },
          {
            text: "Control Switch",
            icon: <Icon name="power off" />,
          },
          {
            text: "Shipment History",
            icon: <Icon name="book" />,
          },
        ]}
        panels={[
          <CreateShipment
            routes={routeStore.allRoutes}
            shippers={shipperStore.allShippers}
            driversWithTruck={driverStore.driverAndTruckList}
          />,
          <ActiveShipment routes={routeStore.allRoutes} />,
          <ShipmentHistory />,
        ]}
      />
    </>
  );
});

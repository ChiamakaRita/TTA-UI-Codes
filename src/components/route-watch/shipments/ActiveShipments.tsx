import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../api/main/appStore";
import { RouteList } from "../../../api/models/route-watch/routes";
import { ShipmentData } from "../../../api/models/route-watch/shipments";
import { ActiveShipmentListBuilder } from "../../../helper-functions/routeWatchFunctions";
import CustomSwitch from "../../shared/switch/CustomSwitch";

interface Props {
  routes: RouteList[];
}

export default observer(function ActiveShipment({ routes }: Props) {
  const { shipmentStore } = useStore();

  useEffect(() => {
    (async function getData() {
      await shipmentStore.getActiveShipments();
    })();
  }, [shipmentStore]);

  const handleOffloadToggle = async (
    status: boolean,
    shipment: ShipmentData
  ) => {
    await shipmentStore.offloadShipment(status, shipment);
  };

  return (
    <div className="p-3 mt-3">
      <h4 className="text-secondary">Active Shipments</h4>

      {shipmentStore.activeLoads.length &&
        ActiveShipmentListBuilder(routes, shipmentStore.activeLoads).map(
          (el, i) => {
            return (
              <div className="p-3 mt-2 shadow-card" key={i}>
                <h5>
                  <span className="active-shipment-key">Truck Number : </span>
                  <span className="active-shipment-value">
                    {el.truckNumber}
                  </span>
                </h5>
                <h5>
                  <span className="active-shipment-key">Route</span> :{" "}
                  <span className="active-shipment-value">
                    {el.origin + " to " + el.destination}
                  </span>
                </h5>
                <h5>
                  <span className="active-shipment-key">Recipient Name :</span>{" "}
                  <span className="active-shipment-value">{el.recipient}</span>
                </h5>

                <hr />
                <p className="font-weight-bold">Load Status</p>
                <em className="d-block toggle-warning">
                  Please only toggle OFF if load have reached its destination
                  and completely offloaded
                </em>
                <CustomSwitch
                  active={el.active}
                  callbackFn={(status) =>
                    handleOffloadToggle(status, shipmentStore.activeLoads[i])
                  }
                />
              </div>
            );
          }
        )}
    </div>
  );
});

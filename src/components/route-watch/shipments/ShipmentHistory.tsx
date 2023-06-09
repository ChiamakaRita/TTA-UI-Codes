import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../api/main/appStore";
import { DateOnlyFormat } from "../../../helper-functions/sharedFunctions";
import SimpleTable from "../../shared/table/SimpleTable";

export default observer(function ShipmentHistory() {
  const { shipmentStore } = useStore();

  useEffect(() => {
    (async function getData() {
      await shipmentStore.getOffloadedShipments();
    })();
  }, [shipmentStore]);

  return (
    <div className="shadow-card p-3 mt-3">
      <h4 className="text-secondary">Shipment History</h4>

      <SimpleTable
        titles={[
          "Truck No.",
          "Recipient Name",
          "Tracking No.",
          "date offloaded",
        ]}
        data={shipmentStore.offloadedLoads}
        tableBodyBuilder={(el) => (
          <tr key={el.id}>
            <td>{el.truckNumber}</td>
            <td>{el.recipientName}</td>
            <td>{el.trackingNumber}</td>
            <td>{DateOnlyFormat(el.deliveryDate)}</td>
          </tr>
        )}
      />
    </div>
  );
});

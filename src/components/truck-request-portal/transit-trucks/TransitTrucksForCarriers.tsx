import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import { DateOnlyFormat } from "../../../helper-functions/sharedFunctions";
import SimpleTable from "../../shared/table/SimpleTable";
import DeliverLoad from "./DeliverLoad";
import SendUpdate from "./SendUpdate";

export default observer(function TransitTrucksForCarriers() {
  const { commonStore, truckPortalStore, userAccountStore } = useStore();

  useEffect(() => {
    (async function getData() {
      const orgId = userAccountStore.user?.organisationId;

      if (orgId) {
        await truckPortalStore.getCarriersTransitTrucks(orgId);
      }
    })();
  }, [truckPortalStore, userAccountStore.user?.organisationId]);

  const resultLength = truckPortalStore.carrierTrucks.length;

  return (
    <>
      <h3 className="available-trucks-title">Your trucks in transit</h3>
      <p className="available-trucks-des">
        These trucks are enroute their destinations.
      </p>

      <div className="available-trucks-table">
        <p>
          <Icon name="dot circle" color="green" /> In Transit : {resultLength}{" "}
          {resultLength === 1 ? "truck" : "trucks"}
        </p>
        <SimpleTable
          titles={["truck no.", "destination", "Date Loaded", ""]}
          data={truckPortalStore.carrierTrucks}
          tableBodyBuilder={(el) => (
            <tr key={el.truckNumber}>
              <td>{el.truckNumber}</td>
              <td>{el.destination}</td>
              <td>{DateOnlyFormat(el.dateModified)}</td>
              <td>
                <Button
                  color="blue"
                  size="tiny"
                  content="Send Truck Update"
                  onClick={() =>
                    commonStore.setModalContent(<SendUpdate data={el} />)
                  }
                />

                <Button
                  size="tiny"
                  content="Delivered"
                  color="vk"
                  onClick={() =>
                    commonStore.setModalContent(<DeliverLoad data={el} />)
                  }
                />
              </td>
            </tr>
          )}
        />
      </div>
    </>
  );
});

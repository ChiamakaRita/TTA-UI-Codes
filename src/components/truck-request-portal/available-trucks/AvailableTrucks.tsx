import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import { DateOnlyFormat } from "../../../helper-functions/sharedFunctions";
import SimpleTable from "../../shared/table/SimpleTable";
import "./AvailableTrucks.css";
import RequestToLoad from "./RequestToLoad";

export default observer(function AvailableTrucks() {
  const { commonStore, truckPortalStore, userAccountStore } = useStore();

  useEffect(() => {
    (async function getData() {
      const orgId = userAccountStore.user?.organisationId;

      if (orgId) {
        await truckPortalStore.getShippersAvailableTrucks(orgId!);
      }
    })();
  }, [truckPortalStore, userAccountStore.user?.organisationId]);

  const resultLength = truckPortalStore.availableTrucks.length;

  return (
    <>
      <h3 className="available-trucks-title">Available trucks for you</h3>
      <p className="available-trucks-des">
        These trucks are available for you and the drivers are waiting for your
        request.
      </p>

      <div className="available-trucks-table">
        <p>
          <Icon name="dot circle" color="green" /> Available : {resultLength}{" "}
          {resultLength === 1 ? "truck" : "trucks"}
        </p>
        <SimpleTable
          titles={[
            "transporter",
            "truck no.",
            "destination",
            "size",
            "Driver",
            "Date Logged",
            "",
          ]}
          data={truckPortalStore.availableTrucks}
          tableBodyBuilder={(el) => (
            <tr key={el.truckNumber}>
              <td>{el.transporterName}</td>
              <td>{el.truckNumber}</td>
              <td>{el.destination}</td>
              <td>{el.truckSize} tons</td>
              <td>{el.driverName} </td>
              <td>{DateOnlyFormat(el.dateModified)}</td>
              <td>
                <Button
                  className="available-trucks-btn"
                  content="Request to Load"
                  onClick={() =>
                    commonStore.setModalContent(<RequestToLoad data={el} />)
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

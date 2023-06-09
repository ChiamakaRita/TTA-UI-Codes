import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import { DateOnlyFormat } from "../../../helper-functions/sharedFunctions";
import SimpleTable from "../../shared/table/SimpleTable";
import CancelLoading from "./CancelLoading";
import CompleteLoading from "./CompleteLoading";

export default observer(function LoadingTrucks() {
  const { commonStore, truckPortalStore, userAccountStore } = useStore();

  useEffect(() => {
    (async function getData() {
      const orgId = userAccountStore.user?.organisationId;

      if (orgId) {
        await truckPortalStore.getShippersLoadingTrucks(orgId!);
      }
    })();
  }, [truckPortalStore, userAccountStore.user?.organisationId]);

  const resultLength = truckPortalStore.loadingTrucks.length;

  return (
    <>
      <h3 className="available-trucks-title">loading trucks</h3>
      <p className="available-trucks-des">
        These trucks are currently loading for you
      </p>

      <div className="available-trucks-table">
        <p>
          <Icon name="dot circle" color="green" /> Currently Loading :{" "}
          {resultLength} {resultLength === 1 ? "truck" : "trucks"}
        </p>
        <SimpleTable
          titles={[
            "transporter",
            "truck no.",
            "destination",
            "size",
            "Driver",
            "Date of Request",
            "",
          ]}
          data={truckPortalStore.loadingTrucks}
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
                  content="Complete"
                  onClick={() =>
                    commonStore.setModalContent(<CompleteLoading data={el} />)
                  }
                />
                <Button
                  className="available-trucks-danger"
                  content="Cancel"
                  onClick={() =>
                    commonStore.setModalContent(<CancelLoading data={el} />)
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

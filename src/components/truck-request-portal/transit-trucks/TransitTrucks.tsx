import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import { DateOnlyFormat } from "../../../helper-functions/sharedFunctions";
import CustomAccordion from "../../shared/custom-accordion/CustomAccordion";
import SimpleTable from "../../shared/table/SimpleTable";
import TruckUpdateList from "./TruckUpdateList";

export default observer(function TransitTrucks() {
  const { truckPortalStore, userAccountStore } = useStore();

  useEffect(() => {
    (async function getData() {
      const orgId = userAccountStore.user?.organisationId;

      if (orgId) {
        await truckPortalStore.getShippersTransitTrucks(orgId!);
      }
    })();
  }, [truckPortalStore, userAccountStore.user?.organisationId]);

  const resultLength = truckPortalStore.transitTrucks.length;

  return (
    <>
      <h3 className="available-trucks-title">trucks in transit</h3>
      <p className="available-trucks-des">
        These trucks are enroute their destinations.
      </p>

      <div className="available-trucks-table">
        <CustomAccordion
          open={true}
          title={
            <p>
              <Icon name="dot circle" color="green" /> In Transit :{" "}
              {resultLength} {resultLength === 1 ? "truck" : "trucks"}
            </p>
          }
          content={
            <>
              <SimpleTable
                titles={[
                  "transporter",
                  "truck no.",
                  "destination",
                  "Date Loaded",
                ]}
                data={truckPortalStore.transitTrucks}
                tableBodyBuilder={(el) => (
                  <tr key={el.truckNumber}>
                    <td>{el.transporterName}</td>
                    <td>{el.truckNumber}</td>
                    <td>{el.destination}</td>
                    <td>{DateOnlyFormat(el.dateModified)}</td>
                  </tr>
                )}
              />
            </>
          }
        />
      </div>
      {truckPortalStore.truckUpdates.length ? (
        <div className="mt-4 bg-white">
          <CustomAccordion
            open={true}
            title="Locations Update"
            content={<TruckUpdateList data={truckPortalStore.truckUpdates} />}
          />
        </div>
      ) : null}
    </>
  );
});

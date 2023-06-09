import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import { DateOnlyFormat } from "../../../../helper-functions/sharedFunctions";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import NoResult from "../../../shared/no-result/NoResult";
import SimpleTable from "../../../shared/table/SimpleTable";
import ReturnTripForm from "./ReturnTripForm";

export default observer(function MakeReturnTrip() {
  const { revenueStore, commonStore } = useStore();

  useEffect(() => {
    (async function getData() {
      await revenueStore.getOutboundTripsRevenue();
    })();
  }, [revenueStore]);

  return (
    <>
      <CustomDefaultTabHeading content="Return Trips Manager" />

      {revenueStore.outboundTripsRevenue.length !== 0 ? (
        <div className="shadow-card p-3">
          <SimpleTable
            titles={["Truck No.", "Date Created", "Route", ""]}
            data={revenueStore.outboundTripsRevenue}
            tableBodyBuilder={(el) => (
              <tr key={el.id}>
                <td>{el.truckNumber}</td>
                <td>{DateOnlyFormat(el.dateAdded)}</td>
                <td>{el.route}</td>
                <td>
                  <Button
                    content="Add Return Trip"
                    size="tiny"
                    color="vk"
                    icon="repeat"
                    onClick={() =>
                      commonStore.setModalContent(
                        <ReturnTripForm revenueData={el} />
                      )
                    }
                  />
                </td>
              </tr>
            )}
          />
        </div>
      ) : (
        <NoResult content="No Available Outbound Trips" />
      )}
    </>
  );
});

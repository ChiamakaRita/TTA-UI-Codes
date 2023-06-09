import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import { DateOnlyFormat } from "../../helper-functions/sharedFunctions";
import { FleetStatusDecider } from "../../helper-functions/truckInvestmentFunction";
import CustomDefaultTabHeading from "../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../shared/table/SimpleTable";

export default observer(function MyFleet() {
  const { assetStore, investorStore } = useStore();

  useEffect(() => {
    if (assetStore.investorFleet.length === 0) {
      (async function getData() {
        await assetStore.getAnInvestorFleet(+investorStore.investorId!);
      })();
    }
  }, [assetStore, investorStore.investorId]);

  return (
    <>
      <CustomDefaultTabHeading content="My Fleet" />

      <div className="shadow-card p-3 mt-3">
        <SimpleTable
          titles={[
            "Truck No.",
            "Truck Size",
            "Insurance Type",
            "Insurance Exp.",
            "Status",
            "Name of Driver",
            "Next Maintenance",
          ]}
          data={assetStore.investorFleet}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>{el.truckNumber}</td>
              <td>{el.truckSize} tons</td>
              <td>{el.insuranceType}</td>
              <td>{DateOnlyFormat(el.insuranceExpiryDate)}</td>
              <td>{FleetStatusDecider(el.isInTransit, el.isInMaintenance)}</td>
              <td>{el.driverName}</td>
              <td>{DateOnlyFormat(el.nextMaintenanceDate)}</td>
            </tr>
          )}
        />
      </div>
    </>
  );
});

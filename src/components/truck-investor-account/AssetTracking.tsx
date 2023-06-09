import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import { DateOnlyFormat } from "../../helper-functions/sharedFunctions";
import CustomDefaultTabHeading from "../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../shared/table/SimpleTable";

export default observer(function AssetTracking() {
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
      <CustomDefaultTabHeading content="Asset Tracking" />

      <div className="shadow-card p-3 mt-3">
        <SimpleTable
          titles={[
            "Truck No.",
            "Truck Size",
            "Driver",
            "Goods Loaded",
            "Origin",
            "Destination",
            "Journey Started",
          ]}
          data={assetStore.investorFleet.filter(
            (e) => e.currentRoute !== "n/a"
          )}
          tableBodyBuilder={(el) => {
            const [origin, destination] = el.currentRoute.split(" to ");

            return (
              <tr key={el.id}>
                <td>{el.truckNumber}</td>
                <td>{el.truckSize} tons</td>
                <td>{el.driverName}</td>
                <td>{el.goodsLoaded}</td>
                <td>{origin}</td>
                <td>{destination}</td>
                <td>{DateOnlyFormat(el.dateModified)}</td>
              </tr>
            );
          }}
        />
      </div>
    </>
  );
});

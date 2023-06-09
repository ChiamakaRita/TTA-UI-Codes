import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../../api/main/appStore";
import { DateOnlyFormat } from "../../../../helper-functions/sharedFunctions";
import CustomAccordion from "../../../shared/custom-accordion/CustomAccordion";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import IndependentVariables from "./IndependentVariables";
import TruckVariables from "./TruckVariables";

export default observer(function AnalyticsVariable() {
  const { pricewatchStore } = useStore();

  useEffect(() => {
    (async function getData() {
      await pricewatchStore.getPricewatchVariables();
      await pricewatchStore.getTruckSizes();
    })();
  }, [pricewatchStore]);

  if (!pricewatchStore.independentVariables) return <></>;

  return (
    <>
      <CustomDefaultTabHeading content="Analysis Variables" />

      <div className="p-3">
        <CustomAccordion
          title={`Independent Variables ▸▸ modified : ${DateOnlyFormat(
            pricewatchStore.independentVariables.dateAdded
          )}`}
          content={
            <IndependentVariables data={pricewatchStore.independentVariables} />
          }
          open={true}
        />

        <CustomAccordion
          title="Truck Variables"
          content={<TruckVariables truckSizes={pricewatchStore.truckSizes} />}
        />
      </div>
    </>
  );
});

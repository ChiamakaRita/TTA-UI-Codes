import _ from "lodash";
import { observer } from "mobx-react-lite";
import { Divider } from "semantic-ui-react";
import { AnnualRevenueHistoryData } from "../../api/models/truck-investment/revenue";
import { NairaFormatter } from "../../helper-functions/sharedFunctions";

interface Props {
  currentTargetData: AnnualRevenueHistoryData;
}

const CURRENT_YEAR = new Date().getFullYear();

export default observer(function RevenueDetail({ currentTargetData }: Props) {
  return (
    <div>
      <h5 className="mb-0">
        {currentTargetData.monthName}, {CURRENT_YEAR}
      </h5>
      <Divider className="mt-0" />

      <div className="revenue-monthly">
        <div>Number of trips</div>
        <div>{currentTargetData.tripCount}</div>
      </div>
      <br />
      <div className="revenue-monthly">
        <div>Cost of diesel </div>
        <div>{NairaFormatter(currentTargetData.dieselCost)}</div>
      </div>
      <br />
      <div className="revenue-monthly">
        <div>Driver's Wage </div>
        <div>{NairaFormatter(currentTargetData.driverWage)}</div>
      </div>
      <br />
      <div className="revenue-monthly">
        <div>Management Fee </div>
        <div>{NairaFormatter(currentTargetData.managementCost)}</div>
      </div>
      <br />
      <div className="revenue-monthly">
        <div>Miscellaneous Cost </div>
        <div>{NairaFormatter(currentTargetData.miscellaneous)}</div>
      </div>
      <br />
      <div className="revenue-monthly">
        <div>Total Revenue</div>
        <div>{NairaFormatter(currentTargetData.income)}</div>
      </div>
      <Divider />
      <div className="revenue-monthly">
        <div>Profit</div>
        <div>
          {NairaFormatter(
            currentTargetData.income -
              _.sum([
                currentTargetData.dieselCost,
                currentTargetData.driverWage,
                currentTargetData.miscellaneous,
                currentTargetData.managementCost,
              ])
          )}
        </div>
      </div>
    </div>
  );
});

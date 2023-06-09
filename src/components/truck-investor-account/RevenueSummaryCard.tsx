import _ from "lodash";
import { observer } from "mobx-react-lite";
import { Divider } from "semantic-ui-react";
import { RevenueData } from "../../api/models/truck-investment/revenue";
import {
  DateTimeFormat,
  NairaFormatter,
} from "../../helper-functions/sharedFunctions";
import { RevenueAggregator } from "../../helper-functions/truckInvestmentFunction";

interface Props {
  monthlyRevenueData: RevenueData[];
}

export default observer(function RevenueSummaryCard({
  monthlyRevenueData,
}: Props) {
  const revenueSummary = RevenueAggregator(monthlyRevenueData);
  const grossProfit =
    revenueSummary.tripPrice -
    _.sum([
      revenueSummary.diesel,
      revenueSummary.driverWage,
      revenueSummary.managementCost,
      revenueSummary.miscellaneous,
    ]);

  return (
    <>
      <span className="text-secondary text-center d-block">
        As at {DateTimeFormat()}{" "}
      </span>
      <Divider className="mt-0" />
      <div className="d-flex justify-content-between px-2">
        <div>Income</div>
        <div>{NairaFormatter(revenueSummary.tripPrice)}</div>
      </div>
      <br />
      <div className="d-flex justify-content-between px-2">
        <div>Expenditure</div>
        <div>
          {NairaFormatter(
            _.sum([
              revenueSummary.diesel,
              revenueSummary.driverWage,
              revenueSummary.managementCost,
              revenueSummary.miscellaneous,
            ])
          )}
        </div>
      </div>
      <Divider />
      <div className="d-flex justify-content-between px-2">
        <div>Balance</div>
        <div>{NairaFormatter(grossProfit)}</div>
      </div>
    </>
  );
});

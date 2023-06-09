import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { useStore } from "../../api/main/appStore";
import { AnnualRevenueHistoryData } from "../../api/models/truck-investment/revenue";
import { NairaFormatter } from "../../helper-functions/sharedFunctions";
import SimpleTable from "../shared/table/SimpleTable";
import RevenueDetail from "./RevenueDetail";

interface Props {
  annualRevenueHistory: AnnualRevenueHistoryData[];
}

const CURRENT_YEAR = new Date().getFullYear();

export default observer(function RevenueHistory({
  annualRevenueHistory,
}: Props) {
  const { commonStore } = useStore();

  return (
    <div className="p-3 col-12 mt-3 shadow-card">
      <div className="available-balance-container">
        <h4>Revenue History</h4>

        <div>
          {/* <Button
            size="tiny"
            content="Account Statement"
            icon="book"
            onClick={() =>
              commonStore.setModalContent(
                <LaunchingSoon
                  name="Account Statement"
                  detail="Printing out a PDF Account Statement within any selected time interval."
                />
              )
            }
          /> */}
        </div>
      </div>

      <SimpleTable
        titles={["Period", "Income", ""]}
        data={annualRevenueHistory}
        tableBodyBuilder={(el) => (
          <tr key={el.monthName}>
            <td>
              {el.monthName}, {CURRENT_YEAR}
            </td>
            <td>{NairaFormatter(el.income)}</td>
            <td>
              <Button
                size="tiny"
                content="View details"
                onClick={() =>
                  commonStore.setModalContent(
                    <RevenueDetail currentTargetData={el} />
                  )
                }
              />
            </td>
          </tr>
        )}
      />
    </div>
  );
});

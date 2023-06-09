import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import {
  AvailableMonths,
  RevenueAndWithdraws,
} from "../../../../api/models/truck-investment/revenue";
import { NairaFormatter } from "../../../../helper-functions/sharedFunctions";
import BasicHorizontalTab from "../../../shared/horizontal-tab/BasicHorizontalTab";
import RevenueRecord from "./RevenueRecord";
import WithdrawalRecord from "./WithdrawalRecord";

interface Props {
  months: AvailableMonths[];
  years: number[];
}

export default observer(function RevenueAndWithdrawals({
  months,
  years,
}: Props) {
  const { revenueStore, investorStore } = useStore();
  const [revenuesAndWithdraws, setRevenuesAndWithdraws] =
    useState<RevenueAndWithdraws | null>(null);

  useEffect(() => {
    (async function getData() {
      if (investorStore.selectedInvestor) {
        const res = await revenueStore.getRevenueAndWithdraw(
          investorStore.selectedInvestor.id
        );
        setRevenuesAndWithdraws(res);
      }
    })();
  }, [revenueStore, investorStore.selectedInvestor]);

  if (!revenuesAndWithdraws) return <></>;

  return (
    <div className="shadow-card p-3 mt-4">
      <h2>
        Current Balance ={" "}
        {NairaFormatter(
          revenuesAndWithdraws.totalRevenue - revenuesAndWithdraws.totalWithdraw
        )}
      </h2>
      <div className="d-flex gap-2 mb-2">
        <span>
          Total Revenue ={" "}
          <span className="text-success">
            {NairaFormatter(revenuesAndWithdraws.totalRevenue)}
          </span>
        </span>
        <span>
          {" "}
          <Icon name="minus" />{" "}
        </span>
        <span>
          Total Withdrawals ={" "}
          <span className="text-danger">
            {NairaFormatter(revenuesAndWithdraws.totalWithdraw)}
          </span>
        </span>
      </div>
      <BasicHorizontalTab
        tabs={[
          {
            text: "Income",
            icon: <Icon name="list" />,
          },
          {
            text: "Withdrawals",
            icon: <Icon name="tablet" />,
          },
        ]}
        panels={[
          <RevenueRecord availableMonths={months} availableYears={years} />,
          <WithdrawalRecord availableMonths={months} availableYears={years} />,
        ]}
      />
    </div>
  );
});

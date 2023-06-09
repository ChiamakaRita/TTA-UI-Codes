import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import {
  AnnualRevenueHistoryData,
  RevenueData,
} from "../../api/models/truck-investment/revenue";
import CustomDefaultTabHeading from "../shared/headings/CustomDefaultTabHeading";
import PaymentRequestForm from "./PaymentRequestForm";
import RevenueHistory from "./RevenueHistory";
import RevenueSummaryCard from "./RevenueSummaryCard";
import "./TruckInvestmentAccount.css";

interface Props {
  monthlyRevenueData: RevenueData[];
  annualRevenueHistory: AnnualRevenueHistoryData[];
}

export default observer(function Revenue({
  monthlyRevenueData,
  annualRevenueHistory,
}: Props) {
  const { revenueStore, investorStore } = useStore();

  useEffect(() => {
    (async function getData() {
      await revenueStore.getWithdrawableAmount(+investorStore.investorId!);
    })();
  }, [revenueStore, investorStore]);

  return (
    <>
      <CustomDefaultTabHeading content="My Revenue" />

      <div className="row p-3 mt-3">
        <div className="col-md-4 p-3 shadow-card">
          <RevenueSummaryCard monthlyRevenueData={monthlyRevenueData} />
        </div>

        <div className="col-md-7 offset-md-1 p-3 mt-3 mt-md-0 shadow-card">
          <PaymentRequestForm
            withdrawableAmount={revenueStore.withdrawableAmount!}
          />
        </div>
      </div>

      <div className="row mt-3 p-3">
        <RevenueHistory annualRevenueHistory={annualRevenueHistory} />
      </div>
    </>
  );
});

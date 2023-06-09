import { useStore } from "../../api/main/appStore";
import { useEffect } from "react";
import CustomDefaultTabHeading from "../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../shared/table/SimpleTable";
import {
  DateOnlyFormat,
  NairaFormatter,
} from "../../helper-functions/sharedFunctions";
import NoResult from "../shared/no-result/NoResult";
import { observer } from "mobx-react-lite";

export default observer(function MyDebts() {
  const { investorDebtStore, investorStore } = useStore();

  useEffect(() => {
    if (investorDebtStore.investorDebts.length === 0) {
      (async function getData() {
        await investorDebtStore.getInvestorDebts(+investorStore.investorId!);
      })();
    }
  }, [investorDebtStore, investorStore.investorId]);

  return (
    <>
      <CustomDefaultTabHeading content="My Debts" />

      {investorDebtStore.investorDebts.length !== 0 ? (
        <div className="shadow mt-3 p-2">
          <SimpleTable
            titles={[
              "Description",
              "Truck",
              "Total Debt",
              "Paid",
              "Balance",
              "Date",
              "",
            ]}
            data={investorDebtStore.investorDebts}
            tableBodyBuilder={(el) => (
              <tr key={el.id}>
                <td>{el.description}</td>
                <td>{el.truckNumber}</td>
                <td>{NairaFormatter(el.total)}</td>
                <td>{NairaFormatter(el.paid)}</td>
                <td>{NairaFormatter(el.balance)}</td>
                <td>{DateOnlyFormat(el.dateAdded)}</td>
              </tr>
            )}
          />
        </div>
      ) : (
        <NoResult content="You currently have no debts" />
      )}
    </>
  );
});

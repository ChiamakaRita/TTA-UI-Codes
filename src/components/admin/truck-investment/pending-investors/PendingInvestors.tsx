import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../../api/main/appStore";
import { DateOnlyFormat } from "../../../../helper-functions/sharedFunctions";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import NoResult from "../../../shared/no-result/NoResult";
import SimpleTable from "../../../shared/table/SimpleTable";
import ApproveInvestor from "./ApproveInvestor";
import "./PendingInvestors.css";

export default observer(function PendingInvestors() {
  const { investorStore, commonStore } = useStore();

  useEffect(() => {
    (async function getData() {
      await investorStore.getPendingInvestors();
    })();
  }, [investorStore]);

  return (
    <>
      <CustomDefaultTabHeading content="Pending Investors" />

      {investorStore.pendingInvestors.length ? (
        <div className="shadow-card p-3">
          <SimpleTable
            titles={["Date Applied", "Full Name", ""]}
            data={investorStore.pendingInvestors}
            tableBodyBuilder={(el) => (
              <tr key={el.id}>
                <td>{DateOnlyFormat(el.dateAdded)}</td>
                <td>{`${el.firstName} ${el.lastName}`}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      commonStore.setModalContent(<ApproveInvestor data={el} />)
                    }
                  >
                    Review
                  </button>
                </td>
              </tr>
            )}
          />
        </div>
      ) : (
        <NoResult content="No Pending Investor Application" />
      )}
    </>
  );
});

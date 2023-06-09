import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../../api/main/appStore";
import { DateOnlyFormat } from "../../../../helper-functions/sharedFunctions";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../../../shared/table/SimpleTable";
import "./VerifiedInvestors.css";

export default observer(function VerifiedInvestors() {
  const { investorStore } = useStore();

  useEffect(() => {
    (async function getData() {
      await investorStore.getVerifiedInvestors();
    })();
  }, [investorStore]);

  return (
    <>
      <CustomDefaultTabHeading content="Verified Investors" />

      <div className="shadow-card p-3 mt-3">
        <SimpleTable
          titles={["Date Registered", "Full Name", "Unique Code"]}
          data={investorStore.verifiedInvestors}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>{DateOnlyFormat(el.dateOfApplication)}</td>
              <td>{`${el.firstName} ${el.lastName}`}</td>
              <td>{el.investorCode}</td>
            </tr>
          )}
        />
      </div>
    </>
  );
});

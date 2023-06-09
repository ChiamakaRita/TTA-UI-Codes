import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import { InvestorData } from "../../../../api/models/truck-investment/investor";
import {
  DateOnlyFormat,
  NairaFormatter,
} from "../../../../helper-functions/sharedFunctions";
import { CustomSelect } from "../../../shared/custom-input/CustomInputs";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import NoResult from "../../../shared/no-result/NoResult";
import SimpleTable from "../../../shared/table/SimpleTable";
import AddInvestorDebt from "./AddInvestorDebt";
import UpdateInvestorDebt from "./UpdateInvestorDebt";

export default observer(function InvestorDebts() {
  const [verifiedInvestors, setVerifiedInvestors] = useState<InvestorData[]>(
    []
  );
  const [selectedInvestor, setSelectedInvestor] = useState<
    InvestorData | undefined
  >(undefined);
  const { investorStore, investorDebtStore, commonStore } = useStore();
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    (async function getData() {
      await investorStore.getVerifiedInvestors();
      setVerifiedInvestors(investorStore.verifiedInvestors);
    })();
  }, [investorStore]);

  const handleSubmit = async (investorId: number) => {
    setSelectedInvestor(verifiedInvestors.find((e) => e.id === investorId));
    await investorDebtStore
      .getInvestorDebts(investorId)
      .finally(() => setIsSearched(true));
  };

  return (
    <>
      <CustomDefaultTabHeading content="Investor Debts" />

      <div className="shadow-card p-3">
        <Formik
          initialValues={{ investorId: "" }}
          onSubmit={(values) => handleSubmit(+values.investorId)}
        >
          {({ isSubmitting }) => (
            <Form>
              <CustomSelect
                label="Select investor"
                name="investorId"
                children={
                  <>
                    <option value={""}>Which investor?</option>

                    {verifiedInvestors.map((el) => (
                      <option
                        key={el.id}
                        value={el.id}
                      >{`${el.firstName} ${el.lastName}`}</option>
                    ))}
                  </>
                }
                required
              />
              <Button
                className="official-form-btn"
                content="Get Debts"
                type="submit"
                color="vk"
                loading={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>

      {isSearched &&
        selectedInvestor &&
        (investorDebtStore.investorDebts.length !== 0 ? (
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
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        commonStore.setModalContent(
                          <UpdateInvestorDebt data={el} />
                        )
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )}
            />

            <Button
              content="Add New Debt"
              color="vk"
              className=" official-form-btn"
              onClick={() =>
                commonStore.setModalContent(
                  <AddInvestorDebt investor={selectedInvestor} />
                )
              }
            />
          </div>
        ) : (
          <>
            <NoResult content="No Debt Record for this Investor" />
            <Button
              content="Add New Debt"
              color="vk"
              className=" official-form-btn"
              onClick={() =>
                commonStore.setModalContent(
                  <AddInvestorDebt investor={selectedInvestor} />
                )
              }
            />
          </>
        ))}
    </>
  );
});

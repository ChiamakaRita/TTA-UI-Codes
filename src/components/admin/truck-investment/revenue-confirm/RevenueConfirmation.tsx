import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import { InvestorData } from "../../../../api/models/truck-investment/investor";
import { CustomSelect } from "../../../shared/custom-input/CustomInputs";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../../../shared/table/SimpleTable";
import {
  DateOnlyFormat,
  NairaFormatter,
} from "../../../../helper-functions/sharedFunctions";
import NoResult from "../../../shared/no-result/NoResult";
import EditRevenue from "./EditRevenue";
import ModalDecisionContent from "../../../shared/modal/ModalDecisionContent";
import MiscellaneousExpense from "./MiscellaneousExpense";

export default observer(function RevenueConfirmation() {
  const { investorStore, commonStore, revenueStore } = useStore();
  const [isUnconfirmedRevenueSearched, setIsUnconfirmedRevenueSearched] =
    useState(false);
  const [verifiedInvestors, setVerifiedInvestore] = useState<InvestorData[]>(
    []
  );

  useEffect(() => {
    (async function getData() {
      await investorStore.getVerifiedInvestors();
      setVerifiedInvestore(investorStore.verifiedInvestors);
    })();
  }, [investorStore]);

  return (
    <>
      <CustomDefaultTabHeading content="Revenue Confirmation" />

      <div className="shadow-card p-3">
        <Formik
          initialValues={{ investorId: "" }}
          onSubmit={(values) =>
            revenueStore
              .getUnConfirmedRevenue(+values.investorId)
              .finally(() => setIsUnconfirmedRevenueSearched(true))
          }
        >
          {({ isSubmitting }) => (
            <Form>
              <CustomSelect
                label="Select investor"
                name="investorId"
                children={
                  <>
                    <option value={""}>Which investor's trip?</option>

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
                content="Get Uncompleted Trips"
                type="submit"
                color="vk"
                loading={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>

      {isUnconfirmedRevenueSearched && (
        <div className="shadow-card p-3 mt-3">
          {revenueStore.unconfirmedRevenue.length === 0 ? (
            <NoResult />
          ) : (
            <SimpleTable
              titles={["", "Truck Number", "Date Created", " "]}
              data={revenueStore.unconfirmedRevenue}
              tableBodyBuilder={(el) => (
                <tr key={el.id}>
                  <td>
                    {el.isReturnTrip ? (
                      <Icon name="repeat" color="green" />
                    ) : (
                      <Icon name="long arrow alternate left" color="orange" />
                    )}
                  </td>
                  <td>{el.truckNumber}</td>
                  <td>{DateOnlyFormat(el.dateAdded)}</td>
                  <td>
                    <Button
                      icon="pencil"
                      content="Edit Revenue"
                      primary
                      onClick={() =>
                        commonStore.setModalContent(
                          <EditRevenue revenueData={el} />
                        )
                      }
                      size="mini"
                    />
                    <Button
                      content={`Miscellaneous = ${NairaFormatter(
                        el.miscellaneous
                      )}`}
                      color="google plus"
                      onClick={() =>
                        commonStore.setModalContent(
                          <MiscellaneousExpense data={el} />
                        )
                      }
                      size="mini"
                    />
                    &nbsp;&nbsp;
                    <Button
                      content="Confirm"
                      size="mini"
                      icon="check"
                      className="bg-success text-white"
                      onClick={() =>
                        commonStore.setModalContent(
                          <ModalDecisionContent
                            actionName={`confirm revenue for ${el.truckNumber}`}
                            actionCallback={() =>
                              revenueStore.handleConfirmRevenue(el)
                            }
                            futherDetail={
                              <>
                                <p>
                                  Trip Price = {NairaFormatter(el.tripPrice)}
                                </p>
                                <p>
                                  Diesel Cost = {NairaFormatter(el.dieselCost)}
                                </p>
                                <p>
                                  Driver Wage = {NairaFormatter(el.driverWage)}
                                </p>
                                <p>
                                  Miscellaneous ={" "}
                                  {NairaFormatter(el.miscellaneous)}
                                </p>
                                <p>
                                  Management Fee ={" "}
                                  {NairaFormatter(el.managementCost)}{" "}
                                  {`[This is ${
                                    el.managementPercentage * 100
                                  }% of gross profit]`}
                                </p>
                                <p>
                                  Debt Repayment = {NairaFormatter(el.debtPaid)}
                                </p>
                                <p className="bg-success text-light p-2">
                                  NET PROFIT = {NairaFormatter(el.grossProfit)}
                                </p>
                              </>
                            }
                          />
                        )
                      }
                    />
                  </td>
                </tr>
              )}
            />
          )}
        </div>
      )}
    </>
  );
});

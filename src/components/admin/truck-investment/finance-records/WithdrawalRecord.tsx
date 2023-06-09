import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import * as Yup from "yup";
import { useStore } from "../../../../api/main/appStore";
import { AvailableMonths } from "../../../../api/models/truck-investment/revenue";
import {
  DateOnlyFormat,
  NairaFormatter,
} from "../../../../helper-functions/sharedFunctions";
import { CustomSelect } from "../../../shared/custom-input/CustomInputs";
import SimpleTable from "../../../shared/table/SimpleTable";

interface Props {
  availableMonths: AvailableMonths[];
  availableYears: number[];
}

const TODAY = new Date();
const CURRENT_MONTH = TODAY.getMonth() + 1;
const CURRENT_YEAR = TODAY.getFullYear();

export default observer(function WithdrawalRecord({
  availableMonths,
  availableYears,
}: Props) {
  const { paymentStore, investorStore } = useStore();

  useEffect(() => {
    (async function getDefaultData() {
      if (investorStore.selectedInvestor) {
        await paymentStore.getWithdrawalRecords(
          investorStore.selectedInvestor.id,
          CURRENT_MONTH,
          CURRENT_YEAR
        );
      }
    })();
  }, [investorStore.selectedInvestor, paymentStore]);

  if (investorStore.selectedInvestor === null) {
    return <></>;
  }

  return (
    <div className="p-3">
      <Formik
        initialValues={{
          month: CURRENT_MONTH,
          year: CURRENT_YEAR,
        }}
        onSubmit={(values) =>
          paymentStore.getWithdrawalRecords(
            Number(investorStore.selectedInvestor!.id),
            values.month,
            values.year
          )
        }
        validationSchema={Yup.object({
          month: Yup.number().required(),
          year: Yup.number().required(),
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="row">
              <div className="col-md-6">
                <CustomSelect
                  label="Enter Month"
                  name="month"
                  children={
                    <>
                      <option value={""}>Select activity month</option>
                      {availableMonths.map((el) => (
                        <option value={el.value} key={el.value}>
                          {el.monthName}
                        </option>
                      ))}
                    </>
                  }
                  required
                />
              </div>
              <div className="col-md-6 mt-2 mt-md-0">
                <CustomSelect
                  label="Enter Year"
                  name="year"
                  children={
                    <>
                      <option value={""}>Select activity year</option>
                      {availableYears.map((el) => (
                        <option value={el} key={el}>
                          {el}
                        </option>
                      ))}
                    </>
                  }
                  required
                />
              </div>
            </div>
            <Button
              className="official-form-btn"
              content="Fetch Record"
              color="vk"
              type="submit"
              loading={isSubmitting}
            />
          </Form>
        )}
      </Formik>

      {paymentStore.withdrawals ? (
        <div className="shadow-card p-3 mt-3">
          <SimpleTable
            titles={[
              "Date",
              "Requested Amount",
              "Paid Amount",
              "Balance",
              "Payment Status",
            ]}
            data={paymentStore.withdrawals}
            tableBodyBuilder={(el) => (
              <tr key={el.id}>
                <td>{DateOnlyFormat(el.dateModified)}</td>
                <td>{NairaFormatter(el.amountRequested)}</td>
                <td>{NairaFormatter(el.amountPaid)}</td>
                <td>{NairaFormatter(el.balanceUnpaid)}</td>
                <td>
                  {el.isPaid ? (
                    <>
                      <Icon
                        name="check circle outline"
                        className="text-success"
                      />{" "}
                      Settled
                    </>
                  ) : (
                    <>
                      <Icon name="hourglass end" /> Pending
                    </>
                  )}
                </td>
              </tr>
            )}
          />
        </div>
      ) : null}
    </div>
  );
});

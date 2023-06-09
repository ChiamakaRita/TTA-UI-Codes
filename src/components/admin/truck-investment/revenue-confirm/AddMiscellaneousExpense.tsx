import { FieldArray, Form, Formik } from "formik";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { Button, Icon } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import {
  MiscellaneousData,
  RevenueData,
} from "../../../../api/models/truck-investment/revenue";
import { NairaFormatter } from "../../../../helper-functions/sharedFunctions";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";
import "./AddMiscellaneousExpense.css";

interface Props {
  revenueData: RevenueData;
}

const handleTotalExpense = (arr: MiscellaneousData[]) =>
  _.sumBy(arr, (e) => e.amount);

const totalExpenseDisplay = (arr: MiscellaneousData[]) => {
  const sum = handleTotalExpense(arr);
  return NairaFormatter(sum);
};

export default observer(function AddMiscellaneousExpense({
  revenueData,
}: Props) {
  const { revenueStore } = useStore();

  return (
    <>
      <Formik
        initialValues={{
          id: revenueData.id,
          fleetId: revenueData.fleetId,
          investorId: revenueData.investorId,
          truckNumber: revenueData.truckNumber,
          dieselCost: revenueData.dieselCost,
          driverWage: revenueData.driverWage,
          miscellaneous: revenueData.miscellaneous,
          tripPrice: revenueData.tripPrice,
          managementCost: revenueData.managementCost,
          isConfirmed: false,
          dateAdded: revenueData.dateAdded,
          dateModified: new Date(),
          route: revenueData.route,
          miscellaneousExpenses: revenueData.miscellaneousExpenses,
          managementPercentage: revenueData.managementPercentage,
          debtPaid: revenueData.debtPaid,
        }}
        onSubmit={(values) =>
          revenueStore.updateRevenue({
            ...values,
            miscellaneous: handleTotalExpense(values.miscellaneousExpenses),
          })
        }
      >
        {({ isSubmitting, values }) => (
          <Form>
            <FieldArray
              name="miscellaneousExpenses"
              render={(arrayHelpers) => (
                <div>
                  {values.miscellaneousExpenses.map((expense, index) => (
                    <div key={index} className="expense-container">
                      <div className="expense-title">
                        <CustomTextInput
                          name={`miscellaneousExpenses[${index}].title`}
                          placeholder="Enter expense title"
                        />
                      </div>

                      <div className="expense-amount">
                        <CustomTextInput
                          name={`miscellaneousExpenses.${index}.amount`}
                          placeholder="Amount"
                          type="number"
                        />
                      </div>

                      <button
                        type="button"
                        className="expense-remove-btn"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <Icon name="times" className="p-0 m-0" />
                      </button>
                    </div>
                  ))}
                  <button
                    className="expense-add-btn"
                    type="button"
                    onClick={() => arrayHelpers.push({ title: "", amount: "" })}
                  >
                    + Add row
                  </button>
                </div>
              )}
            />
            <Button
              loading={isSubmitting}
              className="official-form-btn"
              content={`Save ${totalExpenseDisplay(
                values.miscellaneousExpenses
              )} Expense`}
              type="submit"
              color="vk"
            />
          </Form>
        )}
      </Formik>
    </>
  );
});

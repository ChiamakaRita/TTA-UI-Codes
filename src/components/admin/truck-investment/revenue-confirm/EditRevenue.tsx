import { Form, Formik } from "formik";
import { useEffect } from "react";
import { Button } from "semantic-ui-react";
import { RevenueData } from "../../../../api/models/truck-investment/revenue";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../api/main/appStore";
import {
  CustomSelect,
  CustomTextInput,
} from "../../../shared/custom-input/CustomInputs";
import { mgtFeePercent } from "../../../../local-data/truck-investment/mgtFeePercent";
import LoadingComponent from "../../../shared/loading-spinner/LoadingComponent";
import { NairaFormatter } from "../../../../helper-functions/sharedFunctions";

interface Props {
  revenueData: RevenueData;
}

export default observer(function EditRevenue({ revenueData }: Props) {
  const { revenueStore, investorDebtStore } = useStore();

  useEffect(() => {
    (async () => {
      await investorDebtStore.getInvestorDebtSummary(revenueData.investorId);
    })();
  }, [investorDebtStore, revenueData.investorId]);

  if (!investorDebtStore.investorDebtSummary) {
    return <LoadingComponent active={true} />;
  }

  const debt = investorDebtStore.investorDebtSummary;

  return (
    <div className="p-3">
      <h5>Edit Revenue Structure</h5>
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
          grossProfit: revenueData.grossProfit,
          managementPercentage: revenueData.managementPercentage,
          debtPaid: 0,
        }}
        onSubmit={(values) => revenueStore.updateRevenue(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="truckNumber"
              placeholder="Enter truck number"
              label="Truck Number"
              disabled
            />
            <CustomTextInput
              name="tripPrice"
              placeholder="Enter trip price"
              label="Trip Price"
              type="number"
              required
            />
            <CustomTextInput
              name="dieselCost"
              placeholder="Enter cost of diesel"
              label="Diesel Cost"
              type="number"
              required
            />
            <CustomTextInput
              name="driverWage"
              placeholder="Enter driver wage"
              label="Driver's wage"
              type="number"
              required
            />

            <CustomSelect
              name="managementPercentage"
              label="Management Fee (This percentage is charged on the gross profit)"
              type="number"
              children={
                <>
                  <option value={""}>Select a percentage</option>
                  {mgtFeePercent.map((el) => (
                    <option value={el.value} key={el.value}>
                      {el.text}
                    </option>
                  ))}
                </>
              }
              required
            />

            {debt.hasDebt && (
              <>
                <p className="text-danger text-center">
                  This investor has a debt of {NairaFormatter(debt.totalDebt)}
                </p>
                <CustomTextInput
                  name="debtPaid"
                  placeholder="Enter an amount"
                  label={`Enter amount to repay ${
                    revenueData.debtPaid > 0
                      ? `[YOU HAVE ALREADY DEDUCTED ${NairaFormatter(
                          revenueData.debtPaid
                        )} FROM THIS TRIP]`
                      : ""
                  }`}
                  type="number"
                  required
                />
              </>
            )}

            <CustomTextInput
              name="grossProfit"
              label="Profit"
              type="number"
              disabled
            />

            <Button
              loading={isSubmitting}
              className="official-form-btn"
              content="Edit Revenue"
              type="submit"
              color="vk"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
});

import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import { InvestorDebtModel } from "../../../../api/models/truck-investment/investorDebt";
import {
  CustomTextArea,
  CustomTextInput,
} from "../../../shared/custom-input/CustomInputs";

interface Props {
  data: InvestorDebtModel;
}

export default observer(function UpdateInvestorDebt({ data }: Props) {
  const { investorDebtStore } = useStore();

  return (
    <>
      <h5>Update Debt</h5>

      <Formik
        initialValues={{
          id: data.id,
          description: data.description,
          truckNumber: data.truckNumber,
          total: data.total,
          paid: data.paid,
          investorId: data.investorId,
        }}
        onSubmit={(values, { setErrors }) =>
          investorDebtStore.updateInvestorDebt(values)
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="truckNumber"
              placeholder="Enter truck number"
              label="Truck Number"
              required
            />
            <CustomTextArea
              name="description"
              placeholder="Enter debt description"
              label="Debt description"
              required
            />

            <CustomTextInput
              name="total"
              placeholder="Total cost"
              label="Total cost of debt"
              required
            />
            <CustomTextInput
              name="paid"
              placeholder="Amount Paid"
              label="Enter paid amount..."
              required
            />

            <Button
              loading={isSubmitting}
              content="Save Update"
              type="submit"
              className="official-form-btn"
              color="vk"
            />
          </Form>
        )}
      </Formik>
    </>
  );
});

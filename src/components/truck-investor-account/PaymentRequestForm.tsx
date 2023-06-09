import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { useStore } from "../../api/main/appStore";
import { PaymentRequestFormData } from "../../api/models/truck-investment/revenue";
import { NairaFormatter } from "../../helper-functions/sharedFunctions";
import * as Yup from "yup";
import { CustomTextInput } from "../shared/custom-input/CustomInputs";

interface Props {
  withdrawableAmount: number;
}

export default observer(function PaymentRequestForm({
  withdrawableAmount,
}: Props) {
  const { revenueStore, investorStore } = useStore();

  const handlePaymentRequest = async (value: PaymentRequestFormData) => {
    await revenueStore.makePaymentRequest(value);
  };

  return (
    <>
      <div className="available-balance-container">
        <h4>Payment Request</h4>

        <p className="available-balance px-2 py-1 rounded">
          Available Balance <br /> {NairaFormatter(withdrawableAmount)}
        </p>
      </div>

      <Formik
        initialValues={{ amountRequested: "" }}
        validationSchema={Yup.object({
          amountRequested: Yup.number()
            .moreThan(0, "Amount cannot be negative")
            .required("This field is required"),
        })}
        onSubmit={async (values, { resetForm }) =>
          handlePaymentRequest({
            investorId: +investorStore.investorId!,
            amountRequested: Number(values.amountRequested),
          }).finally(() => resetForm({ values: { amountRequested: "" } }))
        }
      >
        {({ isSubmitting, values }) => (
          <Form>
            <CustomTextInput
              placeholder="Enter withdrawal amount"
              name="amountRequested"
              type="number"
            />
            <Button
              loading={isSubmitting}
              content={`Withdraw ${NairaFormatter(+values.amountRequested)}`}
              type="submit"
              color="vk"
              size="tiny"
            />
          </Form>
        )}
      </Formik>
    </>
  );
});

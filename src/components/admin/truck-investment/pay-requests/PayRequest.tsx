import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Divider } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import { PayRequestModalData } from "../../../../api/models/truck-investment/payment";
import { NairaFormatter } from "../../../../helper-functions/sharedFunctions";

interface Props {
  data: PayRequestModalData;
}

export default observer(function PayRequest({ data }: Props) {
  const { paymentStore } = useStore();

  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <h5 className="mb-0">Name:</h5>
          <p>
            {data.investor.firstName} {data.investor.lastName}
          </p>
          <h5 className="mb-0">Unique Code:</h5>
          <p>{data.investor.investorCode}</p>
          <h5 className="mb-0">Telephone:</h5>
          <p>{data.investor.phone}</p>
        </div>

        <div className="ml-2">
          <h5 className="mb-0">Amount Requested:</h5>
          <p>{NairaFormatter(data.clickedData.amountRequested)}</p>

          <h5 className="mb-0">Bank Detail:</h5>
          <p>Account Number: {data.bank[0].accountNumber}</p>
          <p>{data.bank[0].bankName}</p>
        </div>
        <Divider />
      </div>

      <Formik
        initialValues={{
          id: data.clickedData.id,
          uniqueId: data.clickedData.uniqueId,
          investorId: data.clickedData.investorId,
          amountRequested: data.clickedData.amountRequested,
          isPaid: true,
          amountPaid: data.clickedData.amountRequested,
          balanceUnpaid: 0,
          dateAdded: new Date(),
        }}
        onSubmit={(values) => paymentStore.settlePaymentRequest(values)}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <Button
              loading={isSubmitting}
              className="official-form-btn"
              content={`Pay ${NairaFormatter(values.amountRequested)}`}
              type="submit"
              color="vk"
            />
          </Form>
        )}
      </Formik>
    </>
  );
});

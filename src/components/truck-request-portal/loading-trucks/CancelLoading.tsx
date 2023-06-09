import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import { TruckPortalData } from "../../../api/models/truck-portal/truckPortal";
import { CustomTextInput } from "../../shared/custom-input/CustomInputs";

interface Props {
  data: TruckPortalData;
}

export default observer(function CancelLoading({ data }: Props) {
  const { truckPortalStore } = useStore();
  return (
    <div>
      <h4 className="request-modal-title">What's Next ?</h4>
      <p className="request-modal-text">
        By clicking proceed, an email will be sent to {data.transporterName}{" "}
        that you have decided to stop loading this truck. Give a reason for this
        decision.
      </p>

      <Formik
        initialValues={{
          id: data.id,
          cancelReason: "",
        }}
        onSubmit={(values) => truckPortalStore.cancelTruckLoading(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="cancelReason"
              type="text"
              placeholder="Enter cancellation reason..."
              required
              label="Reason"
            />

            <Button
              loading={isSubmitting}
              content="Proceed"
              type="submit"
              color="vk"
              fluid
              className="available-trucks-btn"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
});

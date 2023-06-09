import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import { TruckPortalData } from "../../../api/models/truck-portal/truckPortal";
import { CustomTextInput } from "../../shared/custom-input/CustomInputs";

interface Props {
  data: TruckPortalData;
}

export default observer(function SendTruckUpdate({ data }: Props) {
  const { truckPortalStore } = useStore();

  return (
    <div>
      <p className="request-modal-text">
        Truck <span className="text-danger fw-bold">{data.truckNumber}</span> is
        currently at
      </p>

      <Formik
        initialValues={{
          requestId: data.id,
          transporterId: data.transporterId,
          shipperId: data.shipperId,
          isCurrent: true,
          origin: "Lagos",
          destination: data.destination,
          truckNumber: data.truckNumber,
          currentLocation: "",
          remainingDistance: 0,
        }}
        onSubmit={(values) => truckPortalStore.sendTruckUpdate(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="currentLocation"
              type="text"
              placeholder="Enter current location.."
            />

            <Button
              loading={isSubmitting}
              content="Send"
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

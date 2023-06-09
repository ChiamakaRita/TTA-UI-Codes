import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import { TruckPortalData } from "../../../api/models/truck-portal/truckPortal";
import { CustomTextInput } from "../../shared/custom-input/CustomInputs";

interface Props {
  data: TruckPortalData;
}

export default observer(function RequestToLoad({ data }: Props) {
  const { truckPortalStore, userAccountStore } = useStore();

  return (
    <div>
      <h4 className="request-modal-title">Enter Loading Point</h4>
      <p className="request-modal-text">
        Enter the loading point below and {data.driverName} will be notified to
        proceed to the loading point with {data.truckNumber}.
      </p>

      <Formik
        initialValues={{
          id: data.id,
          loadingPoint: "",
        }}
        onSubmit={(values) =>
          truckPortalStore.requestToLoadTruck(
            userAccountStore.user?.organisationId!,
            values
          )
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="loadingPoint"
              type="text"
              placeholder="Enter Loading Point..."
              required
              label="Location"
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

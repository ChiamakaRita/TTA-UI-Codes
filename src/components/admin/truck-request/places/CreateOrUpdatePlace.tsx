import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import { PlaceData } from "../../../../api/models/truck-request/place";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";

interface Props {
  placeData: PlaceData | null;
}

export default observer(function CreateOrUpdatePlace({ placeData }: Props) {
  const { placeStore } = useStore();

  const INITIAL_VALUES = {
    origin: "Lagos",
    destinationState: placeData?.destinationState ?? "",
    destinationCity: placeData?.destinationCity ?? "",
    leadtime: placeData?.leadtime ?? "",
    distance: placeData?.distance ?? "",
  };

  return (
    <div>
      <h4 className="text-secondary">
        {placeData ? "Update Destination" : "Create Destination"}
      </h4>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, { resetForm }) =>
          placeData
            ? placeStore.updatePlace(placeData.id, {
                ...values,
                leadtime: +values.leadtime,
                distance: +values.distance,
              })
            : placeStore.addPlace({
                ...values,
                leadtime: +values.leadtime,
                distance: +values.distance,
              })
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="destinationState"
              label="State"
              type="text"
              placeholder="Eg: Borno"
              required
            />

            <CustomTextInput
              name="destinationCity"
              label="Location"
              required
              placeholder="Eg: Maiduguri"
            />

            <CustomTextInput
              name="leadtime"
              label="Lead time in days"
              type="number"
              required
              placeholder="Enter number of day (s)"
            />

            <CustomTextInput
              name="distance"
              label="Distance from Lagos"
              type="number"
              required
              placeholder="Enter distance"
            />

            <Button
              loading={isSubmitting}
              content="Proceed"
              type="submit"
              color="vk"
              className="official-form-btn"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
});

import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { CustomTextInput } from "../../shared/custom-input/CustomInputs";

interface Props {
  routeId: number;
}

export default observer(function AddTracker({ routeId }: Props) {
  const { routeStore, userAccountStore } = useStore();

  const INITIAL_VALUES = {
    routeId: routeId,
    name: "",
    imie: "",
    updateFrequency: 10,
    isActive: false,
    organisationID: userAccountStore.user?.organisationId!,
  };

  return (
    <>
      <h5>Assign New Tracker</h5>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, { setErrors }) => {
          routeStore.createTracker(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="name"
              placeholder="Tracker name"
              label="Enter tracker name"
              required
            />

            <CustomTextInput
              name="imie"
              placeholder="Tracker Imie"
              label="Enter tracker Imie"
              required
            />

            <Button
              content="Create"
              type="submit"
              color="vk"
              className="official-form-btn"
            />
          </Form>
        )}
      </Formik>
    </>
  );
});

import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { CustomTextInput } from "../../shared/custom-input/CustomInputs";

export default observer(function CreateRouteForm() {
  const { routeStore, userAccountStore } = useStore();

  return (
    <>
      <Formik
        initialValues={{
          origin: "",
          destination: "",
          organisationID: userAccountStore.user?.organisationId!,
        }}
        onSubmit={(values, { setErrors }) => routeStore.createRoute(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="origin"
              placeholder="Origin"
              label="Enter Origin"
              required
            />

            <CustomTextInput
              name="destination"
              placeholder="Destination"
              label="Enter Destination"
              required
            />

            <Button
              loading={isSubmitting}
              className="official-form-btn"
              content="Add"
              color="vk"
              icon="pencil"
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </>
  );
});

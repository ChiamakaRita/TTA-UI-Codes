import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../api/main/appStore";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";
import { Button } from "semantic-ui-react";

export default observer(function AddNewOrigin() {
  const { pricewatchStore } = useStore();

  return (
    <>
      <h5>Create new origin</h5>

      <Formik
        initialValues={{
          name: "",
          state: "",
        }}
        onSubmit={(values) => pricewatchStore.createOrigin(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="name"
              placeholder="What location do you want to add ?"
              label="Location"
              required
            />

            <CustomTextInput
              name="state"
              placeholder="Which state is this located ?"
              label="State"
              required
            />

            <Button
              loading={isSubmitting}
              content="Finish"
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

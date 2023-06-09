import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { CustomTextInput } from "../../shared/custom-input/CustomInputs";

export default observer(function CreateShipperForm() {
  const { shipperStore, userAccountStore } = useStore();

  const INITIAL_VALUES = {
    name: "",
    contactEmail: "",
    phone: "",
    officeAddress: "",
    organisationId: userAccountStore.user?.organisationId!,
  };

  return (
    <>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, { setErrors }) =>
          shipperStore.createNewShipper(values)
        }
      >
        {({ handleSubmit, errors, isSubmitting, isValid, dirty }) => (
          <Form>
            <CustomTextInput
              name="name"
              placeholder="Enter Shipper's name"
              label="Name"
              required
            />

            <CustomTextInput
              name="contactEmail"
              placeholder="Enter Shipper's contact email"
              label="Contact Email"
              type="email"
              required
            />
            <CustomTextInput
              name="officeAddress"
              placeholder="Enter vendors's address"
              label="Address"
              required
            />
            <CustomTextInput
              name="phone"
              placeholder="Enter Shipper's phone number"
              label="Phone"
              type="tel"
              required
            />

            <Button
              loading={isSubmitting}
              content="Create"
              type="submit"
              color="vk"
              icon="pencil"
              className="official-form-btn"
            />
          </Form>
        )}
      </Formik>
    </>
  );
});

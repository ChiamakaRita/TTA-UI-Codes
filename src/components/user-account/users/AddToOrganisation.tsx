import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import { CustomTextInput } from "../../shared/custom-input/CustomInputs";

export default function AddToOrganisation() {
  const { userAccountStore } = useStore();

  const INITIAL_VALUES = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    countryCode: "+234",
    organisationId: 0,
  };

  if (userAccountStore.user === null) return <></>;

  return (
    <div>
      <h4 className="text-secondary mb-1">Add New User</h4>
      <small className="d-block">
        New user's default password is their phone number
      </small>
      <br />
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, { resetForm }) =>
          userAccountStore.addUserToOrganisation({
            ...values,
            password: values.phone,
            organisationId: userAccountStore.user?.organisationId!,
          })
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="firstName"
              type="text"
              placeholder="Enter user's first name"
            />
            <CustomTextInput
              name="lastName"
              type="text"
              placeholder="Enter user's last name"
            />
            <CustomTextInput
              name="email"
              type="email"
              placeholder="Enter user's email"
            />
            <CustomTextInput
              name="phone"
              type="tel"
              placeholder="Enter user's phone number"
            />

            <Button
              loading={isSubmitting}
              content="Create"
              type="submit"
              color="vk"
              className="official-form-btn"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

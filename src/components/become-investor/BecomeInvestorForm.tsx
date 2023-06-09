import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useStore } from "../../api/main/appStore";
import { UserData } from "../../api/models/userAccount";
import { CustomTextInput } from "../shared/custom-input/CustomInputs";
import "./BecomeInvestorForm.css";

interface Props {
  data: UserData;
}

export default observer(function BecomeInvestorForm({ data }: Props) {
  const { investorStore } = useStore();

  const INITIAL_VALUES = {
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    email: data.email,
    dateOfApplication: new Date().toISOString(),
    isApproved: false,
    orgId: data.organisationId,
    error: null,
  };

  return (
    <div className="shadow-card p-3 investor-apply-form">
      <h3 className="investor-apply-form-title">Application Form</h3>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, { resetForm }) =>
          investorStore.applyAsInvestor(values)
        }
        validationSchema={Yup.object({
          firstName: Yup.string().required(),
          lastName: Yup.string().required(),
          phone: Yup.string().required(),
        })}
      >
        {({ handleSubmit, errors, isSubmitting, isValid, dirty }) => (
          <Form>
            <CustomTextInput
              name="firstName"
              placeholder="Enter First Name"
              label="First Name"
            />

            <CustomTextInput
              name="lastName"
              placeholder="Enter Last Name"
              label="Last Name"
            />

            <CustomTextInput
              name="phone"
              placeholder="Enter Phone Number"
              label="Telephone"
            />

            <CustomTextInput
              name="email"
              placeholder="Enter Your Email"
              type="email"
              disabled
            />

            <Button
              loading={isSubmitting}
              className="official-form-btn"
              content="Submit"
              type="submit"
              color="vk"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
});

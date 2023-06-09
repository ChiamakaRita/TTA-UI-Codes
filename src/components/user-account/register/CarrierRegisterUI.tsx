import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useStore } from "../../../api/main/appStore";
import { countryCodeOptions } from "../../../local-data/shared/CountryCodeOptions";
import {
  CustomPasswordInput,
  CustomSelect,
  CustomTextInput,
} from "../../shared/custom-input/CustomInputs";

interface Props {
  accountType: string;
}

const CarrierRegisterUI = ({ accountType }: Props) => {
  const { userAccountStore } = useStore();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
    phone: "",
    countryCode: "+234",
    organisation: {
      name: "",
      contactEmail: "",
      reportEmail: "",
      phone: "",
      accountType,
    },
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          const valuesToSendUp = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            username: values.email,
            password: values.password,
            phone: values.phone,
            countryCode: values.countryCode,
            organisation: {
              name: `${values.firstName} ${values.lastName}`,
              contactEmail: values.email,
              reportEmail: values.email,
              phone: values.phone,
              accountType,
            },
          };
          await userAccountStore.register(valuesToSendUp);
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("First name is required"),
          lastName: Yup.string().required("Last name is required"),
          email: Yup.string().required(),
          password: Yup.string().min(8).required(),
          passwordConfirmation: Yup.string()
            .required()
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="firstName"
              placeholder="Enter First Name"
              label="First Name"
              required
            />

            <CustomTextInput
              name="lastName"
              placeholder="Enter Last Name"
              label="Last Name"
              required
            />

            <div className="d-flex">
              <CustomSelect
                name="countryCode"
                label="Code"
                children={
                  <>
                    {countryCodeOptions.map((el) => {
                      return (
                        <option value={el.value} key={el.value}>
                          {el.text}
                        </option>
                      );
                    })}
                  </>
                }
                required
              />
              <div className="flex-grow-1">
                <CustomTextInput
                  name="phone"
                  type="tel"
                  label="Telephone"
                  placeholder="Eg. 08083779882"
                  required
                />
              </div>
            </div>

            <CustomTextInput
              name="email"
              placeholder="Enter Your Email"
              label="Email"
              type="email"
              required
            />

            <CustomPasswordInput
              name="password"
              placeholder="Password"
              type="password"
              label="Password"
            />

            <CustomPasswordInput
              name="passwordConfirmation"
              placeholder="Confirm Password"
              type="password"
              label="Confirm Password"
            />

            <Button
              loading={isSubmitting}
              content="Register"
              type="submit"
              className=" fficial-form-btn"
              color="vk"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default observer(CarrierRegisterUI);

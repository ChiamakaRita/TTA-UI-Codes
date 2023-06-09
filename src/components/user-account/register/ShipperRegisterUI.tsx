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

const ShipperRegisterUI = ({ accountType }: Props) => {
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
        onSubmit={async (values) => {
          const valuesToSendUp = {
            firstName: values.organisation.name,
            lastName: values.organisation.name,
            email: values.email,
            password: values.password,
            phone: values.phone,
            countryCode: values.countryCode,
            organisation: {
              name: values.organisation.name,
              contactEmail: values.email,
              reportEmail: values.email,
              phone: values.phone,
              accountType,
            },
          };
          return await userAccountStore.register(valuesToSendUp);
        }}
        validationSchema={Yup.object({
          password: Yup.string().min(8).required(),
          passwordConfirmation: Yup.string()
            .required()
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
          countryCode: Yup.string().required(),

          organisation: Yup.object({
            name: Yup.string().required("Organisation name is required"),
          }),
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="organisation.name"
              placeholder="Enter Organisation Name"
              label="Organisation Name"
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
              placeholder="Enter Contact Email"
              label="Contact Email"
              type="email"
            />

            <CustomPasswordInput
              name="password"
              placeholder="Password"
              type="password"
              label="Password"
            />
            <CustomPasswordInput
              name="passwordConfirmation"
              placeholder="Confirm your password"
              type="password"
              label="Confirm Password"
            />

            <Button
              loading={isSubmitting}
              content="Register"
              type="submit"
              color="vk"
              className="official-form-btn"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default observer(ShipperRegisterUI);

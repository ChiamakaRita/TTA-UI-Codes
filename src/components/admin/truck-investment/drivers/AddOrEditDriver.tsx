import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../api/main/appStore";
import { DriverData } from "../../../../api/models/truck-investment/driver";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";
import { Button } from "semantic-ui-react";

interface Props {
  currentDriver: DriverData | null;
}

export default observer(function AddOrEditDriver({ currentDriver }: Props) {
  const { driverStore } = useStore();

  return (
    <>
      <h5>{currentDriver ? "Update driver data" : "Create new driver"}</h5>

      <Formik
        initialValues={{
          firstName: currentDriver?.firstName ?? "",
          lastName: currentDriver?.lastName ?? "",
          phone: currentDriver?.phone ?? "",
          identificationType:
            currentDriver?.identificationType ?? "Driver's License",
          identificationNumber: currentDriver?.identificationNumber ?? "",
          email: currentDriver?.email ?? "",
          error: null,
        }}
        onSubmit={(values, { setErrors }) =>
          currentDriver
            ? driverStore.updateDriver(currentDriver.id, values)
            : driverStore.createDriver(values)
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="firstName"
              placeholder="Enter driver's first name"
              label="First Name"
              required
            />

            <CustomTextInput
              name="lastName"
              placeholder="Enter driver's last name"
              label="Last Name"
              required
            />

            <CustomTextInput
              name="phone"
              placeholder="Enter driver phone"
              label="Phone"
              required
            />

            <CustomTextInput
              name="identificationNumber"
              placeholder="Enter ID number"
              label="ID Number"
              required
            />
            <CustomTextInput
              name="email"
              placeholder="Enter driver's email"
              label="Email"
              type="email"
            />

            <Button
              loading={isSubmitting}
              content="Continue"
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

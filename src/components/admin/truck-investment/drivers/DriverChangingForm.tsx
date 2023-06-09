import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { DriverData } from "../../../../api/models/truck-investment/driver";
import { useStore } from "../../../../api/main/appStore";
import { CustomSelect } from "../../../shared/custom-input/CustomInputs";

interface Props {
  data: DriverData[];
}

const INITIAL_VALUES = {
  oldDriver: null,
  newDriver: null,
};

export default observer(function DriverChangingForm({ data }: Props) {
  const { driverStore } = useStore();
  return (
    <div>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) =>
          driverStore.changeDriver(values.oldDriver, values.newDriver)
        }
      >
        {({ isSubmitting }) => (
          <Form className="ui form">
            <div className="row mb-2">
              <div className="col-6">
                <CustomSelect
                  name="oldDriver"
                  label="Select old driver"
                  children={
                    <>
                      <option value={""}>Old driver</option>
                      {data.map((el) => (
                        <option key={el.uniqueId} value={el.id}>
                          {el.firstName} {el.lastName}
                        </option>
                      ))}
                    </>
                  }
                  required
                />
              </div>
              <div className="col-6">
                <CustomSelect
                  name="newDriver"
                  label="Select new driver"
                  children={
                    <>
                      <option value={""}>New driver</option>
                      {data.map((el) => (
                        <option key={el.uniqueId} value={el.id}>
                          {el.firstName} {el.lastName}
                        </option>
                      ))}
                    </>
                  }
                  required
                />
              </div>
            </div>

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
    </div>
  );
});

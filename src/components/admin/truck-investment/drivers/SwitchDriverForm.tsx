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
  driverA: null,
  driverB: null,
};

export default observer(function SwitchDriverForm({ data }: Props) {
  const { driverStore } = useStore();
  return (
    <div>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) =>
          driverStore.switchDriver(values.driverA, values.driverB)
        }
      >
        {({ isSubmitting }) => (
          <Form className="ui form">
            <div className="row mb-2">
              <div className="col-6">
                <CustomSelect
                  name="driverA"
                  label="Driver A"
                  children={
                    <>
                      <option value={""}>Select Driver A</option>
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
                  name="driverB"
                  label="Driver B"
                  children={
                    <>
                      <option value={""}>Select Driver B</option>
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

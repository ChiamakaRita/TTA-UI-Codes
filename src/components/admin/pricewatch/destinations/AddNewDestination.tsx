import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../api/main/appStore";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";
import { Button } from "semantic-ui-react";
import { Origin } from "../../../../api/models/price-watch/pricewatch";

interface Props {
  data: Origin;
}

export default observer(function AddNewDestination({ data }: Props) {
  const { pricewatchStore } = useStore();

  return (
    <>
      <h5>Create new destination</h5>

      <Formik
        initialValues={{
          name: "",
          state: "",
          originId: data.id,
          originName: data.name,
          distance: "",
          leadTime: "",
        }}
        onSubmit={(values) =>
          pricewatchStore.createDestination({
            ...values,
            distance: +values.distance,
            leadTime: +values.leadTime,
          })
        }
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
            <CustomTextInput
              name="distance"
              placeholder="Enter distance"
              label={`Distance from ${data.name}`}
              required
              type="number"
            />
            <CustomTextInput
              name="leadTime"
              placeholder="Enter Lead time"
              label="Lead time (in days)"
              required
              type="number"
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

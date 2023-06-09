import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { RevenueData } from "../../../../api/models/truck-investment/revenue";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../api/main/appStore";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";

interface Props {
  revenueData: RevenueData;
}

export default observer(function ReturnTripForm({ revenueData }: Props) {
  const { revenueStore } = useStore();

  return (
    <div className="p-3">
      <h5>Return trip details</h5>
      <Formik
        initialValues={{
          initialRevenue: revenueData,
          tripPrice: 0,
          goodsLoaded: "",
        }}
        onSubmit={(values) => revenueStore.createReturnTripRevenue(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="tripPrice"
              placeholder="Enter trip price"
              label="Trip Price"
              type="number"
              min={10000}
              required
            />
            <CustomTextInput
              name="goodsLoaded"
              placeholder="Enter type of goods"
              label="Type of goods loaded"
              required
            />
            <Button
              loading={isSubmitting}
              className="official-form-btn"
              content="Create Revenue"
              type="submit"
              color="vk"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
});

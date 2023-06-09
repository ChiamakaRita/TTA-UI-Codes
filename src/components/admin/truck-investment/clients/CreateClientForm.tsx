import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../api/main/appStore";
import {
  CustomSelect,
  CustomTextInput,
} from "../../../shared/custom-input/CustomInputs";
import { contentCategory } from "../../../../local-data/shipment/contentCategory";

export default observer(function CreateClientForm() {
  const { investorClientStore } = useStore();
  const INITIAL_VALUES = {
    name: "",
    address: "",
    productCategory: "",
    dateAdded: new Date(),
  };
  return (
    <>
      <h5 className="text-secondary">Create new shipper</h5>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) => investorClientStore.createInvestorShipper(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="name"
              placeholder="Enter shipper name"
              label="Shipper Name"
              required
            />

            <CustomTextInput
              name="address"
              placeholder="Enter address"
              label="Shipper Address"
              required
            />

            <CustomSelect
              name="productCategory"
              label="Category of Product"
              children={
                <>
                  <option value={""}>Enter product category</option>

                  {contentCategory.map((el) => (
                    <option key={el.value} value={el.value}>
                      {el.text}
                    </option>
                  ))}
                </>
              }
              required
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
    </>
  );
});

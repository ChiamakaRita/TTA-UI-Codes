import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import { VendorData } from "../../../../api/models/truck-request/vendor";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";

interface Props {
  vendorData: VendorData | null;
}

export default observer(function CreateOrUpdateVendor({ vendorData }: Props) {
  const { vendorStore } = useStore();

  const INITIAL_VALUES = {
    businessName: vendorData?.businessName ?? "",
    preferredName: vendorData?.preferredName ?? "",
    phone: vendorData?.phone ?? "",
    isActive: true,
    contactEmail: vendorData?.contactEmail ?? "",
  };

  return (
    <div>
      <h4 className="text-secondary">
        {vendorData ? "Update Vendor" : "Create Vendor"}
      </h4>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) =>
          vendorData
            ? vendorStore.updateVendor(vendorData.id, values)
            : vendorStore.addVendor(values)
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="businessName"
              label="Business Name"
              type="text"
              placeholder="Enter vendor's business name"
              required
            />

            <CustomTextInput
              name="preferredName"
              label="Preferred Name"
              type="text"
              required
              placeholder="Enter vendor's preferred name"
            />

            <CustomTextInput
              name="phone"
              label="Phone Number"
              type="tel"
              required
              placeholder="Enter phone number"
            />
            <CustomTextInput
              name="contactEmail"
              label="Contact Email"
              type="email"
              required
              placeholder="Enter contact email"
            />

            <Button
              loading={isSubmitting}
              content="Proceed"
              type="submit"
              color="vk"
              className="official-form-btn"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
});

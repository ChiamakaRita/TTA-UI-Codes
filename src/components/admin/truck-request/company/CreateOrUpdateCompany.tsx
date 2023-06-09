import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import { CompanyData } from "../../../../api/models/truck-request/company";
import { productTypeList } from "../../../../local-data/shared/productType";
import {
  CustomSelect,
  CustomTextInput,
} from "../../../shared/custom-input/CustomInputs";

interface Props {
  companyData: CompanyData | null;
}

export default observer(function CreateOrUpdateCompany({ companyData }: Props) {
  const { companyStore } = useStore();

  const INITIAL_VALUES = {
    name: companyData?.name ?? "",
    origin: companyData?.origin ?? "",
    originState: companyData?.originState ?? "",
    productType: companyData?.productType ?? "",
  };

  return (
    <div>
      <h4 className="text-secondary">
        {companyData ? "Update Company" : "Create Company"}
      </h4>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, { resetForm }) =>
          companyData
            ? companyStore.updateCompany(companyData.id, values)
            : companyStore.addCompany(values)
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="name"
              label="Company Name"
              type="text"
              placeholder="Eg. Cardbury, FMN, Promasidor, ..."
              required
            />
            <CustomTextInput
              name="originState"
              label="State"
              type="text"
              placeholder="Eg: Lagos"
              required
            />

            <CustomTextInput
              name="origin"
              label="Location"
              required
              placeholder="Eg: Oshodi"
            />

            <CustomSelect
              name="productType"
              label="Product Type"
              required
              children={
                <>
                  <option defaultValue={""}>Select a product type</option>
                  {productTypeList.map((el) => (
                    <option key={el.value} value={el.value}>
                      {el.text}
                    </option>
                  ))}
                </>
              }
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

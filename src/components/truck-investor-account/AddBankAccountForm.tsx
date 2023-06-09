import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import {
  CustomSelect,
  CustomTextInput,
} from "../shared/custom-input/CustomInputs";
import { bankNamesList } from "../../local-data/truck-investment/bankNames";

interface Props {
  investorId: number;
}

export default observer(function AddBankAccountForm({ investorId }: Props) {
  const { investorStore } = useStore();

  const INITIAL_VALUES = {
    bankName: "",
    accountName: "",
    accountNumber: "",
    investorId: investorId,
  };

  return (
    <>
      <h5 className="text-secondary">Add Bank Account Details</h5>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) => investorStore.createInvestorBankDetails(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomSelect
              name="bankName"
              label="Bank"
              children={
                <>
                  <option value={""}>Enter Bank Name</option>
                  {bankNamesList.map((el) => (
                    <option key={el.value}>{el.text}</option>
                  ))}
                </>
              }
              required
            />

            <CustomTextInput
              name="accountName"
              label="Name"
              placeholder="Enter Account Name"
              required
            />

            <CustomTextInput
              name="accountNumber"
              label="Account Number"
              placeholder="Enter Account Number"
              required
            />

            <Button
              loading={isSubmitting}
              content="Proceed"
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

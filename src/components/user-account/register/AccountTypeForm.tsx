import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { customHistory } from "../../..";
import { useStore } from "../../../api/main/appStore";
import { accountTypeOptions } from "../../../local-data/user-account/accountTypeOptions";
import { CustomSelect } from "../../shared/custom-input/CustomInputs";

export default observer(function AccountTypeForm() {
  const { commonStore } = useStore();

  return (
    <>
      <Formik
        initialValues={{ accountType: "" }}
        onSubmit={(values) => {
          customHistory.push("/account/register", values.accountType);
          commonStore.setModalVisible(false);
        }}
        validationSchema={Yup.object({
          accountType: Yup.string().required(),
        })}
      >
        {() => (
          <Form>
            <CustomSelect
              name="accountType"
              label="Account type"
              children={
                <>
                  <option value={""}>Which of our services do you want?</option>

                  {accountTypeOptions.map((el) => (
                    <option key={el.value} value={el.value}>
                      {el.text}
                    </option>
                  ))}
                </>
              }
              required
            />

            <Button
              content="Proceed"
              type="submit"
              className="official-form-btn"
            />
          </Form>
        )}
      </Formik>
    </>
  );
});

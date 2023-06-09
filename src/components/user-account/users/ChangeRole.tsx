import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { UserData } from "../../../api/models/userAccount";
import { useStore } from "../../../api/main/appStore";
import { CustomSelect } from "../../shared/custom-input/CustomInputs";
import * as Yup from "yup";

interface Props {
  data: UserData;
}

export default observer(function ChangeRole({ data }: Props) {
  const { userAccountStore } = useStore();

  return (
    <div>
      <h5 className="text-secondary">
        Modify {`${data.firstName} ${data.lastName}'s`} Role{" "}
      </h5>
      <Formik
        initialValues={{
          role: "",
        }}
        onSubmit={(values, { resetForm }) =>
          userAccountStore.modifyRole(data.id, values.role)
        }
        validationSchema={Yup.object({
          role: Yup.string().required("This a required field"),
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomSelect
              label="Pick a role"
              name="role"
              children={
                <>
                  <option value="">Select new role</option>
                  <option value="Admin">Adiministrator</option>
                  <option value="User">User</option>
                </>
              }
              required
            />
            <Button
              loading={isSubmitting}
              content="Change Role"
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

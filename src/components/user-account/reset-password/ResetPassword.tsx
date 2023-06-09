import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { CustomPasswordInput } from "../../shared/custom-input/CustomInputs";
import * as Yup from "yup";
import { customHistory } from "../../..";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { useLocation } from "react-router-dom";

export default observer(function ResetPassword() {
  const { userAccountStore } = useStore();

  const location = useLocation();

  const pathName = location.pathname.split("+");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, guid, expiryDate] = pathName;
  const token = pathName[0]
    .slice(pathName[0].lastIndexOf("/"))
    .replace("/", "");

  return (
    <div className="login-container">
      <div className="login-container-header">
        <div className="mt-4">
          <img src="/Logo.svg" alt="company-logo" />
        </div>
      </div>

      <div className="login-form">
        <div className="login-form-card">
          <h5>Reset password </h5>

          <Formik
            initialValues={{
              resetToken: token,
              userGuid: guid,
              expiryDate: new Date(expiryDate.replace("*", " ")).toISOString(),
              newPassword: "",
            }}
            onSubmit={(values) => userAccountStore.reset(values)}
            validationSchema={Yup.object({
              newPassword: Yup.string().required("This field is required"),
              confirmPassword: Yup.string()
                .required("This field is required")
                .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
            })}
          >
            {({ isSubmitting }) => (
              <Form>
                <CustomPasswordInput
                  name="newPassword"
                  placeholder="New Password"
                  type="password"
                />
                <CustomPasswordInput
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  type="password"
                />

                <Button
                  loading={isSubmitting}
                  content="Reset Password"
                  type="submit"
                  className="login-form-btn"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div
        className="no-account pointer-cursor"
        onClick={() => customHistory.push("/account/login")}
      >
        ⬅ Back to Login
      </div>
    </div>
  );
});

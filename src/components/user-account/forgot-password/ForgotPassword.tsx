import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { CustomTextInput } from "../../shared/custom-input/CustomInputs";
import * as Yup from "yup";
import "./ForgotPassword.css";
import { customHistory } from "../../..";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";

export default observer(function ForgotPassword() {
  const { userAccountStore } = useStore();

  return (
    <div className="login-container">
      <div className="login-container-header">
        <div className="mt-4">
          <img src="/Logo.svg" alt="company-logo" />
        </div>
      </div>

      <div className="login-form">
        <div className="login-form-card">
          <h5>Forgot password ?</h5>

          <Formik
            initialValues={{
              username: "",
            }}
            onSubmit={async (values) =>
              userAccountStore.forgotPassword(values.username)
            }
            validationSchema={Yup.object({
              username: Yup.string().email().required("Email is required"),
            })}
          >
            {({ isSubmitting }) => (
              <Form>
                <CustomTextInput
                  name="username"
                  placeholder="Enter your email"
                  type="email"
                />

                <Button
                  loading={isSubmitting}
                  content="Send Reset Link"
                  type="submit"
                  className="login-form-btn"
                  size="tiny"
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

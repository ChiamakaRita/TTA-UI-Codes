import { Form, Formik } from "formik";
import { Button, Icon } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import {
  CustomPasswordInput,
  CustomTextInput,
} from "../../shared/custom-input/CustomInputs";
import * as Yup from "yup";
import "./Login.css";
import { Link } from "react-router-dom";
import { AuthenticationError } from "../error/AuthenticationError";
import { observer } from "mobx-react-lite";
import AccountTypeForm from "../register/AccountTypeForm";

export default observer(function Login() {
  const { userAccountStore, commonStore } = useStore();

  return (
    <div className="login-container">
      <div className="login-container-header">
        <div className="mt-4">
          <img src="/Logo.svg" alt="company-logo" />
        </div>
      </div>

      <div className="login-form">
        <div className="login-form-card">
          {userAccountStore.authenticationErrorMessage ? (
            <AuthenticationError
              message={userAccountStore.authenticationErrorMessage}
            />
          ) : null}

          <h2>Login</h2>

          <Formik
            initialValues={{
              username: "",
              password: "",
              error: null,
            }}
            onSubmit={async (values) => {
              userAccountStore.setBtnClicked(true);
              userAccountStore.login(values);
            }}
            validationSchema={Yup.object({
              username: Yup.string().email().required("Email is required"),
              password: Yup.string().required("Password is required"),
            })}
          >
            {({ handleSubmit, isSubmitting, isValid, dirty }) => (
              <Form>
                <CustomTextInput
                  name="username"
                  placeholder="Enter your email"
                  type="email"
                  label="Email"
                  onFocus={() =>
                    userAccountStore.setAuthenticationErrorMessage(null)
                  }
                />
                <CustomPasswordInput
                  name="password"
                  placeholder="Enter your password"
                  label="Password"
                  onFocus={() =>
                    userAccountStore.setAuthenticationErrorMessage(null)
                  }
                />

                <Link
                  to={"/account/forgot-password"}
                  className="login-forgot-password"
                >
                  <Icon name="key" /> Forgot Password ?{" "}
                </Link>

                <Button
                  loading={isSubmitting}
                  content="Sign in"
                  type="submit"
                  className="login-form-btn"
                />

                <Link to={"/"} className="return-to-site">
                  <Icon name="home" /> Return to site
                </Link>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="no-account">
        Don't have an account ? &nbsp;{" "}
        <span onClick={() => commonStore.setModalContent(<AccountTypeForm />)}>
          Sign up
        </span>
      </div>
    </div>
  );
});

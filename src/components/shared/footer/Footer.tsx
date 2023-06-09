import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Button, Divider } from "semantic-ui-react";
import "./Footer.css";
import { observer } from "mobx-react-lite";

export default observer(function Footer() {

  return (
    <footer className="foot-container">
      <div className="row footer-row footer-container">
        <div className="col-lg-3 offset-lg-1 contact-us">
          <h3 className="mt-lg-0 mt-3">CONTACT US</h3>
          <span className="company-description">
            Phone: <a href="tel:+2348083779882">+2348083779882</a>
          </span>
          <br />
          <span className="company-description">
            Email:{" "}
            <a href="mailto:info@thetruckarena.com">info@thetruckarena.com</a>
          </span>
          <br />
          <span className="company-description">
            Address: 4th Floor, Niger Insurance House 302/304 Ikorodu Road,
            Anthony - Lagos.
          </span>
        </div>

        <div className="col-lg-2 quick_links_container">
          <h3 className="mt-lg-0 mt-3">QUICKLINKS</h3>
          <ul className="quick-links-container">
            <li>
              <Link to="/about-us" className="quick-links">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/services" className="quick-links">
                Services
              </Link>
            </li>
            <li>
              <Link to="/questions" className="quick-links">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* <div className="col-lg-4 newsletter">
          <h3 className="mt-lg-0 mt-3">NEWSLETTER</h3>
          <span className="company-description">
            Subscribe to our newseletter and we will inform you about The Truck
            Arena newest projects and how they benefit your business.
          </span>
          <br /> */}

          {/* <Formik
            initialValues={{ emailAddress: "", error: null }}
            onSubmit={(values) => subscribeNewsLetter(values.emailAddress)}
            validationSchema={Yup.object({
              emailAddress: Yup.string()
                .required("Your email is required")
                .email(),
            })}
          >
            {({ isSubmitting, isValid, dirty }) => ( */}
              {/* <Form className="ui form">
                <CustomTextInput
                  name="emailAddress"
                  placeholder="Enter your email address"
                /> */}

                {/* <Button
                  loading={isSubmitting}
                  content="subscribe"
                  type="submit"
                  disabled={!isValid || !dirty}
                  color="vk"
                  className="official-form-btn footer_btn"
                /> */}
              {/* </Form> */}
            {/* )} */}
          {/* </Formik> */}
        </div>
      {/* </div> */}

      <Divider />

      <div className="footer-row">
        <div className="text-center copy-right-text">
          &copy; {new Date().getFullYear()} The Truck Arena | All Rights
          Reserved
        </div>
      </div>
    </footer>
  );
});

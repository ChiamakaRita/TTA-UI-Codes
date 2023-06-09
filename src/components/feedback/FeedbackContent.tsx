import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import {
  CustomSelect,
  CustomTextArea,
  CustomTextInput,
} from "../shared/custom-input/CustomInputs";
import { feedbackOptionsData } from "../../local-data/shared/feedbackOptionsData";
import { useStore } from "../../api/main/appStore";

export default observer(function FeedbackContent() {
  const { landingStore } = useStore();

  const INITIAL_VALUES = {
    topic: "",
    detail: "",
    senderEmail: "",
    error: null,
  };

  return (
    <div className="shadow-card feedback-content">
      <h3>Send a feedback</h3>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) => landingStore.sendFeedback(values)}
        validationSchema={Yup.object({
          topic: Yup.string().required("Category is required"),
          detail: Yup.string().required("Detail is required"),
          senderEmail: Yup.string()
            .email("Must be a valid email")
            .required("Email is required"),
        })}
      >
        {({ isSubmitting }) => (
          <Form className="ui form">
            <CustomTextInput
              name="senderEmail"
              placeholder="Enter your email address"
              required
              label="Email"
              type="email"
            />

            <CustomSelect
              name="topic"
              label="Category"
              children={
                <>
                  <option defaultValue={""}>Select an option</option>

                  {feedbackOptionsData.map((el) => (
                    <option key={el.value}>{el.text}</option>
                  ))}
                </>
              }
              required
            />

            <CustomTextArea
              name="detail"
              placeholder="Give us a brief detail"
              required
              label="Details"
            />

            <Button
              loading={isSubmitting}
              content="Send"
              type="submit"
              className="official-form-btn"
              color="vk"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
});

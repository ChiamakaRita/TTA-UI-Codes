import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../api/main/appStore";
import { InvestorData } from "../../../../api/models/truck-investment/investor";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";
import ModalDecisionContent from "../../../shared/modal/ModalDecisionContent";

interface Props {
  data: InvestorData;
}

export default observer(function ApproveInvestor({ data }: Props) {
  const { investorStore, commonStore } = useStore();

  return (
    <>
      <h5>Review Application</h5>
      <Formik
        initialValues={{
          name: data.firstName + " " + data.lastName,
          email: data.email,
          dateApplied: data.dateOfApplication.split("T")[0],
          phone: data.phone,
          error: null,
        }}
        onSubmit={() => investorStore.approveInvestor(data.userId)}
        validationSchema={Yup.object({
          name: Yup.string().required(),
          email: Yup.string().required(),
          dateApplied: Yup.string().required(),
        })}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form>
            <CustomTextInput name="name" label="Applicant Name" />

            <CustomTextInput name="email" label="Applicant Email" />

            <CustomTextInput name="phone" label="Applicant Telephone" />

            <CustomTextInput
              name="dateApplied"
              label="Date of Application"
              disabled
            />

            <Button
              content="Send Reply"
              as="a"
              href={`mailto:${data.email}?subject=Truck Investment - Application Response`}
            />

            <Button
              loading={isSubmitting}
              positive
              content="Approve"
              type="submit"
            />
          </Form>
        )}
      </Formik>
      <Button
        negative
        content="Decline Application"
        type="button"
        className="mt-4"
        onClick={() =>
          commonStore.setModalContent(
            <ModalDecisionContent
              actionName={`decline an application from ${data.firstName} ${data.lastName}.`}
              actionCallback={() => investorStore.declineInvestor(data.userId)}
            />
          )
        }
      />
    </>
  );
});

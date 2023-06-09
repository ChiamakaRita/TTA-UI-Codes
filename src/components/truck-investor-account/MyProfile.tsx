import { Form, Formik } from "formik";
import { Button, Divider } from "semantic-ui-react";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { DateOnlyFormat } from "../../helper-functions/sharedFunctions";
import { useStore } from "../../api/main/appStore";
import { CustomTextInput } from "../shared/custom-input/CustomInputs";
import AddBankAccountForm from "./AddBankAccountForm";
import NoResult from "../shared/no-result/NoResult";

export default observer(function MyProfile() {
  const { investorStore, commonStore } = useStore();

  useEffect(() => {
    if (investorStore.currentInvestorProfile === null) {
      (async function getData() {
        await investorStore.getInvestorProfile(+investorStore.investorId!);
      })();
    }
  }, [investorStore, investorStore.investorId]);

  if (investorStore.currentInvestorProfile === null) return <></>;

  const userData = investorStore.currentInvestorProfile;

  return (
    <>
      <div className="p-3 mt-3 shadow-card">
        <div className="d-flex justify-content-between">
          <div>
            <h5>My Profile</h5>
          </div>
          <div>
            <Button
              content="Add Bank Details"
              size="tiny"
              icon="plus"
              onClick={() =>
                commonStore.setModalContent(
                  <AddBankAccountForm investorId={userData.investorData.id} />
                )
              }
            />
          </div>
        </div>
        <Formik
          initialValues={{
            fullName:
              userData.investorData.firstName +
              " " +
              userData.investorData.lastName,
            phone: userData.investorData.phone,
            uniqueCode: userData.investorData.investorCode,
            dateOfRegistration: DateOnlyFormat(
              userData.investorData.dateOfApplication
            ),
          }}
          onSubmit={(values) => console.log("No implementation yet")}
          validationSchema={Yup.object({
            fullName: Yup.string().required(),
            dateOfBirth: Yup.string().required(),
            phone: Yup.string().required(),
            dateOfRegistration: Yup.string().required(),
          })}
        >
          {() => (
            <Form>
              <CustomTextInput name="fullName" label="Full Name" disabled />

              <CustomTextInput
                name="phone"
                label="Mobile Number"
                type="tel"
                disabled
              />

              <CustomTextInput name="uniqueCode" label="Unique Code" disabled />

              <CustomTextInput
                name="dateOfRegistration"
                label="Date of Registration"
                disabled
              />
            </Form>
          )}
        </Formik>
      </div>
      <div className="p-3 mt-3 shadow-card">
        <h5>My Account Detail</h5>
        <Divider />
        {userData.bankDetail.length !== 0 ? (
          userData.bankDetail.map((el, i) => {
            return (
              <div key={i}>
                <p>
                  <b>Name :</b> {el.accountName}
                </p>
                <p>
                  <b>Number :</b> {el.accountNumber}
                </p>
                <p>
                  <b>Bank Name :</b> {el.bankName}
                </p>
              </div>
            );
          })
        ) : (
          <NoResult content="You have not added your bank account details" />
        )}
      </div>
    </>
  );
});

import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import { InvestorData } from "../../../../api/models/truck-investment/investor";
import { CustomSelect } from "../../../shared/custom-input/CustomInputs";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import RevenueAndWithdrawals from "./RevenueAndWithdrawals";

export default observer(function FinanceRecords() {
  const [verifiedInvestors, setVerifiedInvestore] = useState<InvestorData[]>(
    []
  );
  const { investorStore, revenueStore } = useStore();

  useEffect(() => {
    (async function getData() {
      await investorStore.getVerifiedInvestors();
      setVerifiedInvestore(investorStore.verifiedInvestors);
    })();
  }, [investorStore]);

  const handleSubmit = async (investorId: number) => {
    await investorStore.getInvestorById(investorId);
    await revenueStore.getAvailableMonths();
    await revenueStore.getAvailableYears();
  };

  return (
    <>
      <CustomDefaultTabHeading content="Revenue Record" />

      <div className="shadow-card p-3">
        <Formik
          initialValues={{ investorId: "" }}
          onSubmit={(values) => handleSubmit(+values.investorId)}
        >
          {({ isSubmitting }) => (
            <Form>
              <CustomSelect
                label="Select investor"
                name="investorId"
                children={
                  <>
                    <option value={""}>Which investor?</option>

                    {verifiedInvestors.map((el) => (
                      <option
                        key={el.id}
                        value={el.id}
                      >{`${el.firstName} ${el.lastName}`}</option>
                    ))}
                  </>
                }
                required
              />
              <Button
                className="official-form-btn"
                content="Get Finance Records"
                type="submit"
                color="vk"
                loading={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>

      {investorStore.selectedInvestor ? (
        <RevenueAndWithdrawals
          months={revenueStore.availableMonths}
          years={revenueStore.availableYears}
        />
      ) : null}
    </>
  );
});

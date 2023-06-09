import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import { InvestorData } from "../../../../api/models/truck-investment/investor";
import { CustomSelect } from "../../../shared/custom-input/CustomInputs";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import * as Yup from "yup";
import RetrievedInvestorAssets from "./RetrievedInvestorAssets";

export default observer(function InvestorAssets() {
  const { investorStore, assetStore } = useStore();
  const [verifiedInvestors, setVerifiedInvestore] = useState<InvestorData[]>(
    []
  );
  const [selectedInvestor, setSelectedInvestor] = useState<InvestorData>();

  useEffect(() => {
    (async function getData() {
      await investorStore.getVerifiedInvestors();
      setVerifiedInvestore(investorStore.verifiedInvestors);
    })();
  }, [investorStore]);

  const handleGetFleet = async (investorId: number) => {
    const investor = await investorStore.getInvestorById(investorId);
    setSelectedInvestor(investor);
    await assetStore.getAnInvestorFleet(investorId);
  };

  return (
    <>
      <CustomDefaultTabHeading content="Investors Assets" />

      <div className="shadow-card p-3">
        <Formik
          initialValues={{ investorId: "" }}
          onSubmit={(values) => handleGetFleet(+values.investorId)}
          validationSchema={Yup.object({
            investorId: Yup.string().required("This fied is required"),
          })}
        >
          {({ isSubmitting }) => (
            <Form>
              <CustomSelect
                label="Select investor"
                name="investorId"
                children={
                  <>
                    <option value={""}>Which investor's assets?</option>
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
                content="Fetch Assets"
                type="submit"
                color="vk"
                loading={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>

      {assetStore.isAssetFetched && selectedInvestor && (
        <RetrievedInvestorAssets
          investorDetail={selectedInvestor}
          data={assetStore.investorFleet}
        />
      )}
    </>
  );
});

import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import { FleetData } from "../../../../api/models/truck-investment/asset";
import { InvestorData } from "../../../../api/models/truck-investment/investor";
import { NairaFormatter } from "../../../../helper-functions/sharedFunctions";
import {
  CustomTextInput,
  CustomTextArea,
  CustomSelect,
  CustomDatePicker,
} from "../../../shared/custom-input/CustomInputs";

interface Props {
  investor: InvestorData;
}

export default observer(function AddInvestorDebt({ investor }: Props) {
  const { investorDebtStore, assetStore } = useStore();
  const [trucks, setTrucks] = useState<FleetData[]>([]);

  useEffect(() => {
    (async () => {
      setTrucks([]);

      await assetStore.getAnInvestorFleet(investor.id);

      const availableTrucks = assetStore.investorFleet.filter(
        (el) => el.isInMaintenance === false
      );

      setTrucks(availableTrucks);
    })();
  }, [assetStore, investor.id]);

  return (
    <>
      <h5>Create New Debt</h5>

      <Formik
        initialValues={{
          investorId: investor.id,
          description: "",
          truckNumber: "",
          total: 0,
          dateAdded: new Date(),
        }}
        onSubmit={(values, { setErrors }) =>
          investorDebtStore.createInvestorDebt({
            ...values,
            dateAdded: values.dateAdded.toISOString(),
          })
        }
      >
        {({ isSubmitting, values }) => (
          <Form>
            <CustomSelect
              name="truckNumber"
              label="Truck Number"
              children={
                <>
                  <option value={""}>Select truck number</option>
                  {trucks.map((el) => (
                    <option key={el.uniqueId} value={el.truckNumber}>
                      {el.truckNumber}
                    </option>
                  ))}
                </>
              }
              required
            />
            <CustomTextArea
              name="description"
              placeholder="Enter debt description"
              label="Debt description"
              required
            />

            <CustomTextInput
              name="total"
              placeholder="Total cost"
              label="Total cost of debt"
              required
            />

            <CustomDatePicker
              name="dateAdded"
              label="Enter debt date"
              required
            />

            <Button
              loading={isSubmitting}
              content={`Create Debt ${`of ${NairaFormatter(values.total)}`}`}
              type="submit"
              className="official-form-btn"
              color="vk"
            />
          </Form>
        )}
      </Formik>
    </>
  );
});

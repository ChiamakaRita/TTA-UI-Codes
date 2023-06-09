import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";
import * as Yup from "yup";
import { TruckVariables } from "../../../../api/models/price-watch/pricewatch";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";

interface Props {
  currentSizeData?: TruckVariables;
}

export default observer(function TruckVariablesForm({
  currentSizeData,
}: Props) {
  const { pricewatchStore } = useStore();

  return (
    <div>
      <Formik
        initialValues={{
          truckSize: currentSizeData?.truckSize ?? 0,
          cost: currentSizeData?.cost ?? 0,
          dieselConsumption: currentSizeData?.dieselConsumption ?? 0,
          maintenanceCost: currentSizeData?.maintenanceCost ?? 0,
          driverPay: currentSizeData?.driverPay ?? 0,
          adminFees: currentSizeData?.adminFees ?? 0,
        }}
        onSubmit={(values) => pricewatchStore.postTruckVariables(values)}
        validationSchema={Yup.object({
          truckSize: Yup.number().not([0], "field cannot be zero"),
          cost: Yup.number().not([0], "field cannot be zero"),
          dieselConsumption: Yup.number().not([0], "field cannot be zero"),
          maintenanceCost: Yup.number().not([0], "field cannot be zero"),
          driverPay: Yup.number().not([0], "field cannot be zero"),
          adminFees: Yup.number().not([0], "field cannot be zero"),
        })}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <CustomTextInput
              name="truckSize"
              label="Truck Size (tons)"
              type="number"
              required
            />

            <CustomTextInput
              name="cost"
              label="Cost of purchase"
              type="number"
              required
            />

            <CustomTextInput
              name="dieselConsumption"
              label="Diesel usage per Km"
              type="number"
              required
            />
            <CustomTextInput
              name="maintenanceCost"
              label="Cost of maintenance"
              type="number"
              required
            />

            <CustomTextInput
              name="driverPay"
              label="Driver wage per Km"
              type="number"
              required
            />
            <CustomTextInput
              name="adminFees"
              label="Admin Fee"
              type="number"
              required
            />

            <Button
              loading={isSubmitting}
              content={
                currentSizeData
                  ? `Change ${currentSizeData.truckSize} tons Variables`
                  : `Add New Truck`
              }
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

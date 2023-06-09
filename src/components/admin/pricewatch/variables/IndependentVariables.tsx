import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useStore } from "../../../../api/main/appStore";
import { IndependentVariables } from "../../../../api/models/price-watch/pricewatch";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";

interface Props {
  data: IndependentVariables;
}

export default observer(function IndependentVariables({ data }: Props) {
  const { pricewatchStore } = useStore();

  return (
    <>
      <Formik
        initialValues={{
          loadingDays: data.loadingDays,
          offloadingDays: data.offloadingDays,
          delayDays: data.delayDays,
          scrappingPercent: data.scrappingPercent,
          truckUsefulLife: data.truckUsefulLife,
          insurancePercent: data.insurancePercent,
          dieselCost: data.dieselCost,
          gitInsurance: data.gitInsurance,
          profitPercent: data.profitPercent,
          permitLevy: data.permitLevy,
        }}
        onSubmit={(values) => pricewatchStore.postIndependentVariables(values)}
        validationSchema={Yup.object({
          loadingDays: Yup.number().required(),
          offloadingDays: Yup.number().required(),
          delayDays: Yup.number().required(),
          scrappingPercent: Yup.number().required(),
          truckUsefulLife: Yup.number().required(),
          insurancePercent: Yup.number().required(),
          dieselCost: Yup.number().required(),
          profitPercent: Yup.number().required(),
          permitLevy: Yup.number().required(),
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="loadingDays"
              label="Loading days"
              type="number"
              required
            />

            <CustomTextInput
              name="offloadingDays"
              label="Offloading days"
              type="number"
              required
            />

            <CustomTextInput
              name="delayDays"
              label="Waiting delay days"
              type="number"
              required
            />
            <CustomTextInput
              name="scrappingPercent"
              label="Scrapping percentage"
              type="number"
              required
            />
            <CustomTextInput
              name="truckUsefulLife"
              label="Useful life of truck (years)"
              type="number"
              required
            />
            <CustomTextInput
              name="insurancePercent"
              label="Insurance percentage"
              type="number"
              required
            />

            <CustomTextInput
              name="dieselCost"
              label="Diesel Price"
              type="number"
              required
            />
            <CustomTextInput
              name="gitInsurance"
              label="GIT Insurance"
              type="number"
              required
            />
            <CustomTextInput
              name="profitPercent"
              label="Profit percentage"
              type="number"
              required
            />
            <CustomTextInput
              name="permitLevy"
              label="Federal Truck Permit"
              type="number"
              required
            />

            <Button
              loading={isSubmitting}
              content="Change Variables"
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

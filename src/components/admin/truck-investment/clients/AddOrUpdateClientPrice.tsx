import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { InvestorClientPrice } from "../../../../api/models/truck-investment/investorClients";
import { useStore } from "../../../../api/main/appStore";
import {
  CustomDatePicker,
  CustomSelect,
  CustomTextInput,
} from "../../../shared/custom-input/CustomInputs";
import { truckSizesList } from "../../../../local-data/shared/truckSizes";

interface Props {
  currentTarget?: InvestorClientPrice;
  clientId: number;
}

export default observer(function AddOrUpdateClientPrice({
  currentTarget,
  clientId,
}: Props) {
  const { investorClientStore } = useStore();

  return (
    <>
      <h4>{currentTarget ? "Update Price" : "Add New Price"}</h4>
      <Formik
        initialValues={{
          truckSize: currentTarget?.truckSize ?? 0,
          origin: currentTarget?.origin ?? "",
          destination: currentTarget?.destination ?? "",
          price: currentTarget?.price ?? 0,
          effectDate: currentTarget?.effectDate
            ? new Date(currentTarget.effectDate)
            : null,
          shipperId: clientId,
          distance: currentTarget?.distance ?? 999,
        }}
        onSubmit={(values) =>
          currentTarget
            ? investorClientStore.updateInvestorClientPrice({
                ...values,
                id: currentTarget.id,
              })
            : investorClientStore.createInvestorClientPrice(values)
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomSelect
              name="truckSize"
              label="Truck Size"
              children={
                <>
                  <option value={""}>Select truck size</option>
                  {truckSizesList.map((el) => (
                    <option value={el.value} key={el.value}>
                      {el.text}
                    </option>
                  ))}
                </>
              }
              required
            />

            <CustomTextInput
              name="origin"
              placeholder="Enter origin"
              label="Origin"
              required
            />

            <CustomTextInput
              name="destination"
              placeholder="Enter destination"
              label="Destination"
              required
            />

            <CustomTextInput
              name="price"
              placeholder="Enter load price"
              label="Price"
              type="number"
              required
            />

            <CustomDatePicker
              name="effectDate"
              label="Price Effective from"
              required
            />

            <Button
              loading={isSubmitting}
              content="Proceed"
              type="submit"
              color="vk"
              className="official-form-btn"
            />
          </Form>
        )}
      </Formik>
    </>
  );
});

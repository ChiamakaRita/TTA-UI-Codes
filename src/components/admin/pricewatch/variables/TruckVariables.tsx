import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import {
  TruckSize,
  TruckVariables,
} from "../../../../api/models/price-watch/pricewatch";
import { CustomSelect } from "../../../shared/custom-input/CustomInputs";
import TruckVariableForm from "./TruckVariableForm";

interface Props {
  truckSizes: TruckSize[];
}

export default observer(function TruckVariables({ truckSizes }: Props) {
  const { pricewatchStore, commonStore } = useStore();

  const [currentSizeData, setCurrentSizeData] = useState<TruckVariables | null>(
    null
  );

  const handleGetTruckVariables = async (truckSize: number) => {
    const variables = await pricewatchStore.getTruckVariables(truckSize);
    setCurrentSizeData(variables);
  };

  return (
    <>
      <div className="mb-3">
        <div className="d-flex justify-content-end">
          <Button
            size="tiny"
            content="New Truck Variable"
            onClick={() => commonStore.setModalContent(<TruckVariableForm />)}
          />
        </div>

        <Formik
          initialValues={{ truckSize: "" }}
          onSubmit={(values) => handleGetTruckVariables(+values.truckSize)}
        >
          {({ isSubmitting }) => (
            <Form>
              <CustomSelect
                label="Select Truck Size"
                name="truckSize"
                children={
                  <>
                    <option value={""}>Choose a truck size</option>

                    {truckSizes.map((el) => (
                      <option
                        key={el.id}
                        value={el.truckSize}
                      >{`${el.truckSize} tons`}</option>
                    ))}
                  </>
                }
                required
              />
              <Button
                className="official-form-btn"
                content="Get Variables"
                type="submit"
                color="vk"
                loading={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>
      {currentSizeData ? (
        <TruckVariableForm currentSizeData={currentSizeData} />
      ) : null}
    </>
  );
});

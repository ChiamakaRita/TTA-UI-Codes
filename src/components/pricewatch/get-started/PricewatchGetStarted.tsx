import { FieldArray, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import * as Yup from "yup";
import { Button, Divider, Icon } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import {
  Destination,
  Origin,
  RouteIds,
  TruckSize,
} from "../../../api/models/price-watch/pricewatch";
import { dieselFactors } from "../../../local-data/shared/dieselFactors";
import { CustomSelect } from "../../shared/custom-input/CustomInputs";
import "./PricewatchGetStarted.css";

interface Props {
  origins: Origin[];
  truckSizes: TruckSize[];
}

export default observer(function PricewatchGetStarted({
  origins,
  truckSizes,
}: Props) {
  const { commonStore, pricewatchStore } = useStore();
  const [retrievedDestinations, setRetrievedDestinations] = useState<
    Destination[]
  >(pricewatchStore.lastFetchedDestinations);

  const handleGetDestination = async (originId: number) => {
    if (!originId) {
      window.scrollTo(0, 0);
      commonStore.setError("You must first select an origin");
      return;
    }
    setRetrievedDestinations([]);
    const destinations = await pricewatchStore.getDestinationsForPrediction(
      originId
    );
    setRetrievedDestinations(destinations);
  };

  return (
    <div className="shadow-card pricewatch-get-started">
      <h1>Predictive Pricing</h1>

      <p>
        A robust and feature-rich pricing model developed by taking into account
        every relevant market circumstance and truck-related factors.
      </p>

      <Divider />

      <div className="">
        <Formik
          initialValues={{
            truckSize: pricewatchStore.currentPayload?.truckSize ?? "",
            dieselFactor: pricewatchStore.currentPayload?.dieselFactor ?? "",
            routes:
              pricewatchStore.currentPayload?.routes ??
              ([{ originId: 0, destinationId: 0 }] as RouteIds[]),
            customDieselPrice: 0,
          }}
          onSubmit={(values) =>
            pricewatchStore.runPricePrediction({
              ...values,
              truckSize: +values.truckSize,
              dieselFactor: +values.dieselFactor,
              routes: values.routes.map((el) => {
                return {
                  originId: +el.originId,
                  destinationId: +el.destinationId,
                };
              }),
            })
          }
          validationSchema={Yup.object({
            truckSize: Yup.string().required("Truck size is required"),
            dieselFactor: Yup.string().required("Diesel factor is required"),
          })}
        >
          {({ values }) => (
            <Form>
              <div className="base-requirement">
                <h4>Enter Truck Size</h4>
                <CustomSelect
                  name="truckSize"
                  children={
                    <>
                      <option defaultValue={""}>Select a truck size</option>
                      {truckSizes.map((el) => (
                        <option key={el.id} value={el.truckSize}>
                          {el.truckSize} tons
                        </option>
                      ))}
                    </>
                  }
                />
              </div>

              <div className="base-requirement">
                <h4>Diesel Coverage</h4>
                <CustomSelect
                  name="dieselFactor"
                  children={
                    <>
                      <option defaultValue={""}>Select diesel coverage</option>
                      {dieselFactors.map((el) => (
                        <option key={el.value} value={el.value}>
                          {el.text}
                        </option>
                      ))}
                    </>
                  }
                />
              </div>
              <Divider />

              <div>
                <h4>Enter Routes</h4>
                <FieldArray
                  name="routes"
                  render={(arrayHelpers) => (
                    <div>
                      {values.routes.map((route, index) => (
                        <div key={index} className="routes-container">
                          <div className="route-box">
                            <CustomSelect
                              name={`routes[${index}].originId`}
                              children={
                                <>
                                  <option defaultValue={""}>Origin</option>
                                  {origins.map((el, i) => (
                                    <option key={i} value={el.id}>
                                      {el.name}
                                    </option>
                                  ))}
                                </>
                              }
                            />
                          </div>

                          <div>
                            <Icon
                              name="long arrow alternate right"
                              className="arrow-direction"
                            />
                          </div>
                          <div className="route-box">
                            <CustomSelect
                              name={`routes[${index}].destinationId`}
                              children={
                                <>
                                  <option defaultValue={""}>Destination</option>
                                  {retrievedDestinations.map((el, i) => (
                                    <option key={i} value={el.id}>
                                      {el.name}, {el.state}
                                    </option>
                                  ))}
                                </>
                              }
                              onFocus={() =>
                                handleGetDestination(
                                  values.routes[index].originId
                                )
                              }
                            />
                          </div>

                          <button
                            type="button"
                            className="route-remove-btn"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <Icon
                              name="trash alternate outline"
                              className="p-0 m-0"
                            />
                          </button>
                        </div>
                      ))}
                      <button
                        className="expense-add-btn"
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({ originId: 0, destinationId: 0 })
                        }
                      >
                        + Add route
                      </button>
                    </div>
                  )}
                />
              </div>

              <div>
                <Button
                  content="Run Prediction"
                  type="submit"
                  className="official-form-btn"
                  color="vk"
                  icon="chart line"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
});

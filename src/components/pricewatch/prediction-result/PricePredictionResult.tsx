import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Divider, Icon, Popup } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import { PredictedPricing } from "../../../api/models/price-watch/pricewatch";
import { NairaFormatter } from "../../../helper-functions/sharedFunctions";
import { factorName } from "../../../local-data/shared/dieselFactors";
import CustomAccordion from "../../shared/custom-accordion/CustomAccordion";
import { CustomTextInput } from "../../shared/custom-input/CustomInputs";
import SimpleTable from "../../shared/table/SimpleTable";
import { BarChart } from "../charts/Bar";
import "./PricePredictionResult.css";

interface Props {
  data: PredictedPricing;
}

export default observer(function PricePredictionResult({ data }: Props) {
  const { pricewatchStore } = useStore();

  const onBack = () => pricewatchStore.setResultToNull();

  const { independentVariables, truckVariables, prices } = data;

  return (
    <div className="predicted-result">
      <div className="back-btn" onClick={onBack}>
        <Icon name="long arrow alternate left" /> Back
      </div>
      <div className="row">
        <div className="col-md-3 variables-column">
          <h2>Considered Variables</h2>

          <CustomAccordion
            open={true}
            title="Route Based"
            content={
              <>
                <Popup
                  position="top left"
                  content={`The distrance covered from the orign to the destination.`}
                  trigger={<p className="variable-title">Distance</p>}
                  size="tiny"
                />
                <Popup
                  position="top left"
                  content={`The time taken to cover the distrance from the orign to the destination.`}
                  trigger={<p className="variable-title">Lead Time</p>}
                  size="tiny"
                />
              </>
            }
          />

          <CustomAccordion
            open={false}
            title="Shipper Based"
            content={
              <>
                <Popup
                  position="top left"
                  content={`The number of days used to load goods on a truck.`}
                  trigger={<p className="variable-title">Loading Days</p>}
                  size="tiny"
                />
                <Popup
                  position="top left"
                  content={`The number of days used to offload goods on a truck.`}
                  trigger={<p className="variable-title">Offloading Days</p>}
                  size="tiny"
                />
                <Popup
                  position="top left"
                  content={`The destination with the shippers major customers.`}
                  trigger={
                    <p className="variable-title">Destination Preference</p>
                  }
                  size="tiny"
                />
              </>
            }
          />

          <CustomAccordion
            open={false}
            title="Truck Based"
            content={
              <>
                <Popup
                  position="top left"
                  content={`The size of truck required to move the load volume. ${truckVariables.truckSize} tons`}
                  trigger={<p className="variable-title">Truck Size</p>}
                  size="tiny"
                />
                <Popup
                  position="top left"
                  content={`The amount the truck was purchased.`}
                  trigger={
                    <p className="variable-title">Cost of Truck Purchase</p>
                  }
                  size="tiny"
                />
                <Popup
                  position="top left"
                  content={`The ideal period of time the truck is suitable for use.`}
                  trigger={<p className="variable-title">Truck Lifespan</p>}
                  size="tiny"
                />
                <Popup
                  position="top left"
                  content={`The cost of obtaining federal permits for truck operations in the country.`}
                  trigger={
                    <p className="variable-title">Cost of Truck Permits</p>
                  }
                  size="tiny"
                />
                <Popup
                  position="top left"
                  content={`The cost of performing routine maintenance and repairs on the truck.`}
                  trigger={
                    <p className="variable-title">
                      Maintenance &amp; Repair Costs
                    </p>
                  }
                  size="tiny"
                />
                <Popup
                  position="top left"
                  content={`The amount of diesel the truck uses per km in transit to the destination.`}
                  trigger={
                    <p className="variable-title">Diesel Consumption per km</p>
                  }
                  size="tiny"
                />
              </>
            }
          />

          <CustomAccordion
            open={false}
            title="Market Based"
            content={
              <>
                <Popup
                  position="top left"
                  content={`The market cost of diesel per litre.`}
                  trigger={<p className="variable-title">Cost of Diesel</p>}
                  size="tiny"
                />
                <Popup
                  position="top left"
                  content={`The number of days a truck exceeds its estimated lead time due to market/road conditions.`}
                  trigger={<p className="variable-title">Delay Days</p>}
                  size="tiny"
                />
                <Popup
                  position="top left"
                  content={`The amount of trucks available to meet the volume of shipper demand.`}
                  trigger={<p className="variable-title">Truck Scarcity</p>}
                  size="tiny"
                />
              </>
            }
          />

          <CustomAccordion
            open={false}
            title="Service Based"
            content={
              <>
                <Popup
                  position="top left"
                  content={`The amount paid to the driver per trip.`}
                  trigger={<p className="variable-title">Driver's Wage</p>}
                  size="tiny"
                />
                <Popup
                  position="top left"
                  content={`The cost of managing the truck operation.`}
                  trigger={<p className="variable-title">Management Fees</p>}
                  size="tiny"
                />
                <Popup
                  position="top left"
                  content={`The percentage profit generated on the trip for the business.`}
                  trigger={<p className="variable-title">% Profit Margin</p>}
                  size="tiny"
                />
              </>
            }
          />
        </div>
        <div className="col-md-9 result-column">
          <h2>
            Prediction Results (
            <small className="diesel-factor-name">
              {factorName(pricewatchStore.currentPayload?.dieselFactor!)}
            </small>
            )
          </h2>

          <div className="row">
            <div className="col-md-6">
              <div className="p-3 result-table">
                <SimpleTable
                  titles={["Origin", "destination", "price"]}
                  data={prices}
                  tableBodyBuilder={(el, i) => (
                    <tr key={i}>
                      <td>{el.origin}</td>
                      <td>{el.destination}</td>
                      <td>{NairaFormatter(el.price)}</td>
                    </tr>
                  )}
                />
              </div>
            </div>
            <div className="col-md-6">
              <BarChart prices={prices} />
            </div>
          </div>

          <Divider />

          <div>
            <h2>Customize Diesel Price</h2>
            {pricewatchStore.currentPayload?.customDieselPrice ? (
              <p>
                You are currently running this analysis with a custom diesel
                price ={" "}
                <span className="display-6">
                  {NairaFormatter(
                    pricewatchStore.currentPayload?.customDieselPrice
                  )}
                </span>
              </p>
            ) : (
              <p>
                For this prediction, our algorithm has utilized the current
                market diesel price ={" "}
                <span className="display-6">
                  {NairaFormatter(independentVariables.dieselCost)}
                </span>
              </p>
            )}
            <p>
              You can re-run this analysis using a different diesel cost. All
              other variables will remain the same.
            </p>

            <Formik
              initialValues={{
                customDieselPrice: independentVariables.dieselCost,
              }}
              onSubmit={(values) =>
                pricewatchStore.rerunPrediction(values.customDieselPrice)
              }
            >
              {({ values }) => (
                <Form>
                  <div className="base-requirement">
                    <CustomTextInput
                      name="customDieselPrice"
                      placeholder="Enter diesel cost"
                      type="number"
                    />
                  </div>

                  <div>
                    <Button
                      content="Re-Run Prediction"
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
      </div>
    </div>
  );
});

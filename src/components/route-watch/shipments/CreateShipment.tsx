import "./Shipments.css";
import { useState } from "react";
import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { TrackerDetails } from "../../../api/models/route-watch/tracker";
import { useStore } from "../../../api/main/appStore";
import * as CustomInputs from "../../shared/custom-input/CustomInputs";
import { contentCategory } from "../../../local-data/shipment/contentCategory";
import { RouteList } from "../../../api/models/route-watch/routes";
import { ShipperDetails } from "../../../api/models/route-watch/shipper";
import {
  CustomDatePicker,
  CustomTextInput,
} from "../../shared/custom-input/CustomInputs";
import { DriverWithTruck } from "../../../api/models/truck-investment/driver";

interface Props {
  routes: RouteList[];
  shippers: ShipperDetails[];
  driversWithTruck: DriverWithTruck[];
}

export default observer(function AddNewShipment({
  routes,
  shippers,
  driversWithTruck,
}: Props) {
  const [trackers, setTrackers] = useState<TrackerDetails[]>([]);
  const { routeStore, userAccountStore, shipmentStore, commonStore } =
    useStore();
  const [isForInvestorTruck, setIsForInvestorTruck] = useState("");

  const handleGetTrackers = async (routeId: number) => {
    if (!routeId) {
      // Scroll up and display a message to tell the user what to do
      window.scrollTo(0, 0);
      commonStore.setError(
        "You must first select a route to see available trackers"
      );
      return;
    }

    setTrackers([]);
    const trackers = await routeStore.getAvailableTrackers(routeId);

    setTrackers(trackers);
  };

  const INITIAL_VALUES = {
    recipientName: "",
    recipientAddress: "",
    recipientPhone: "",
    price: 9999,
    weight: 30000,
    estimatedDeliveryDate: "",
    routeID: 0,
    trackerID: 0,
    shipperID: 0,
    driverName: "",
    driverPhone: "",
    contentDescription: "",
    contentCategory: "",
    truckNumber: "",
    organisationId: userAccountStore.user?.organisationId!,
  };

  return (
    <div className="p-3 mt-3 shadow-card">
      {userAccountStore.isInHouse && userAccountStore.isAdmin && (
        <div className="for-investor">
          For An Investor ?{" "}
          <select
            className="inline-text-input"
            onChange={(e) => setIsForInvestorTruck(e.target.value)}
          >
            <option value="">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      )}

      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, { resetForm }) => {
          shipmentStore.createShipment(values);
          resetForm({ values: INITIAL_VALUES });
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <h4 className="create-shipment-subtitle">Recipient Details</h4>
            <div className="row">
              <div className="col-md-4">
                <CustomInputs.CustomTextInput
                  name="recipientName"
                  label="Name"
                  placeholder="Enter recipient name"
                  required
                />
              </div>
              <div className="col-md-4">
                <CustomInputs.CustomTextInput
                  name="recipientAddress"
                  label="Address"
                  placeholder="Enter recipient address"
                  required
                />
              </div>
              <div className="col-md-4">
                <CustomInputs.CustomTextInput
                  name="recipientPhone"
                  label="Phone"
                  placeholder="Enter recipient phone number"
                  type="tel"
                  required
                />
              </div>
            </div>

            <h4 className="create-shipment-subtitle">
              Truck &amp; content details
            </h4>
            <div className="row">
              <div className="col-md-4">
                {isForInvestorTruck ? (
                  <CustomInputs.CustomSelect
                    name="truckNumber"
                    label="Select Truck"
                    required
                    children={
                      <>
                        <option value={""}>Enter truck number</option>
                        {driversWithTruck.map((el) => (
                          <option value={el.truckNumber} key={el.id}>
                            {el.truckNumber}
                          </option>
                        ))}
                      </>
                    }
                    onBlurCapture={(e) => {
                      const selected = driversWithTruck.find(
                        (x) => x.truckNumber === e.target.value
                      );
                      if (selected) {
                        values.driverName = selected.driverName;
                        values.driverPhone = selected.driverPhone;
                      }
                    }}
                  />
                ) : (
                  <CustomTextInput
                    name="truckNumber"
                    placeholder="Enter Truck Number"
                    label="Truck Number"
                    required
                  />
                )}
              </div>
              <div className="col-md-4">
                <CustomInputs.CustomSelect
                  name="contentCategory"
                  label="Product Type"
                  required
                  children={
                    <>
                      <option value={""}>Enter Content category</option>
                      {contentCategory.map((el) => (
                        <option value={el.value} key={el.value}>
                          {el.text}
                        </option>
                      ))}
                    </>
                  }
                />
              </div>
              <div className="col-md-4">
                <CustomTextInput
                  name="weight"
                  label="Load weight (kg)"
                  placeholder="Enter total load weight"
                  type="number"
                  required
                />
              </div>
            </div>
            <CustomInputs.CustomTextArea
              name="contentDescription"
              label="Load Description"
              placeholder="Enter Content description"
              required
            />

            <h4 className="create-shipment-subtitle">
              Route &amp; tracking details
            </h4>
            <div className="row">
              <div className="col-md-4">
                <CustomInputs.CustomSelect
                  name="routeID"
                  label="Route Name"
                  onFocus={() => setTrackers([])}
                  children={
                    <>
                      <option value={""}>Select Origin to destination</option>

                      {routes.map((el) => (
                        <option key={el.id} value={el.id}>
                          {el.name}
                        </option>
                      ))}
                    </>
                  }
                  required
                />
              </div>
              <div className="col-md-4">
                <CustomInputs.CustomSelect
                  name="trackerID"
                  label="Tracking Device"
                  onFocus={() => handleGetTrackers(values.routeID)}
                  children={
                    <>
                      <option value={""}>
                        Select a tracker for this shipment
                      </option>
                      {trackers.map((el) => (
                        <option key={el.id} value={el.id}>
                          {el.name}
                        </option>
                      ))}
                    </>
                  }
                  required
                />
              </div>
              <div className="col-md-4">
                <CustomInputs.CustomSelect
                  name="shipperID"
                  label="Shipper Name"
                  children={
                    <>
                      <option value={""}>
                        Select a shipper for this shipment
                      </option>

                      {shippers.map((el) => (
                        <option key={el.id} value={el.id}>
                          {el.name}
                        </option>
                      ))}
                    </>
                  }
                  required
                />
              </div>
            </div>

            <h4 className="create-shipment-subtitle">Driver details</h4>
            <div className="row">
              <div className="col-md-6">
                <CustomTextInput
                  name="driverName"
                  label="Name"
                  placeholder="Enter driver's name"
                  required
                />
              </div>
              <div className="col-md-6">
                <CustomTextInput
                  name="driverPhone"
                  label="Phone"
                  type="tel"
                  placeholder="Enter driver's phone number"
                  required
                />
              </div>
            </div>

            <h4 className="create-shipment-subtitle">Expected delivery date</h4>
            <CustomDatePicker
              name="estimatedDeliveryDate"
              placeholder="Expected delivery date"
            />

            <Button
              loading={isSubmitting}
              className="official-form-btn"
              content="Create"
              type="submit"
              color="vk"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
});

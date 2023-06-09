import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import * as Yup from "yup";
import {
  CustomSelect,
  CustomTextInput,
} from "../../shared/custom-input/CustomInputs";
import { truckSizesList } from "../../../local-data/shared/truckSizes";
import VerifyTruckDetail from "./VerifyTruckDetail";
import { ListItemView } from "../../../api/models/shared";
import { PlaceData } from "../../../api/models/truck-request/place";
import { observer } from "mobx-react-lite";
import {
  getShipperEmail,
  getShipperName,
  getTransporterEmail,
  getTransporterName,
  getTransporterPhone,
  getShipperId,
} from "../../../helper-functions/truckPortalFunctions";
import { MakeTruckAvailablePayload } from "../../../api/models/truck-portal/truckPortal";
import {
  CarrierOrganisation,
  OrganisationData,
} from "../../../api/models/organisation";

interface Props {
  shippers: ListItemView[];
  transporters: CarrierOrganisation[];
  places: PlaceData[];
  organisation: OrganisationData | null;
  isShipper: boolean;
}

export default observer(function ProvideTruck({
  shippers,
  transporters,
  places,
  organisation,
  isShipper,
}: Props) {
  const { commonStore, truckPortalStore } = useStore();

  const INITIAL_VALUES = {
    shipperId: isShipper ? organisation!.id : 0,
    shipperName: isShipper ? organisation!.name : "",
    transporterId: 0,
    transporterName: "",
    driverName: "",
    driverPhone: "",
    destination: "",
    truckNumber: "",
    truckSize: 0,
    shipperEmail: isShipper ? organisation!.contactEmail : "",
    transporterEmail: "",
    transporterPhone: "",
  };

  const payloadObject = (values: MakeTruckAvailablePayload) => {
    return {
      ...values,
      shipperId: isShipper
        ? organisation!.id
        : getShipperId(+values.shipperId, shippers),
      shipperName: isShipper
        ? organisation!.name
        : getShipperName(+values.shipperId, shippers),
      shipperEmail: isShipper
        ? organisation!.contactEmail
        : getShipperEmail(+values.shipperId, shippers),
      transporterName: getTransporterName(+values.transporterId, transporters),
      transporterEmail: getTransporterEmail(
        +values.transporterId,
        transporters
      ),
      transporterPhone: getTransporterPhone(
        +values.transporterId,
        transporters
      ),
    };
  };

  return (
    <>
      <h3 className="available-trucks-title">Truck Registration</h3>
      <p className="available-trucks-des">
        Provide required information to register a truck
      </p>

      <div className="available-trucks-table shadow-card">
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={(values, { resetForm }) => {
            truckPortalStore.makeTruckAvailableToShipper(payloadObject(values));
            resetForm({ values: INITIAL_VALUES });
          }}
          validationSchema={Yup.object({
            truckSize: Yup.number().not([0], "Truck Size is required"),
            transporterId: Yup.number().not(
              [0],
              "Transporter name is required"
            ),
            driverName: Yup.string().required("Driver name is required"),
            driverPhone: Yup.string().required("Driver phone is required"),
            destination: Yup.string().required("Destination is required"),
            truckNumber: Yup.string().required("Truck number is required"),
          })}
        >
          {({ handleSubmit, values }) => (
            <Form>
              {isShipper ? null : (
                <CustomSelect
                  name="shipperId"
                  label="Shipper"
                  type="text"
                  children={
                    <>
                      <option value={0}>select company</option>
                      {shippers.map((el) => {
                        return (
                          <option value={el.id} key={el.id}>
                            {el.name}
                          </option>
                        );
                      })}
                    </>
                  }
                />
              )}

              <CustomSelect
                name="transporterId"
                label="Transporter"
                type="text"
                children={
                  <>
                    <option value={""}>select transporter</option>
                    {transporters.map((el) => {
                      return (
                        <option value={el.id} key={el.id}>
                          {el.name}
                        </option>
                      );
                    })}
                  </>
                }
                required
              />

              <CustomTextInput
                name="driverName"
                placeholder="Enter driver's name"
                label="Driver Name"
                required
              />

              <CustomTextInput
                name="driverPhone"
                placeholder="Enter driver's phone"
                label="Driver Telephone"
                type="tel"
                required
              />

              <CustomSelect
                name="destination"
                label="Destination"
                type="text"
                children={
                  <>
                    <option value={""}>select destination</option>
                    {places.map((el) => {
                      return (
                        <option
                          value={`${el.destinationCity}, ${el.destinationState}`}
                          key={el.id}
                        >
                          {`${el.destinationCity}, ${el.destinationState}`}
                        </option>
                      );
                    })}
                  </>
                }
                required
              />
              <CustomTextInput
                name="truckNumber"
                placeholder="Enter truck number"
                label="Truck Number"
                required
              />

              <CustomSelect
                name="truckSize"
                label="Truck Size"
                type="text"
                children={
                  <>
                    <option value={0}>Select a truck size</option>
                    {truckSizesList.map((el) => {
                      return (
                        <option value={el.value} key={el.value}>
                          {el.text}
                        </option>
                      );
                    })}
                  </>
                }
                required
              />

              <Button
                content="Submit"
                type="button"
                color="vk"
                icon="file alternate outline"
                className="official-form-btn"
                onClick={() =>
                  commonStore.setModalContent(
                    <VerifyTruckDetail
                      submitMethod={handleSubmit}
                      values={payloadObject(values)}
                    />
                  )
                }
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
});

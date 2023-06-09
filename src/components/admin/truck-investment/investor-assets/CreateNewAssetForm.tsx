import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { customHistory } from "../../../..";
import { useStore } from "../../../../api/main/appStore";
import { DriverData } from "../../../../api/models/truck-investment/driver";
import { InvestorData } from "../../../../api/models/truck-investment/investor";
import { toUTCConverter } from "../../../../helper-functions/sharedFunctions";
import { geopoliticalZones } from "../../../../local-data/shared/geopoliticalZones";
import { truckSizesList } from "../../../../local-data/shared/truckSizes";
import { truckTypesList } from "../../../../local-data/shared/truckTypes";
import {
  CustomDatePicker,
  CustomSelect,
  CustomTextInput,
} from "../../../shared/custom-input/CustomInputs";
import "./CreateNewAsset.css";

export default observer(function CreateNewAssetForm() {
  const { driverStore, investorStore, assetStore, commonStore } = useStore();
  const params = useParams();

  const [drivers, setDrivers] = useState<DriverData[]>([]);
  const [investor, setInvestor] = useState<InvestorData | null>(null);

  useEffect(() => {
    if (!params.id) {
      customHistory.push("/admin/truck-investment");
      return;
    }

    (async function getData() {
      const currentInvestor = await investorStore.getInvestorById(+params.id!);

      setInvestor(currentInvestor);
      await driverStore.getAllDrivers();

      setDrivers(driverStore.drivers);
    })();
  }, [driverStore, params.id, investorStore]);

  if (!investor?.id) return <></>;

  const INITIAL_FORM_VALUES = {
    truckType: "",
    truckSize: undefined,
    insuranceType: "Comprehensive",
    insuranceExpiryDate: "",
    isInTransit: false,
    isInMaintenance: false,
    nextMaintenanceDate: "",
    region: "",
    investorId: investor?.id!,
    driverId: 0,
    truckModel: "",
    truckNumber: "",
    driverName: "n/a",
    currentRoute: "n/a",
    goodsLoaded: "n/a",
  };

  return (
    <div className="shadow-card p-3 new-asset-form">
      <span className="new-asset-back" onClick={commonStore.goBack}>
        <Icon name="long arrow alternate left" />
        Back
      </span>

      <h4 className="new-asset-form-title">{`New Truck for ${investor?.firstName} ${investor?.lastName}`}</h4>
      <Formik
        initialValues={INITIAL_FORM_VALUES}
        onSubmit={(values) => {
          const driver = drivers.find((el) => el.id === +values.driverId);
          assetStore.addFleetToAnInvestor({
            ...values,
            driverName: `${driver?.firstName} ${driver?.lastName}`,
            insuranceExpiryDate: toUTCConverter(values.insuranceExpiryDate),
            nextMaintenanceDate: toUTCConverter(values.nextMaintenanceDate),
          });
        }}
      >
        {() => (
          <Form>
            <CustomTextInput
              name="truckNumber"
              placeholder="Enter truck number (eg. KTG514XX)"
              label="Truck Number"
              required
            />

            <CustomSelect
              name="truckSize"
              label="Truck Size"
              children={
                <>
                  <option value={""}>Enter truck size</option>

                  {truckSizesList.map((el) => (
                    <option key={el.value} value={el.value}>
                      {el.text}
                    </option>
                  ))}
                </>
              }
              required
            />

            <CustomTextInput
              name="truckModel"
              placeholder="Enter truck model (eg. IVECO, MAN, MACK)"
              label="Truck Model"
              required
            />

            <CustomSelect
              name="truckType"
              label="Truck Type"
              children={
                <>
                  <option value={""}>Enter truck type size</option>
                  {truckTypesList.map((el) => (
                    <option key={el.value} value={el.value}>
                      {el.text}
                    </option>
                  ))}
                </>
              }
              required
            />

            <CustomSelect
              name="region"
              label="Geographical Region of Operation"
              children={
                <>
                  <option value={""}>Select truck's operating region</option>
                  {geopoliticalZones.map((el) => (
                    <option key={el.value} value={el.value}>
                      {el.text}
                    </option>
                  ))}
                </>
              }
              required
            />

            <CustomSelect
              name="driverId"
              label="Truck Driver"
              children={
                <>
                  <option value={""}>Select a driver for this truck</option>
                  {drivers.map((el) => (
                    <option key={el.uniqueId} value={el.id}>
                      {el.firstName} {el.lastName}
                    </option>
                  ))}
                </>
              }
              required
            />

            <CustomDatePicker
              name="insuranceExpiryDate"
              placeholder="Enter insurance expiry date"
              label="Insurance Expiry Date"
              required
            />

            <CustomDatePicker
              name="nextMaintenanceDate"
              placeholder="Truck's maintenance"
              label="Next Maintenance Date"
              required
            />

            <Button
              content="Create"
              type="submit"
              className="official-form-btn"
              color="vk"
              icon="pencil"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
});

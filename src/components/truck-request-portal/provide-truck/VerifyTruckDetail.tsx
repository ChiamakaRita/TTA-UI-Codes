import { observer } from "mobx-react-lite";
import { Button, Divider } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import { MakeTruckAvailablePayload } from "../../../api/models/truck-portal/truckPortal";

interface Props {
  values: MakeTruckAvailablePayload;
  submitMethod: () => void;
}

export default observer(function VerifyTruckDetail({
  values,
  submitMethod,
}: Props) {
  const { commonStore } = useStore();

  return (
    <div>
      <h4 className="request-modal-title">Verify Details</h4>
      <p>Ensure the details are correct. This action is not reversible!</p>

      <div>
        <div>
          <span className="fw-bold">Shipper ▸</span>{" "}
          {values.shipperName ? (
            values.shipperName
          ) : (
            <i className="text-danger">(You have not selected a shipper)</i>
          )}
        </div>
        <div>
          <span className="fw-bold">Transporter ▸</span>{" "}
          {values.transporterName}
        </div>
        <div>
          <span className="fw-bold">Driver's Name ▸</span> {values.driverName}
        </div>
        <div>
          <span className="fw-bold">Diver's Phone ▸</span> {values.driverPhone}
        </div>
        <div>
          <span className="fw-bold">Destination ▸</span> {values.destination}
        </div>
        <div>
          <span className="fw-bold">Truck Number ▸</span> {values.truckNumber}
        </div>
        <div>
          <span className="fw-bold">Truck Size ▸</span> {values.truckSize} tons
        </div>
        <Divider />
        <div className="d-flex gap-3">
          <Button
            content="Confirm"
            className="official-form-btn"
            color="vk"
            icon="check"
            onClick={submitMethod}
          />

          <Button
            content="Cancel"
            className="official-form-btn"
            color="red"
            icon="times"
            onClick={() => commonStore.setModalVisible(false)}
          />
        </div>
      </div>
    </div>
  );
});

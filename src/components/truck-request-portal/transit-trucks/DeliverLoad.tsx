import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import { TruckPortalData } from "../../../api/models/truck-portal/truckPortal";

interface Props {
  data: TruckPortalData;
}

export default observer(function DeliverLoad({ data }: Props) {
  const { truckPortalStore } = useStore();
  return (
    <div>
      <h4 className="request-modal-title">What's Next ?</h4>
      <p className="request-modal-text">
        By clicking proceed, you confirm that truck {data.truckNumber} has
        delivered its content successfully at {data.destination}. This action
        indicates the end of this trip.
      </p>

      <Button
        content="Proceed"
        type="submit"
        color="vk"
        fluid
        className="available-trucks-btn"
        onClick={() => truckPortalStore.deliverLoad(data.id)}
      />
    </div>
  );
});

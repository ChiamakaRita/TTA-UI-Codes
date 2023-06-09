import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import { TruckPortalData } from "../../../api/models/truck-portal/truckPortal";

interface Props {
  data: TruckPortalData;
}

export default observer(function CompleteLoading({ data }: Props) {
  const { truckPortalStore } = useStore();
  return (
    <div>
      <h4 className="request-modal-title">What's Next ?</h4>
      <p className="request-modal-text">
        Click Proceed to inform {data.transporterName} that {data.truckNumber}{" "}
        has loaded.
      </p>

      <Button
        content="Proceed"
        type="submit"
        color="vk"
        fluid
        className="available-trucks-btn"
        onClick={() => truckPortalStore.loadingTruckCompleted(data.id)}
      />
    </div>
  );
});

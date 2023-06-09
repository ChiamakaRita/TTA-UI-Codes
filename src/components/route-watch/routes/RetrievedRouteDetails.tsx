import { observer } from "mobx-react-lite";
import { Button, Checkbox } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import { RouteDetail } from "../../../api/models/route-watch/routes";
import AddTracker from "./AddTracker";
import ReassignTracker from "./ReassignTracker";
import "./RetrievedRouteDetails.css";

interface Props {
  data: RouteDetail;
}

export default observer(function RetrievedRouteDetails({ data }: Props) {
  const { commonStore } = useStore();

  return (
    <div className="mt-4">
      <h2 className="available-tracker-title">Available Trackers </h2>
      <h3 className="available-tracker-route">
        {data.origin} to {data.destination}
      </h3>
      <p className="fw-bold">Total : {data.trackers.length}</p>

      {data.trackers
        .filter((el) => !el.isActive)
        .map((el) => (
          <div key={el.id} className="shadow-card p-3 my-3">
            <h5>IMIE : {el.imie}</h5>
            <h5>Name: {el.name}</h5>

            <hr />
            <div className="d-flex justify-content-between">
              <div>
                <p className="font-weight-bold">Power</p>
                <Checkbox toggle checked={el.isActive} disabled />
              </div>

              <div className="align-self-end">
                <Button
                  content="Reassign tracker"
                  onClick={() =>
                    commonStore.setModalContent(
                      <ReassignTracker tracker={el} routeId={+data.id} />
                    )
                  }
                />
              </div>
            </div>
          </div>
        ))}

      <Button
        className="official-form-btn"
        content="Add New Tracker"
        color="vk"
        icon="pencil"
        onClick={() =>
          commonStore.setModalContent(<AddTracker routeId={+data.id} />)
        }
      />
    </div>
  );
});

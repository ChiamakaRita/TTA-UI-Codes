import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import { RouteFormatter } from "../../../helper-functions/routeWatchFunctions";
import SimpleTable from "../../shared/table/SimpleTable";
import CreateRouteForm from "./CreateRouteForm";

export default observer(function AllRoutes() {
  const { routeStore, commonStore } = useStore();

  useEffect(() => {
    (async function getRoutes() {
      await routeStore.getAllRoutes();
    })();
  }, [routeStore]);

  return (
    <>
      <div className="shadow-card p-3">
        <SimpleTable
          titles={["origin", "destination"]}
          data={RouteFormatter(routeStore.allRoutes)}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>{el.origin}</td>
              <td>{el.destination}</td>
            </tr>
          )}
        />

        <Button
          content="Add New Route"
          type="submit"
          color="vk"
          icon="plus circle"
          className="official-form-btn"
          onClick={() => commonStore.setModalContent(<CreateRouteForm />)}
        />
      </div>
    </>
  );
});

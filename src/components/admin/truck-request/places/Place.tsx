import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../../../shared/table/SimpleTable";
import CreateOrUpdatePlace from "./CreateOrUpdatePlace";

export default observer(function Place() {
  const { placeStore, commonStore } = useStore();

  useEffect(() => {
    if (placeStore.places.length === 0) {
      (async function getData() {
        await placeStore.getAllPlaces();
      })();
    }
  }, [placeStore]);

  return (
    <>
      <CustomDefaultTabHeading content="Destinations Management" />
      <div className="shadow-card p-3">
        <SimpleTable
          titles={["state", "location", "lead time", "distance", ""]}
          data={placeStore.places}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>{el.destinationState}</td>
              <td>{el.destinationCity}</td>
              <td>{el.leadtime} days</td>
              <td>{el.distance} Km</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    commonStore.setModalContent(
                      <CreateOrUpdatePlace placeData={el} />
                    )
                  }
                >
                  Edit
                </button>{" "}
                &nbsp;&nbsp;
                <button className="btn btn-danger btn-sm" disabled>
                  Remove
                </button>
              </td>
            </tr>
          )}
        />

        <Button
          content="Add New Destination"
          type="submit"
          color="vk"
          icon="plus circle"
          className="official-form-btn"
          onClick={() =>
            commonStore.setModalContent(
              <CreateOrUpdatePlace placeData={null} />
            )
          }
        />
      </div>
    </>
  );
});

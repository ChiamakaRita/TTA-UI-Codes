import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { customHistory } from "../../..";
import { TruckUpdateData } from "../../../api/models/truck-portal/truckPortal";
import { DateOnlyFormat } from "../../../helper-functions/sharedFunctions";
import SimpleTable from "../../shared/table/SimpleTable";

interface Props {
  data: TruckUpdateData[];
}

export default observer(function TruckUpdateList({ data }: Props) {
  return (
    <div>
      <SimpleTable
        titles={[
          "Truck No.",
          "origin",
          "destination",
          "current location",
          "distance to destination",
          "as at",
          "",
        ]}
        data={data}
        tableBodyBuilder={(el) => (
          <tr key={el.id}>
            <td>{el.truckNumber}</td>
            <td>{el.origin}</td>
            <td>{el.destination}</td>
            <td>{el.currentLocation}</td>
            <td>{el.remainingDistance} Km</td>
            <td>{DateOnlyFormat(el.dateAdded)}</td>
            <td>
              <Button
                content="Click to see timelines"
                size="tiny"
                color="vk"
                icon="clock"
                onClick={() =>
                  customHistory.push(
                    "/dashboard/route-watch-analytics/truck-request-portal/truck-update-timelines",
                    {
                      data: JSON.stringify(el),
                    }
                  )
                }
              />
            </td>
          </tr>
        )}
      />
    </div>
  );
});

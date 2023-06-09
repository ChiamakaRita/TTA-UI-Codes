import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import ModalDecisionContent from "../../../shared/modal/ModalDecisionContent";
import SimpleTable from "../../../shared/table/SimpleTable";
import AddOrEditDriver from "./AddOrEditDriver";
import DriverChangingForm from "./DriverChangingForm";
import "./Drivers.css";
import SwitchDriverForm from "./SwitchDriverForm";

export default observer(function Drivers() {
  const { driverStore, commonStore } = useStore();

  useEffect(() => {
    (async function getData() {
      await driverStore.getAllDrivers();
    })();
  }, [driverStore]);

  return (
    <>
      <CustomDefaultTabHeading content="Truck Drivers" />

      <div className="shadow-card p-3">
        <div className="truck-driver">
          <Button
            content="Switch truck drivers"
            size="tiny"
            icon="arrows alternate horizontal"
            color="teal"
            onClick={() =>
              commonStore.setModalContent(
                <SwitchDriverForm data={driverStore.drivers} />
              )
            }
          />

          <Button
            content="Replace truck driver"
            size="tiny"
            icon="street view"
            onClick={() =>
              commonStore.setModalContent(
                <DriverChangingForm data={driverStore.drivers} />
              )
            }
          />
        </div>

        <SimpleTable
          titles={["Name", "Phone", "ID Type", "ID Number", ""]}
          data={driverStore.drivers}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>
                {el.firstName} {el.lastName}
              </td>
              <td>{el.phone}</td>
              <td>{el.identificationType}</td>
              <td>{el.identificationNumber}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    commonStore.setModalContent(
                      <AddOrEditDriver currentDriver={el} />
                    )
                  }
                >
                  Edit
                </button>{" "}
                &nbsp;&nbsp;
                <button
                  className="btn btn-danger btn-sm "
                  onClick={() =>
                    commonStore.setModalContent(
                      <ModalDecisionContent
                        actionName={`delete ${el.firstName} ${el.lastName}`}
                        actionCallback={() => driverStore.deleteDriver(el.id)}
                      />
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          )}
        />

        <Button
          content="Add New Driver"
          color="vk"
          className=" official-form-btn"
          onClick={() =>
            commonStore.setModalContent(
              <AddOrEditDriver currentDriver={null} />
            )
          }
        />
      </div>
    </>
  );
});

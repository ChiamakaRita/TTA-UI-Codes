import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import CustomDefaultTabHeading from "../../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../../shared/table/SimpleTable";
import CreateShipperForm from "./CreateShipperForm";

export default observer(function Transporters() {
  const { commonStore, shipperStore } = useStore();

  useEffect(() => {
    (async function getShippers() {
      await shipperStore.getAllShippers();
    })();
  }, [shipperStore]);

  return (
    <>
      <CustomDefaultTabHeading content="My Shippers" />

      <div className="shadow-card p-3">
        <SimpleTable
          titles={["name", "contact email", "phone", "address"]}
          data={shipperStore.allShippers}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>{el.name}</td>
              <td>{el.contactEmail}</td>
              <td>{el.phone}</td>
              <td>{el.officeAddress}</td>
            </tr>
          )}
        />

        <Button
          content="Add New Shipper"
          type="submit"
          color="vk"
          icon="plus circle"
          className="official-form-btn"
          onClick={() => commonStore.setModalContent(<CreateShipperForm />)}
        />
      </div>
    </>
  );
});

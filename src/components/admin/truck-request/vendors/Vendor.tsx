import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import ModalDecisionContent from "../../../shared/modal/ModalDecisionContent";
import SimpleTable from "../../../shared/table/SimpleTable";
import CreateOrUpdateVendor from "./CreateOrUpdateVendor";

export default observer(function Vendor() {
  const { vendorStore, commonStore } = useStore();

  useEffect(() => {
    if (vendorStore.vendors.length === 0) {
      (async function getData() {
        await vendorStore.getAllVendors();
      })();
    }
  }, [vendorStore]);

  return (
    <>
      <CustomDefaultTabHeading content="Vendors Management" />
      <div className="shadow-card p-3">
        <SimpleTable
          titles={["business", "preferred name", "email", "phone", ""]}
          data={vendorStore.vendors}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>{el.businessName}</td>
              <td>{el.preferredName}</td>
              <td>{el.contactEmail}</td>
              <td>{el.phone}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    commonStore.setModalContent(
                      <CreateOrUpdateVendor vendorData={el} />
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
                        actionName={`remove ${el.preferredName}`}
                        actionCallback={() => vendorStore.deleteVendor(el)}
                      />
                    )
                  }
                >
                  Remove
                </button>
              </td>
            </tr>
          )}
        />

        <Button
          content="Add New Vendor"
          type="submit"
          color="vk"
          icon="plus circle"
          className="official-form-btn"
          onClick={() =>
            commonStore.setModalContent(
              <CreateOrUpdateVendor vendorData={null} />
            )
          }
        />
      </div>
    </>
  );
});

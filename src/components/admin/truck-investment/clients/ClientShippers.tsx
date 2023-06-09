import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../../../shared/table/SimpleTable";
import CreateClientForm from "./CreateClientForm";

export default observer(function ClientShippers() {
  const { investorClientStore, commonStore } = useStore();

  useEffect(() => {
    if (investorClientStore.investorClients.length === 0) {
      (async function getData() {
        await investorClientStore.getInvestorClients();
      })();
    }
  }, [investorClientStore]);

  return (
    <>
      <CustomDefaultTabHeading content="Investor's Clients" />

      <div className="shadow-card p-3 mt-3">
        <SimpleTable
          titles={["name", "address", "type of product", ""]}
          data={investorClientStore.investorClients}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>{el.name}</td>
              <td>{el.address}</td>
              <td>{el.productCategory}</td>
              <td>
                <Button
                  content="View Price List"
                  as={Link}
                  to={`/admin/truck-investment/client-price/${el.id}`}
                  size="mini"
                />
              </td>
            </tr>
          )}
        />

        <Button
          content="Add New Client"
          type="submit"
          color="vk"
          icon="plus circle"
          className="official-form-btn"
          onClick={() => commonStore.setModalContent(<CreateClientForm />)}
        />
      </div>
    </>
  );
});

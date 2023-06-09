import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { customHistory } from "../../../..";
import { useStore } from "../../../../api/main/appStore";
import { InvestorClient } from "../../../../api/models/truck-investment/investorClients";
import {
  DateOnlyFormat,
  NairaFormatter,
} from "../../../../helper-functions/sharedFunctions";
import Header from "../../../shared/header/Header";
import SimpleTable from "../../../shared/table/SimpleTable";
import AddOrUpdateClientPrice from "./AddOrUpdateClientPrice";

export default observer(function ClientPrices() {
  const { investorClientStore, commonStore } = useStore();
  const [investorClient, setInvestorClient] = useState<InvestorClient>();

  const params = useParams();

  useEffect(() => {
    if (!params.id) {
      customHistory.push("/admin/truck-investment");
      return;
    }

    (async function getData() {
      // This is incase a user refreshes this page and loses current state being maintained
      if (investorClientStore.investorClients.length === 0) {
        await investorClientStore.getInvestorClients();
      }

      await investorClientStore.getInvestorClientPrices(+params.id!);
      const currentInvestor = investorClientStore.investorClients.find(
        (el) => el.id === +params.id!
      );
      setInvestorClient(currentInvestor);
    })();
  }, [params.id, investorClientStore]);

  if (!investorClient) return <></>;

  return (
    <>
      <Header />

      <div className="shadow-card p-3 mt-3 mx-3">
        <h5 className="text-secondary">{investorClient.name}'s Price List</h5>

        <SimpleTable
          titles={[
            "Truck size (tons)",
            "origin",
            "destination",
            "load price",
            "effective from",
            "",
          ]}
          data={investorClientStore.investorClientPrices}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>{el.truckSize}</td>
              <td>{el.origin}</td>
              <td>{el.destination}</td>
              <td>{NairaFormatter(el.price)}</td>
              <td>{DateOnlyFormat(el.effectDate)}</td>
              <td>
                <Button
                  content="Update Price"
                  onClick={() =>
                    commonStore.setModalContent(
                      <AddOrUpdateClientPrice
                        currentTarget={el}
                        clientId={investorClient.id}
                      />
                    )
                  }
                  size="tiny"
                />
              </td>
            </tr>
          )}
        />

        <Button
          content="Add New Price"
          className=" official-form-btn"
          color="vk"
          onClick={() =>
            commonStore.setModalContent(
              <AddOrUpdateClientPrice clientId={investorClient.id} />
            )
          }
        />
      </div>
    </>
  );
});

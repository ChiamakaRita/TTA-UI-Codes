import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../../api/main/appStore";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import CreateInvestorShipment from "./CreateInvestorShipment";

export default observer(function InvestmentShipment() {
  const { investorStore, investorClientStore } = useStore();

  useEffect(() => {
    (async function getData() {
      await investorStore.getVerifiedInvestors();
      await investorClientStore.getInvestorClients();
    })();
  }, [investorStore, investorClientStore]);

  return (
    <>
      <CustomDefaultTabHeading content="Shipment for Investors" />

      <CreateInvestorShipment
        verifiedInvestors={investorStore.verifiedInvestors}
        investorClients={investorClientStore.investorClients}
      />
    </>
  );
});

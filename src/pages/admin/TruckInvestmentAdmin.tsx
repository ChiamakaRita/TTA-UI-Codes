import { Icon } from "semantic-ui-react";
import ClientShippers from "../../components/admin/truck-investment/clients/ClientShippers";
import RevenueConfirmation from "../../components/admin/truck-investment/revenue-confirm/RevenueConfirmation";
import Drivers from "../../components/admin/truck-investment/drivers/Drivers";
import InvestorAssets from "../../components/admin/truck-investment/investor-assets/InvestorAssets";
import PayRequests from "../../components/admin/truck-investment/pay-requests/PayRequests";
import PendingInvestors from "../../components/admin/truck-investment/pending-investors/PendingInvestors";
import InvestmentShipment from "../../components/admin/truck-investment/shipments/InvestmentShipment";
import VerifiedInvestors from "../../components/admin/truck-investment/verified-investors/VerifiedInvestors";
import Header from "../../components/shared/header/Header";
import CustomVerticalTab from "../../components/shared/vertical-tab/CustomVerticalTab";
import MakeReturnTrip from "../../components/admin/truck-investment/return-trips/MakeReturnTrip";
import FinanceRecords from "../../components/admin/truck-investment/finance-records/FinanceRecords";
import InvestorDebts from "../../components/admin/truck-investment/investor-debts/InvestorDebts";

export default function TruckInvestmentAdmin() {
  return (
    <>
      <Header />
      <CustomVerticalTab
        tabs={[
          { icon: <Icon name="ship" />, text: "Shipments" },
          { icon: <Icon name="repeat" />, text: "Add Return Trips" },
          {
            icon: <Icon name="calendar check" />,
            text: "Revenue Confirmation",
          },
          { icon: <Icon name="handshake outline" />, text: "Clients" },

          { icon: <Icon name="money" />, text: "Revenue Record" },
          { icon: <Icon name="sticky note" />, text: "Debts" },
          { icon: <Icon name="street view" />, text: "Drivers" },
          { icon: <Icon name="amazon pay" />, text: "Pay Requests" },
          { icon: <Icon name="truck" />, text: "Assets" },
          { icon: <Icon name="wait" />, text: "Pending" },
          { icon: <Icon name="checkmark" />, text: "Verified" },
        ]}
        panels={[
          <InvestmentShipment />,
          <MakeReturnTrip />,
          <RevenueConfirmation />,
          <ClientShippers />,
          <FinanceRecords />,
          <InvestorDebts />,
          <Drivers />,
          <PayRequests />,
          <InvestorAssets />,
          <PendingInvestors />,
          <VerifiedInvestors />,
        ]}
      />
    </>
  );
}

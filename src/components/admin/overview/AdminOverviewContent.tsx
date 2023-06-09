import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import "./AdminOverviewContent.css";
import ContentLinkCard from "./content-links/ContentLinkCard";

export default observer(function AdminOverviewContent() {
  const { userAccountStore } = useStore();
  const myName = `${userAccountStore.user?.firstName} ${userAccountStore.user?.lastName}`;

  return (
    <div className="admin-bg">
      <div className="admin-content-bg shadow-card">
        <h2>Welcome, {myName}</h2>
        <h6>Administrator</h6>
        <hr />

        <div className="admin-content-cards">
          <ContentLinkCard
            name="Truck Request"
            to="/admin/truck-request"
            icon={<Icon name="truck" />}
          />
          <ContentLinkCard
            name="Pricewatch Analytics"
            to="/admin/pricewatch"
            icon={<Icon name="dollar" />}
          />
          <ContentLinkCard
            name="Truck Investment"
            to="/admin/truck-investment"
            icon={<Icon name="money" />}
          />
          <ContentLinkCard
            name="Market Outlook"
            to="/admin/market-outlook"
            icon={<Icon name="th" />}
          />
        </div>
      </div>
    </div>
  );
});

import { observer } from "mobx-react-lite";
import { Divider } from "semantic-ui-react";
import { useStore } from "../../api/main/appStore";
import ProductLink from "../dashboard/templates/ProductLink";
import "./RouteWatchOverview.css";

export default observer(function RouteWatchOverview() {
  const { userAccountStore, organisationStore } = useStore();

  const isCarrier: boolean = organisationStore.isCarrier;

  return (
    <div className="route-watch-overview">
      <h1 className="name">Routewatch Analytics</h1>

      <Divider />

      <div className="features">
        <ProductLink
          to={
            isCarrier
              ? "/dashboard/route-watch-analytics/transporter-truck-manager"
              : "/dashboard/route-watch-analytics/truck-request-portal"
          }
          name="Truck Manager"
          imageName="location-symbol.png"
          bgColor="rgba(34, 47, 62,1.0)"
          description="Truck Manager is designed to eliminate daily phone calls by Logistics Managers requesting truck location update from transporters."
          noIcon={true}
        />

        {userAccountStore.isInHouse ? (
          <ProductLink
            to="/dashboard/route-watch-analytics/shipment-tracking"
            name="Shipment Tracking"
            imageName="location-symbol.png"
            bgColor="#2d61d2"
            description=""
            noIcon={true}
          />
        ) : null}
      </div>
    </div>
  );
});

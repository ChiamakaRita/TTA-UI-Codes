import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import ProductLink from "./templates/ProductLink";

export default observer(function DashboardContent() {
  const { userAccountStore, organisationStore } = useStore();

  return (
    <div className="shadow-card dashboard-content">
      <h3>Products</h3>

      <div className="dashboard-subscriptions">
        <ProductLink
          to="/dashboard/route-watch-analytics"
          name="routewatch analytics"
          imageName="location-symbol.png"
          bgColor="#2d61d2"
          description="RouteWatch analytics helps you stay ahead with what is happening on the road. It gives insight on routes with high truck demand and predicts where demand will likely move to in the next 6 months. "
        />
        <ProductLink
          to="/dashboard/price-watch-analytics"
          name="pricewatch analytics"
          imageName="naira-symbol.png"
          bgColor="#012983"
          description="Real-time haulage rates in the Nigerian market. This platform uses the best algorithm and pricing model, which took into account all significant market factors affecting the Nigerian haulage industry."
        />

        {userAccountStore.isInvestor ? (
          <ProductLink
            to="/dashboard/truck-investment"
            name="truck investor account"
            imageName="investment-symbol.png"
            bgColor="#767678"
            description="TIA gives you a 360-degree view of your asset and how it is performing in real-time "
          />
        ) : (
          <ProductLink
            to="/dashboard/investor-application"
            name="Become a truck investor"
            imageName="investment-symbol.png"
            bgColor="#767678"
            description="Investing in truck and building a large fleet on our platform is easy. Complete the form and we will contact you immediately to discuss"
          />
        )}

        {userAccountStore.isInHouse || organisationStore.isShipper ? (
          <ProductLink
            to="/dashboard/truck-provider"
            name="truck registry"
            imageName="naira-symbol.png"
            bgColor="rgba(44, 44, 84,1.0)"
            description="Shippers are waiting for trucks to be available for them. Make trucks available now!"
            noIcon={true}
          />
        ) : null}
      </div>
    </div>
  );
});

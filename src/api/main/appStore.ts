import { createContext, useContext } from "react";
import { CommonStore } from "../storeCollection/commonStore";
import { LandingStore } from "../storeCollection/home/landingStore";
import { MarketOutlookStore } from "../storeCollection/market-outlook/marketOutlookStore";
import { OrganisationStore } from "../storeCollection/organisationStore";
import { PricewatchStore } from "../storeCollection/price-watch/pricewatchStore";
import RouteStore from "../storeCollection/route-watch/routesStore";
import { ShipmentStore } from "../storeCollection/route-watch/shipmentStore";
import ShipperStore from "../storeCollection/route-watch/shipperStore";
import { ThhExpenseStore } from "../storeCollection/thh-expense/thhExpenseStore";
import { AssetStore } from "../storeCollection/truck-investment/AssetStore";
import { DriverStore } from "../storeCollection/truck-investment/DriverStore";
import { InvestorClientStore } from "../storeCollection/truck-investment/InvestorClientStore";
import { InvestorDebtStore } from "../storeCollection/truck-investment/investorDebtStore";
import { InvestorStore } from "../storeCollection/truck-investment/InvestorStore";
import { PaymentStore } from "../storeCollection/truck-investment/PaymentStore";
import RevenueStore from "../storeCollection/truck-investment/revenueStore";
import { TruckPortalStore } from "../storeCollection/truck-portal/truckPortalStore";
import { CompanyStore } from "../storeCollection/truck-request/companyStore";
import { PlaceStore } from "../storeCollection/truck-request/placeStore";
import { VendorStore } from "../storeCollection/truck-request/vendorStore";
import { UserAccountStore } from "../storeCollection/userAccountStore";

interface Store {
  commonStore: CommonStore;
  userAccountStore: UserAccountStore;
  organisationStore: OrganisationStore;

  companyStore: CompanyStore;
  placeStore: PlaceStore;
  vendorStore: VendorStore;

  assetStore: AssetStore;
  driverStore: DriverStore;
  investorStore: InvestorStore;
  paymentStore: PaymentStore;
  investorClientStore: InvestorClientStore;
  revenueStore: RevenueStore;
  investorDebtStore: InvestorDebtStore;

  pricewatchStore: PricewatchStore;

  shipperStore: ShipperStore;
  routeStore: RouteStore;
  shipmentStore: ShipmentStore;

  marketOutlookStore: MarketOutlookStore;

  landingStore: LandingStore;

  thhExpenseStore: ThhExpenseStore;

  truckPortalStore: TruckPortalStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  userAccountStore: new UserAccountStore(),
  organisationStore: new OrganisationStore(),

  companyStore: new CompanyStore(),
  placeStore: new PlaceStore(),
  vendorStore: new VendorStore(),

  assetStore: new AssetStore(),
  driverStore: new DriverStore(),
  investorStore: new InvestorStore(),
  paymentStore: new PaymentStore(),
  investorClientStore: new InvestorClientStore(),
  revenueStore: new RevenueStore(),
  investorDebtStore: new InvestorDebtStore(),

  pricewatchStore: new PricewatchStore(),

  shipperStore: new ShipperStore(),
  routeStore: new RouteStore(),
  shipmentStore: new ShipmentStore(),

  marketOutlookStore: new MarketOutlookStore(),

  landingStore: new LandingStore(),

  thhExpenseStore: new ThhExpenseStore(),

  truckPortalStore: new TruckPortalStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}

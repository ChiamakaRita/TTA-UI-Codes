import { Landing } from "../endpoints/home/landingEndpoint";
import { MarketOutlook } from "../endpoints/market-outlook/marketOutlookEndpoint";
import { Organisation } from "../endpoints/organisation/organisationEndpoint";
import { Pricewatch } from "../endpoints/price-watch/pricewatchEndpoint";
import { Routes } from "../endpoints/route-watch/routeEndpoints";
import { Shipment } from "../endpoints/route-watch/shipmentEndpoints";
import { Shippers } from "../endpoints/route-watch/shipperEndpoints";
import { Trackers } from "../endpoints/route-watch/trackerEndpoints";
import { ThhExpense } from "../endpoints/thh-expense/expenseEndpoints";
import { Assets } from "../endpoints/truck-investment/assetEndpoint";
import { Driver } from "../endpoints/truck-investment/driverEndpoints";
import { InvestorClients } from "../endpoints/truck-investment/investorClientsEndpoints";
import { InvestorDebt } from "../endpoints/truck-investment/investorDebtEndpoint";
import { Investor } from "../endpoints/truck-investment/investorEndpoint";
import { Payment } from "../endpoints/truck-investment/paymentEndpoint";
import { Revenue } from "../endpoints/truck-investment/revenueEndpoints";
import { TruckPortal } from "../endpoints/truck-portal/truckPortalEndpoint";
import { Company } from "../endpoints/truck-request/companyEndpoint";
import { Place } from "../endpoints/truck-request/placeEndpoint";
import { Vendor } from "../endpoints/truck-request/vendorEndpoint";
import { UserAccount } from "../endpoints/userAccountEndpoint";

const agent = {
  UserAccount: UserAccount,
  Organisation: Organisation,

  Company: Company,
  Place: Place,
  Vendor: Vendor,

  Asset: Assets,
  Driver: Driver,
  Investor: Investor,
  Payment: Payment,
  InvestorClients: InvestorClients,
  Revenue: Revenue,
  InvestorDebt: InvestorDebt,

  Pricewatch: Pricewatch,

  Shippers: Shippers,
  Routes: Routes,
  Trackers: Trackers,
  Shipment: Shipment,

  MarketOutlook: MarketOutlook,

  Landing: Landing,

  ThhExpense: ThhExpense,

  TruckPortal: TruckPortal,
};

export default agent;

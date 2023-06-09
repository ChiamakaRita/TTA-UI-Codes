import { observer } from "mobx-react-lite";
import { TopTruckRequestModel } from "../../api/models/home/landingInterfaces";
import { MarketOutlookData } from "../../api/models/market-outlook/marketOutlook";
import "./css/LandingFirstView.css";
import TruckWeeklyInfo from "./TruckWeeklyInfo";

interface Props {
  topTruckRequests: TopTruckRequestModel[];
  marketOutlookArticles: MarketOutlookData[];
}

export default observer(function LandingFirstView({
  topTruckRequests,
  marketOutlookArticles,
}: Props) {
  return (
    <div className="landing-first-view_box">
      <TruckWeeklyInfo
        topTruckRequests={topTruckRequests}
        marketOutlookArticles={marketOutlookArticles}
      />
    </div>
  );
});

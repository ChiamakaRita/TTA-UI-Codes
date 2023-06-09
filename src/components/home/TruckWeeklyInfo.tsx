import { observer } from "mobx-react-lite";
import { TopTruckRequestModel } from "../../api/models/home/landingInterfaces";
import { MarketOutlookData } from "../../api/models/market-outlook/marketOutlook";
import { MonthDayYearText } from "../../helper-functions/sharedFunctions";
import MarketOutlookComponent from "./MarketOutlookComponent";

interface Props {
  topTruckRequests: TopTruckRequestModel[];
  marketOutlookArticles: MarketOutlookData[];
}

export default observer(function TruckWeeklyInfo({
  topTruckRequests,
  marketOutlookArticles,
}: Props) {
  const now = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(now.getDate() - 7);

  const takeDestination = (input: string) => input.split(",")[0];

  return (
    <div className="truck-weekly_box">
      <div className="truck-weekly_box-left">
        <h1 className="truck-weekly_box-heading">Truck Watch Weekly</h1>
        <p>
          {MonthDayYearText(lastWeek)} to {MonthDayYearText(now)}
        </p>

        <div className="table-responsive">
          <table className="table table-borderless truck-weekly_table">
            <thead className="truck-weekly_table-head">
              <tr>
                <th>Origin</th>
                <th>Destination</th>
                <th>No. of Requests</th>
                <th>Avg. truck size</th>
              </tr>
            </thead>

            <tbody>
              {topTruckRequests.map((data) => (
                <tr className="truck-weekly_table-row" key={data.destination}>
                  <td>Lagos</td>
                  <td>{takeDestination(data.destination)}</td>
                  <td>{data.numberOfRequest}</td>
                  <td>
                    {new Intl.NumberFormat("en-GB").format(data.avgTruckSize)}{" "}
                    tons
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="truck-weekly_box-right">
        <h2 className="truck-weekly_box-heading">Market Outlook</h2>
        <MarketOutlookComponent newsArticle={marketOutlookArticles} />
      </div>
    </div>
  );
});

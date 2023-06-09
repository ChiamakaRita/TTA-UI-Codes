import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { customHistory } from "../..";
import { MarketOutlookData } from "../../api/models/market-outlook/marketOutlook";
import "./css/TruckWeeklyInfo.css";

interface Props {
  newsArticle: MarketOutlookData[];
}

let interval_counter = 0;

export default observer(function MarketOutlookComponent({
  newsArticle,
}: Props) {
  const [currentNews, setCurrentNews] = useState<MarketOutlookData>(
    newsArticle[0]
  );

  useEffect(() => {
    const timeId = setInterval(() => {
      if (interval_counter >= newsArticle.length) {
        interval_counter = 0;
      }
      setCurrentNews(newsArticle[interval_counter]);
      interval_counter++;
    }, 3500);
    return () => clearInterval(timeId);
  }, [newsArticle]);

  return (
    <>
      {currentNews && (
        <>
          <p className="market-outlook-heading">{currentNews.title}</p>
          <span
            className="truck-weekly_box-right-btn"
            onClick={() =>
              customHistory.push(`/market-outlook/${currentNews.id}`)
            }
          >
            Learn More
          </span>
        </>
      )}
    </>
  );
});

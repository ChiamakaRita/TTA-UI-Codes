import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import parse from "html-react-parser";
import "./NewsPageContent.css";
import { MarketOutlookData } from "../../api/models/market-outlook/marketOutlook";
import { useStore } from "../../api/main/appStore";
import { DateOnlyFormat } from "../../helper-functions/sharedFunctions";

interface Props {
  newsId: number;
  activeNewsArticles: MarketOutlookData[];
}
export default observer(function NewsPageContent({
  newsId,
  activeNewsArticles,
}: Props) {
  const { marketOutlookStore } = useStore();

  useEffect(() => {
    (async function getData() {
      await marketOutlookStore.getMarketOutlook(newsId);
    })();
  }, [newsId, marketOutlookStore]);

  if (!marketOutlookStore.currentNewsArticle) return <></>;
  const data = marketOutlookStore.currentNewsArticle;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8">
          <>
            <h2 className="market-news-heading">{data.title}</h2>
            <small className="text-secondary">
              {DateOnlyFormat(data.created)}
            </small>
            {parse(`<div className="mt-2 market-news-body">
      ${data.content.replaceAll("\n", "<br/>")}
      </div>`)}
          </>
        </div>

        <div className="col-md-4 p-2 mt-4 mt-md-0">
          <h3 className="more-news-title">More News</h3>

          {activeNewsArticles
            .filter((el) => el.id !== data.id)
            .map((el, index) => (
              <h4
                key={index}
                className="more-news-links pointer-cursor"
                onClick={() => marketOutlookStore.setCurrentArticle(el)}
              >
                {el.title}
              </h4>
            ))}
        </div>
      </div>
    </div>
  );
});

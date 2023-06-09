import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../api/main/appStore";
import NewsPageContent from "../../components/market-outlook/NewsPageContent";
import Header from "../../components/shared/header/Header";

export default observer(function MarketNewsArticlePage() {
  const { marketOutlookStore } = useStore();
  let params = useParams();

  useEffect(() => {
    (async function getActiveNews() {
      await marketOutlookStore.getMarketOutlooks();
    })();
  }, [marketOutlookStore]);

  const newsId = parseInt(params.id!, 10);

  return (
    <>
      <Header />

      <NewsPageContent
        newsId={newsId}
        activeNewsArticles={marketOutlookStore.marketOutlooks}
      />
    </>
  );
});

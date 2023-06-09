import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../api/main/appStore";
import CustomAccordion from "../../shared/custom-accordion/CustomAccordion";
import CustomDefaultTabHeading from "../../shared/headings/CustomDefaultTabHeading";
import NewsContent from "./NewsContent";

export default observer(function MarketNewsHeadlines() {
  const { marketOutlookStore } = useStore();

  useEffect(() => {
    (async function getData() {
      await marketOutlookStore.getMarketOutlooks();
    })();
  }, [marketOutlookStore]);

  return (
    <>
      <CustomDefaultTabHeading content="Market News" />

      <div className="mt-3">
        {marketOutlookStore.marketOutlooks.map((el) => (
          <CustomAccordion
            key={el.title}
            title={el.title}
            content={<NewsContent data={el} />}
          />
        ))}
      </div>
    </>
  );
});

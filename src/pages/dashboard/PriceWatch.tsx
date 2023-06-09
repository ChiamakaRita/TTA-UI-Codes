import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import PricewatchGetStarted from "../../components/pricewatch/get-started/PricewatchGetStarted";
import PricePredictionResult from "../../components/pricewatch/prediction-result/PricePredictionResult";
import PricewatchBackground from "../../components/pricewatch/pricewatch-bg/PricewatchBackground";
import Header from "../../components/shared/header/Header";

export default observer(function PriceWatch() {
  const { pricewatchStore } = useStore();

  useEffect(() => {
    (async function getData() {
      pricewatchStore.getFormSetupData();
    })();
  }, [pricewatchStore]);

  return (
    <>
      <Header />

      <PricewatchBackground>
        {pricewatchStore.prediction ? (
          <PricePredictionResult data={pricewatchStore.prediction} />
        ) : (
          <PricewatchGetStarted
            origins={pricewatchStore.origins}
            truckSizes={pricewatchStore.truckSizes}
          />
        )}
      </PricewatchBackground>
    </>
  );
});

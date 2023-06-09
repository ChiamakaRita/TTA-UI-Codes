import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import LandingFirstView from "../../components/home/LandingFirstView";
import LandingSecondView from "../../components/home/LandingSecondView";
import OurPromise from "../../components/home/OurPromise";
import PartnersClient from "../../components/home/PartnersClients";
import WhatsNew from "../../components/home/WhatsNew";
import Header from "../../components/shared/header/Header";
import LandingSlider from "../../components/home/LandingSlider";
import ServiceComp1 from "../../components/servicefolder2/Service";
import LandingService from "../../components/service/LandingService";
import  Navbar  from "../../components/shared/servicenavbar/Navbar";
import { SlantedService } from "../../components/service-slanted/Service";
import { SingleHero } from "../../components/home/SingleHero";

export default observer(function HomePage() {
  const { landingStore, marketOutlookStore } = useStore();

  useEffect(() => {
    if (landingStore.topTruckRequests.length === 0) {
      (async function getData() {
        await landingStore.getTopTruckRequests();
        await marketOutlookStore.getMarketOutlooks();
      })();
    }
  }, [landingStore, marketOutlookStore]);
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      {/* <LandingFirstView
        topTruckRequests={landingStore.topTruckRequests}
        marketOutlookArticles={marketOutlookStore.marketOutlooks}
      /> */}
      {/* <LandingSlider /> */}
      <SingleHero />
      <LandingSecondView />
      {/* <WhatsNew /> */}
      {/* <ServiceComp1 /> */}
      <SlantedService />
      <OurPromise />
      {/* <LandingService/> */}
      {/* <PartnersClient /> */}
    </>
  );
});

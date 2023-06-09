import { observer } from "mobx-react-lite";
import LandingSecondView from "../../components/home/LandingSecondView";
import OurPromise from "../../components/home/OurPromise";
import  Navbar  from "../../components/shared/servicenavbar/Navbar";
import { SlantedService } from "../../components/service-slanted/Service";
import { SingleHero } from "../../components/home/SingleHero";

export default observer(function HomePage() {

  return (
    <>
      {/* <Header /> */}
      <Navbar />
      <SingleHero />
      <LandingSecondView />
      <SlantedService />
      <OurPromise />
    </>
  );
});

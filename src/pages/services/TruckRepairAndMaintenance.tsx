import { useEffect, useRef } from "react";
import Navbar from "../../components/shared/servicenavbar/Navbar";
import { TruckRepair } from "../../components/service-slanted/truck-repair/TruckRepair";
import { OurOffer } from "../../components/service-slanted/truck-repair/OurOffer";
import { TTAAssistModel } from "../../components/service-slanted/TTAAssistModel";

export default function TruckRepairAndMaintenance() {
  const products = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToOurProducts = () => {
    products.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* <Header /> */}
      <Navbar/>
      <TruckRepair/>
      <div ref={products}>
        <OurOffer/>
      </div>
      <TTAAssistModel/>
    </div>
  );
}

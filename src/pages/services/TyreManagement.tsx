import { useEffect, useRef } from "react";
import Navbar from "../../components/shared/servicenavbar/Navbar";
import { TyreMgt } from "../../components/service-slanted/tyremgt/TyreMgt";
import { OurOffer } from "../../components/service-slanted/tyremgt/OurOffer";
import { TTAAssistModel } from "../../components/service-slanted/TTAAssistModel";

export default function TyreManagement() {
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
      <TyreMgt/>
      <div ref={products}>
        <OurOffer/>
      </div>
      <TTAAssistModel/>
    </div>
  );
}

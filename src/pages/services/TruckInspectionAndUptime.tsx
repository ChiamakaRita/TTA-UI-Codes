import { useEffect, useRef } from "react";
import OurProducts from "../../components/service/truck-inspection/OurProducts";
import Navbar from "../../components/shared/servicenavbar/Navbar";
import { TruckInspection } from "../../components/service-slanted/truck-inspection/TruckInspection";
import { OurOffer } from "../../components/service-slanted/truck-inspection/OurOffer";

export default function AboutPage() {
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
      <TruckInspection/>
      <div ref={products}><OurOffer/></div>
    </div>
  );
}

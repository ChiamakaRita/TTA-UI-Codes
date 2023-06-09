import { useEffect, useRef } from "react";
import DescribeUs from "../../components/about-us/DescribeUs";
import Navbar from "../../components/shared/servicenavbar/Navbar";

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

      <DescribeUs learnMoreBtn={scrollToOurProducts} />

      {/* <div ref={products}>
        <OurProducts />
      </div> */}
    </div>
  );
}

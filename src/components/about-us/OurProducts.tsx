import "./OurProducts.css";
import priceImg from "../../static-assets/images/about-us-price-img.jpg";
import routeImg from "../../static-assets/images/route-watch-img.jpg";
import investmentImg from "../../static-assets/images/truck-invest-img.png";
import OurProduct from "./templates/OurProduct";

export default function OurProducts() {
  return (
    <div>
      <br />
      <h2 className="what-we-bring-title">WHAT WE BRING </h2>
      <br />
      <OurProduct
        name="Price Analytics"
        description="Thanks to PriceWatch Analytics, you can perform route price
            competitive analysis by simply uploading your price data on the
            platform. This allows you to see how your price compares against
            your peers in the industry. It shows you routes with price gaps and
            competitive price points. “Price Suggest” informs you the right
            price that will attract carriers to you without over paying."
        imgUrl={priceImg}
        position={1}
      />
      <OurProduct
        name="Route Analytics"
        description="RouteWatch analytics helps you stay ahead with what is happening on
            the road. It gives insight on routes with high truck demand and
            predicts where demand will likely move to in the next 6 months. Our
            propriatery algorithm helps you see the most profitable routes based
            on price, accurate delivery lead time, reverse logistics and road
            condition."
        imgUrl={routeImg}
        position={2}
      />
      <OurProduct
        name="Truck Investment ROI Calculator"
        description="Use real-time and historical data to calculate ROI before investing
            or funding truck. You can also develop models for truck load price
            on each route and visualize events that will impact on truck
            investment so you can make informed decision either as a truck owner
            or a funding partner."
        imgUrl={investmentImg}
        position={1}
      />
    </div>
  );
}

import "./OurProducts.css";
import priceImg from "../../../assets/images/Truck-Inspection.jpeg";
import routeImg from "../../../assets/images/Truck-Inspection.jpeg";
import investmentImg from "../../../assets/images/Truck-Inspection.jpeg";
import OurProduct from "../../about-us/templates/OurProduct";

export default function OurProducts() {
  return (
    <div>
      <br />
      <h2 className="what-we-bring-title"></h2>
      <br />
      <OurProduct
        name="Dedicated Professional Technicians "
        description="This service comes with experienced dedicated professional technicians that will conduct regular diagnostics and inspection on your fleet and make recommendations on the necessary repair or remediation actions."
        imgUrl={priceImg}
        position={1}
      />
      <OurProduct
        name="Bespoke Service"
        description="The good news is, we can tailor our fleet management services to suit your unique business needs and environment. Our aim is to keep your fleet running and your business moving forward."
        imgUrl={routeImg}
        position={2}
      />
      <OurProduct
        name="TTA - Protect"
        description="We understand the vital role that cost plays in keeping fleet running for your supply chain and logistics. Hence, we have a protection plan that allows truck owners with large fleet to pay a fixed monthly fee per truck (paid annually) and enjoy limited services covered by TTA Assist Service Model. "
        imgUrl={investmentImg}
        position={1}
      />
      <OurProduct
        name="TTA – Per Use"
        description="Pay per use allows truck owners to pay per truck for any of the services covered under TTA – Assist Service Model. Registering your truck on our platform allows us to create inspection schedule and alert, which reminds you when a truck is scheduled for inspection.  "
        imgUrl={investmentImg}
        position={2}
      />
    </div>
  );
}

import "./OurProduct.css";
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
        name="Inspection & Diagnostics  "
        description="This service comes with experienced dedicated professional technicians that will conduct regular diagnostics and inspection on your fleet and make recommendations on the necessary repair or remediation actions on a monthly basis."
        imgUrl={priceImg}
        position={1}
      />
      <OurProduct
        name="Truck Repairs"
        description="TRM dedicated technicians go the extra mile of repairing any identified issue during inspection, replace faulty parts and run scheduled maintenance service on the truck.  We do this either on a monthly schedule under TTA - Assist Service model or on a case by case basis."
        imgUrl={routeImg}
        position={2}
      />
      <OurProduct
        name="Truck In-Transit Breakdown Recovery"
        description="This is designed to bring the help your truck needs directly to where the breakdown occurs. Where our roadside assistance does not provide the repair required for the truck to be back on the road, the truck will be towed to our service centre or nearby repair centre.   "
        imgUrl={investmentImg}
        position={1}
      />
      <OurProduct
        name="24/7 Emergency Response"
        description="The Truck Arena Limited operates a 24hour – Monday – Saturday Call Centre where drivers with emergency roadside needs can call and get immediate attention. Upon receiving a call for assistance, we will dispatch a recovery team to the location of breakdown within a specified timeframe."
        imgUrl={investmentImg}
        position={2}
      />
      <OurProduct
        name="TTA – Assist Service Model"
        subtitle="To help fleet owners keep their trucks running whatever their budget, we offer two types of service plan. These are:"
        description="1.	TTA – Protect: The protection plan allows truck owners to pay a fixed monthly fee (paid annually) per truck and enjoy unlimited services covered by TTA-Assist (Terms & Conditions Apply)."
        optional="2.	TTA – Per Use: Pay per use allows a truck owner to pay per truck for any of the services covered by TTA – Assist."
        imgUrl={investmentImg}
        position={1}
      />
    </div>
  );
}

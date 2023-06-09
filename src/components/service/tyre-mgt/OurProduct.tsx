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
        name="Tyre Monitoring "
        description="This is a daily tyre inspection that combines the expertise of our trained Tyre Specialist (TS) and our suite of digital solutions in checking the pressure, tread depth and conditions of your Tyres, whatever the brand"
        imgUrl={routeImg}
        position={1}
      />
      <OurProduct
        name="Tyre Maintenance"
        description="Our maintenance program uses the real-time inspection report and alerts that highlights clear and comprehensive action items and tyre pain points with remediation steps that need to be carried out to prevent truck downtime. "
        imgUrl={investmentImg}
        position={2}
      />
      <OurProduct
        name="Tyre Management "
        description="At the core of our strategy is to maximize the expertise of our trained tyre technicians in conducting daily tyre inspection enabled with our advanced digital tools to ensure you maximize investments in Tyres. "
        imgUrl={investmentImg}
        position={1}
      />
      <OurProduct
        name="Optimization "
        description="The information captured with the set of monitoring and digital tools will be used to digitize the management of your tyre expenditure."
        imgUrl={priceImg}
        position={2}
      />
      <OurProduct
        name="TTA – Assist Service Model"
        subtitle="To help fleet owners keep their trucks running whatever their budget, we offer two types of service plan. These are:"
        description="1.	TTA – Protect: The protection plan allows truck owners to pay a fixed monthly fee (paid annually) per truck and enjoy unlimited services covered by TTA-Assist (Terms & Conditions Apply)."
        optional="2.	TTA – Per Use: Pay per use allows a truck owner to pay per truck for any of the services covered by TTA – Assist."
        imgUrl={priceImg}
        position={1}
      />
    </div>
  );
}

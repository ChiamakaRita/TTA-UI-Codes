import { FcPortraitMode } from "react-icons/fc";
import Icon1 from "../../../assets/images/technician-icon.jpeg";
import Icon2 from "../../../assets/images/bespoke-icon-img.png";
import Icon3 from "../../../assets/images/TTA-protect-icon.jpeg";
import Icon4 from "../../../assets/images/TTA per use.png";

export const OurOffer = () => {
  return (
    <div className="service-offer-container">
      <div className="offer_container">
        <div className="icon-header-container">
          <img src={Icon1} alt="Icon" className="offer_icon svg" />
          <h2 className="offer_header offer_header1">
            Dedicated Professional Technicians
          </h2>
        </div>
        <p className="offer_description  maintext1">
          This service comes with experienced dedicated professional technicians
          that will conduct regular diagnostics and inspection on your fleet and
          make recommendations on the necessary repair or remediation actions.
        </p>
      </div>
      <div className="offer_container">
        <div className="icon-header-container">
          <img src={Icon2} alt="Icon" className="offer_icon png width icon2" />

          <h2 className="offer_header offer_header2">Bespoke Service</h2>
        </div>
        <p className="offer_description maintext2">
          The good news is, we can tailor our fleet management services to suit
          your unique business needs and environment. Our aim is to keep your
          fleet running and your business moving forward.
        </p>
      </div>
      <div className="offer_container">
        <div className="icon-header-container">
          <img src={Icon3} alt="Icon" className="offer_icon width icon3" />
          <h2 className="offer_header offer_header3">TTA-Protect</h2>
        </div>
        <p className="offer_description maintext3">
          We understand the vital role that cost plays in keeping fleet running
          for your supply chain and logistics. Hence, we have a protection plan
          that allows truck owners with large fleet to pay a fixed monthly fee
          per truck (paid annually) and enjoy limited services covered by
          <span> TTA Assist Service Model.</span>
        </p>
      </div>
      <div className="offer_container">
        <div className="icon-header-container">
          <img src={Icon4} alt="Icon" className="offer_icon png icon4" />
          <h2 className="offer_header offer_header4">TTA-Per Use</h2>
        </div>
        <p className="offer_description maintext4">
          Pay per use allows truck owners to pay per truck for any of the
          services covered under TTA – Assist Service Model. Registering your
          truck on our platform allows us to create inspection schedule and
          alert, which reminds you when a truck is scheduled for inspection.
        </p>
      </div>
    </div>
  );
}

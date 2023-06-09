import React from "react";
import Icon1 from "../../../assets/images/tyre-monitoring-icon.jpeg";
import Icon2 from "../../../assets/images/truckrepair-icon.jpeg";
import Icon3 from "../../../assets/images/truck-intransit-icon.jpeg";
import Icon4 from "../../../assets/images/emergency-icon.jpeg";

export const OurOffer = () => {
  return (
    <div className="service-offer-container">
      <div className="offer_container">
        <div className="icon-header-container">
          <img src={Icon1} alt="Icon" className="offer_icon svg icon11" />
          <h2 className="offer_header repair_header1">
            Inspection & Diagnostics
          </h2>
        </div>
        <p className="offer_description repairtext1">
          This service comes with experienced dedicated professional technicians
          that will conduct regular diagnostics and inspection on your fleet and
          make recommendations on the necessary repair or remediation actions on
          a monthly basis.
        </p>
      </div>
      <div className="offer_container">
        <div className="icon-header-container">
          <img src={Icon2} alt="Icon" className="offer_icon png width icon12" />
          <h2 className="offer_header repair_header2">Truck Repairs</h2>
        </div>
        <p className="offer_description repairtext2">
          TRM dedicated technicians go the extra mile of repairing any
          identified issue during inspection, replace faulty parts and run
          scheduled maintenance service on the truck. We do this either on a
          monthly schedule under TTA - Assist Service model or on a case by case
          basis."
        </p>
      </div>
      <div className="offer_container">
        <div className="icon-header-container">
          <img src={Icon3} alt="Icon" className="offer_icon width icon9" />
          <h2 className="offer_header repair_header3">
            Truck In-Transit Breakdown Recovery
          </h2>
        </div>

        <p className="offer_description  repairtext3">
          This is designed to bring the help your truck needs directly to where
          the breakdown occurs. Where our roadside assistance does not provide
          the repair required for the truck to be back on the road, the truck
          will be towed to our service centre or nearby repair centre.
        </p>
      </div>
      <div className="offer_container">
        <div className="icon-header-container">
          <img src={Icon4} alt="Icon" className="offer_icon png icon10" />
          <h2 className="offer_header repair_header4">
            24/7 Emergency Response
          </h2>
        </div>
        <p className="offer_description repairtext4">
          The Truck Arena Limited operates a 24hour – Monday – Saturday Call
          Centre where drivers with emergency roadside needs can call and get
          immediate attention. Upon receiving a call for assistance, we will
          dispatch a recovery team to the location of breakdown within a
          specified timeframe.
        </p>
      </div>
    </div>
  );
};

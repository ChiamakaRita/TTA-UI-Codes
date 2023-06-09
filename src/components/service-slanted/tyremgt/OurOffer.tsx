import React from "react";
import Icon1 from "../../../assets/images/tyre-monitoring-icon.jpeg";
import Icon2 from "../../../assets/images/tyre-maintenance-icon.jpeg";
import Icon3 from "../../../assets/images/tyre-management-icon.jpeg";
import Icon4 from "../../../assets/images/optimization-icon.jpeg";

export const OurOffer = () => {
  return (
    <div className="service-offer-container">
      <div className="offer_container">
        <div className="icon-header-container">
          <img src={Icon1} alt="Icon" className="offer_icon svg icon5" />
          <h2 className="offer_header tyre_header1">Tyre Monitoring</h2>
        </div>
        <p className="offer_description tyretext1">
          This is a daily tyre inspection that combines the expertise of our
          trained Tyre Specialist (TS) and our suite of digital solutions in
          checking the pressure, tread depth and conditions of your Tyres,
          whatever the brand.
        </p>
      </div>
      <div className="offer_container">
        <div className="icon-header-container">
          <img src={Icon2} alt="Icon" className="offer_icon png width icon6" />
          <h2 className="offer_header tyre_header2">Tyre Maintenance</h2>
        </div>
        <p className="offer_description tyretext2">
          Our maintenance program uses the real-time inspection report and
          alerts that highlights clear and comprehensive action items and tyre
          pain points with remediation steps that need to be carried out to
          prevent truck downtime.
        </p>
      </div>
      <div className="offer_container">
        <div className="icon-header-container">
          <img src={Icon3} alt="Icon" className="offer_icon width icon7" />
          <h2 className="offer_header tyre_header3">Tyre Management</h2>
        </div>
        <p className="offer_description tyretext3">
          At the core of our strategy is to maximize the expertise of our trained
          tyre technicians in conducting daily tyre inspection enabled with our
          advanced digital tools to ensure you maximize investments in Tyres.
        </p>
      </div>
      <div className="offer_container">
        <div className="icon-header-container tyretext4">
          <img src={Icon4} alt="Icon" className="offer_icon png icon8" />
          <h2 className="offer_header tyre_header4">Optimization</h2>
        </div>
        <p className="offer_description">
          The information captured with the set of monitoring and digital tools
          will be used to digitize the management of your tyre expenditure.
        </p>
      </div>
    </div>
  );
};

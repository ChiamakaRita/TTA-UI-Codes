import React from 'react';
import "../ServiceCss.css";
import truckinsp from "../../../assets/images/truck-inspection.jpg";
import { OurOffer } from './OurOffer';

export const TruckInspection = () => {
  return (
    <div className='contain'>
        <h1 className='service-header'>Truck Inspection And Uptime Service</h1>
      <div className="service_contain">
        <div className="service_text">
          <p>
            Our Truck Inspection and Uptime (TIU) service is designed to deliver
            bespoke service to fleet owners who want scheduled inspection that
            will help them prevent costly unplanned truck break down. This
            service comes with dedicated professional technicians that will
            conduct regular diagnostics and inspection on your fleet and make
            recommendations on the necessary repairs or remediation actions. To
            ensure your fleet enjoy the best we can provide and avoid service
            disruption, we guarantee the following:
          </p>
        </div>
        <div className="img">
          <img src={truckinsp} alt="Truck Inspection Image" />
        </div>
      </div>
    </div>
  );
}

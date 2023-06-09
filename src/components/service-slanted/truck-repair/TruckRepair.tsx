import React from 'react';
import "../ServiceCss.css";
import truckinsp from "../../../assets/images/truck-inspection.jpg";

export const TruckRepair = () => {
  return (
    <div className="contain">
      <h1 className="service-header">Truck Repair & Maintenance</h1>
      <div className="service_contain">
        <div className="service_text">
          <p>
            Our Truck Repair & Maintenance (TRM) service is designed to deliver
            scheduled inspection and diagnostics on your fleet to help prevent
            costly unplanned truck break down. TRM dedicated technicians will
            also repair any identified issues, replace faulty parts, and run
            scheduled maintenance service. This consolidates all activities
            required to keep your fleet and freight on schedule.To ensure your
            fleet enjoy the best we can provide in this service category, we
            have consolidated the following services:
          </p>
        </div>
        <div className="img">
          <img src={truckinsp} alt="Truck Inspection Image" />
        </div>
      </div>
    </div>
  );
}

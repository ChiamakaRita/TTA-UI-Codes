import React from 'react';
import "../ServiceCss.css";
import tyremgt from "../../../assets/images/Tyre-management-service.jpg";

export const TyreMgt = () => {
  return (
    <div>
      <h1 className="service-header">Tyre Management Service</h1>
      <div className="service_contain">
        <div className="service_text">
          <p>
            We implement practical Tyre management solution with a global view,
            using Digital Tyre inspection Solution to generate reports on tyre
            pressure, tread depth and overall tyre condition in real-time. Our
            tyre management scope covers monitoring, maintenance, management,
            and optimization. This will positively influence tyre cost per
            kilometer, vehicle uptime level, fuel efficiency and
            eco-friendliness.
          </p>
        </div>
        <div className="img">
          <img src={tyremgt} alt="Truck Inspection Image" />
        </div>
      </div>
    </div>
  );
}

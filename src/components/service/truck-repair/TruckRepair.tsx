import TRM from "../../../assets/images/hero-truck-repair.jpeg";
import "../service-css/Services.css";

const TruckRepair = () => {
  return (
    <div className="container">
      <img src={TRM} alt="Truck Repair Image" className="tiu-image" />
      <div className="textblock">
        <h1 className="title">TRUCK REPAIR & MAINTENANCE </h1>
        <p>
          {" "}
          Our Truck Repair & Maintenance (TRM) service is designed to deliver
          scheduled inspection and diagnostics on your fleet to help prevent
          costly unplanned truck break down. TRM dedicated technicians will also
          repair any identified issues, replace faulty parts, and run scheduled
          maintenance service. This consolidates all activities required to keep
          your fleet and freight on schedule.To ensure your fleet enjoy the best
          we can provide in this service category, we have consolidated the
          following services:
        </p>
      </div>
    </div>
  );
};

export default TruckRepair;

import { Link } from "react-router-dom";
import TruckInspection from "../../assets/images/truck inspection.jpg";
import TyreManagement from "../../assets/images/Tyre_management service.jpg";
import TruckRepair from "../../assets/images/truckrepair.jpeg"
import "./Service.css";

export const SlantedService = () => {
  return (
    <div className="service_container">
      <h1 className="service_header">Services</h1>
      <div className="cards">
        <div className="card">
          <div className="container">
            <img src={TruckInspection} alt="" />
          </div>
          <div className="details">
            <h3>TRUCK INSPECTION AND UPTIME</h3>
            <p>
              Our Truck Inspection and Uptime (TIU) service is designed to
              deliver bespoke service to fleet owners who want scheduled
              inspection that will help them prevent costly unplanned truck
              break down. This service comes with dedicated...
            </p>
            <Link to="/truckinspection" className="label">
              Read More...
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="container">
            <img src={TruckRepair} alt="" />
          </div>
          <div className="details">
            <h3>TRUCK REPAIR & MAINTENANCE</h3>
            <p>
              Our Truck Repair & Maintenance (TRM) service is designed to
              deliver scheduled inspection and diagnostics on your fleet to help
              prevent costly unplanned truck break down. TRM dedicated
              technicians will also repair any identified issues...
            </p>
            <Link to="/truckrepair" className="label">
              Read More...
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="container">
            <img src={TyreManagement} alt="" className="tyre-img"/>
          </div>
          <div className="details">
            <h3>TYRE MANAGEMENT SERVICE</h3>
            <p>
              We implement practical Tyre management solution with a global
              view, using Digital Tyre inspection Solution to generate reports
              on tyre pressure, tread depth and overall tyre condition in
              real-time...
            </p>
            <Link to="/tyremgt" className="label label3">
              Read More...
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Link } from "react-router-dom";
import "./Service.css";
import Technician from "../../assets/images/Truck-Inspection.jpeg";
import Truck from "../../assets/images/hero-truck-repair.jpeg";
import Training from "../../assets/images/truck-training.jpg";
import Tyre from "../../assets/images/tyre-mgnt.jpg";

const ServiceComp1 = () => {
  return (
    <div className="service">
      <div className="contain">
        <h3>OUR SERVICE OFFERINGS</h3>
        <p className="service-p">
          The Truck Arena has a wide range of truck service management offerings
          you need to keep your fleet running and your business moving forward.
          The good news is, we can tailor truck repair services and fleet
          management to suit your unique business and environment. These are the
          range of our service offering
        </p>
        <div className="service-container">
          <div className="service_card">
            <div className="image-box box1">
              <img src={Technician} alt="" />
            </div>
            <div className="service-content">
              <h2>Truck Inspection & Uptime Service</h2>
              <p>
                Our Truck Inspection and Uptime (TIU) service is designed to
                deliver bespoke service to fleet owners who want scheduled...
              </p>

              <Link to="/truckinspection" className="label">
                Read More
              </Link>
            </div>
          </div>
          <div className="service_card">
            <div className="image-box box2">
              <img src={Truck} alt="" />
            </div>
            <div className="service-content">
              <h2>Truck Repair & Maintenance</h2>
              <p>
                Our Truck Repair & Maintenance (TRM) service is designed to
                deliver scheduled inspection and...
              </p>
              <Link to="/truckrepair" className="label">
                Read More
              </Link>
            </div>
          </div>
          <div className="service_card">
            <div className="image-box">
              <img src={Tyre} alt="" />
            </div>
            <div className="service-content">
              <h2>Tyre Management Service</h2>
              <p>
                We implement practical Tyre management solution with a global
                view, using Digital Tyre inspection Solution...
              </p>
              <Link to="/tyremgt" className="label">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceComp1;

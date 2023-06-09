import TMS from "../../../assets/images/tyre-mgnt.jpg";
import "../service-css/Services.css";

const TruckRepair = () => {
  return (
    <div className="container">
      <img src={TMS} alt="Truck Repair Image" className="tiu-image" />
      <div className="textblock">
        <h1 className="title">Tyre Management Service</h1>
        <p>
          {" "}
          We implement practical Tyre management solution with a global view,
          using Digital Tyre inspection Solution to generate reports on tyre
          pressure, tread depth and overall tyre condition in real-time. Our
          tyre management scope covers monitoring, maintenance, management, and
          optimization. This will positively influence tyre cost per kilometer,
          vehicle uptime level, fuel efficiency and eco-friendliness.
        </p>
      </div>
    </div>
  );
};

export default TruckRepair;

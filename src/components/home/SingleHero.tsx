import "./css/SingleHero.css";
import { Link } from "react-router-dom";

export const SingleHero = () => {
  return (
    <div className="image">
      <div className="image-overlay">
        <p>LOOKING FOR THE RIGHT TRUCK</p>
        <p>REPAIR SERVICES</p>
        <div className="btn-container">
          <Link to="/about-us" className="link">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

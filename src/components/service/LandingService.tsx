import React from "react";
import TIU from "../../assets/images/Truck-Inspection.jpeg";
import "./LandingService.css";

const LandingService = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="inner">
              {" "}
              <img className="card-img-top" src={TIU} />
            </div>

            <div className="card-body text-center">
              <h5 className="card-title">Truck Inspection & Uptime</h5>
              <p className="card-text">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In,
                at.
              </p>
              <a href="#" className="btn btn-primary">
                Learn More...
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow">
            <img className="card-img-top" src={TIU} />
            <div className="card-body text-center">
              <h5 className="card-title">Truck Inspection & Uptime</h5>
              <p className="card-text">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In,
                at.
              </p>
              <a href="#" className="btn btn-primary">
                Learn More...
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow">
            <img className="card-img-top" src={TIU} />
            <div className="card-body text-center">
              <h5 className="card-title">Truck Inspection & Uptime</h5>
              <p className="card-text">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In,
                at.
              </p>
              <a href="#" className="btn btn-primary">
                Learn More...
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingService;

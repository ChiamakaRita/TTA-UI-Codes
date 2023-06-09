import { useState } from "react";
import "./css/LandingSlider.css";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight, MdArrowForward } from "react-icons/md";

const LandingSlider = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };

  return (
    <>
      <div className="home">
        <div className="content">
          <p>LOOKING FOR</p>
          <p>THE RIGHT TRUCK</p>
          <p>REPAIR SERVICES</p>
          <div className="btn-container">
            <Link
              to="/about-us"
              className="link"
              onMouseEnter={onHover}
              onMouseLeave={onHover}
            >
              Learn More {hover ? <MdArrowForward /> : <MdKeyboardArrowRight />}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingSlider;

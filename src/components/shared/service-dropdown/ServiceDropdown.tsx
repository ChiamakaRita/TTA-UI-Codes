import React, { useState } from "react";
import { serviceDropdown } from "../../../local-data/shared/headerLinksData";
import "./ServiceDropdown.css";
import { Link } from "react-router-dom";

function ServiceDropdown() {
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setDropdown(!dropdown);

  return (
    <>
      <ul
        onClick={handleClick}
        className={dropdown ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {serviceDropdown.map((item, i) => {
          return (
            <li key={i}>
              <Link
                className={item.cName}
                to={item.to}
                onClick={() => setDropdown(false)}
              >
                {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ServiceDropdown;






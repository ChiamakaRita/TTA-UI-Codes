import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Narbar.css";
import ServiceDropdown from "../service-dropdown/ServiceDropdown";
import Logo from "../../../assets/images/TTA-logo-icon.png";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaTimes, FaBars } from "react-icons/fa";
import { headerLinksData } from "../../../local-data/shared/headerLinksData";


function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(true);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to={"/"} className="logo-container">
          <img alt="Company-Logo" src={Logo} className="logo-img" />
        </Link>
        ;
        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about-us"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              About Us
            </Link>
          </li>
          <li
            className="nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to="/truckinspection"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Services <IoMdArrowDropdown />
            </Link>
            {dropdown && <ServiceDropdown />}
          </li>
          <li className="nav-item">
            <Link
              to="/questions"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              FAQ
            </Link>
          </li>
          {/* {headerLinksData.map((item, i) => {
            if (item.text === "Services") {
              return (
                <li
                  key={i}
                  className="nav-item"
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                >
                  <Link to={item.to} className={item.cName}>
                    {item.text}
                    <IoMdArrowDropdown />
                  </Link>
                  {dropdown && <ServiceDropdown />}
                </li>
              );
            }
            return (
              <li key={i} className="nav-item">
                <Link to={item.to} className={item.cName}>{item.text}</Link>
              </li>
            );
          })} */}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;

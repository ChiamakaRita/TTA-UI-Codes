import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { headerLinksData } from "../../../local-data/shared/headerLinksData";
import "./Header.css";
import Logo from "../../../assets/images/truck_arena_logo.png";
import ServiceDropdown from "../service-dropdown/ServiceDropdown";
import { IoMdArrowDropdown } from "react-icons/io";

export default observer(function Header() {
  const [dropdown, setDropdown] = useState(false);

    const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <div className="header-container ">
      <Link to={"/"} className="logo-container">
        <img alt="Company-Logo" src={Logo} className="logo-img" />{" "}
      </Link>

      <div className="header-links-box">
        {/* {userAccountStore.isAdmin && (
          <DropdownNav name="Admin" links={adminFeatureLinks} />
        )} */}

        {/* {userAccountStore.isLoggedIn && (
          <NavLink
            to={"/dashboard"}
            className={`header-link ${
              window.location.pathname === "/dashboard"
                ? "header-link-active"
                : ""
            }`}
          >
            Dashboard
          </NavLink>
        )} */}

        {/* {headerLinksData.map((el, i) => (
          <NavLink
            key={i}
            to={el.to}
            className={`header-link ${
              window.location.pathname === el.to ? "header-link-active" : ""
            }`}
          >
            {el.text}
          </NavLink>
        ))} */}
         <ul className="nav-items">
          {headerLinksData.map((item, i) => {
            if (item.text === "Services") {
              return (
                <NavLink
                  key={i}
                  to={item.to}
                  // className={`header-link ${
                  //   window.location.pathname === item.to
                  //     ? "header-link-active"
                  //     : ""
                  // }`}
                  className={item.to}
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                  
                >
                  <Link to={item.to}>{item.text}<IoMdArrowDropdown /></Link>
                  {dropdown && <ServiceDropdown />}
                </NavLink>
              );
            }
            return (
              <NavLink
                key={i}
                to={item.to}
                className={item.cName}
              >
                <Link to={item.to}>{item.text}</Link>
              </NavLink>
            );
          })}
        </ul>
        
        

        {/* {userAccountStore.isLoggedIn && (
          <NavLink
            to={"/account"}
            className={`header-link ${
              window.location.pathname === "/account"
                ? "header-link-active"
                : ""
            }`}
          >
            <Icon name="user" />
          </NavLink>
        )}
        {/* {!userAccountStore.isLoggedIn && (
          <>
            <NavLink
              to={"/account/login"}
              className={`header-link ${
                window.location.pathname === "/account/login"
                  ? "header-link-active"
                  : ""
              }`}
            >
              Login
            </NavLink>
            <span
              className={`header-link`}
              onClick={() => commonStore.setModalContent(<AccountTypeForm />)}
            >
              Register
            </span>
          </>
        )} */}
      </div>
      <div
        className="drawer-nav-bar pointer-cursor"
        // onClick={() => commonStore.setDrawerVisible(true)}
      >
        <Icon name="bars" />
      </div>
    </div>
  );
});

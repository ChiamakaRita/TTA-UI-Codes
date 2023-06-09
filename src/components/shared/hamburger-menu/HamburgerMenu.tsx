import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import "./HamburgerMenu.css";

interface Props {
  visible: boolean;
}

export default observer(function HamburgerMenu({ visible }: Props) {
  const { commonStore, userAccountStore } = useStore();

  const handleClick = () => {
    commonStore.setDrawerVisible(false);
  };

  return (
    <div
      className={`hamburger-menu-container ${
        visible ? "slide-menu-in" : "slide-menu-out"
      }`}
    >
      <div
        className="hamburger-menu-close"
        onClick={() => commonStore.setDrawerVisible(false)}
      >
        <Icon name="times" />
      </div>
      <div className="hamburger-menu-links">
        {commonStore.drawerData.map((el) => (
          <Link to={el.to} key={el.text} onClick={handleClick}>
            {" "}
            {el.text}
          </Link>
        ))}
{/* 
        {userAccountStore.isInHouse && (
          <Link to={"/truck-request"} onClick={handleClick}>
            {" "}
            Truck Request
          </Link>
        )} */}

        {/* {userAccountStore.isLoggedIn ? (
          <>
            <Link to={"/dashboard"} onClick={handleClick}>
              {" "}
              Dashboard
            </Link>
            <Link to={"/account"} onClick={handleClick}>
              {" "}
              My Account
            </Link>
          </>
        ) : (
          <Link to={"/account/login"} onClick={handleClick}>
            {" "}
            Login or Register
          </Link>
        )} */}

        {/* {userAccountStore.isAdmin && (
          <Link to={"/admin"} onClick={handleClick}>
            {" "}
            Admin
          </Link>
        )} */}
      </div>
    </div>
  );
});

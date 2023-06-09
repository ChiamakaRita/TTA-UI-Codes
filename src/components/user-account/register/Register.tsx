import { Link, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ShipperRegisterUI from "./ShipperRegisterUI";
import CarrierRegisterUI from "./CarrierRegisterUI";

export default observer(function Register() {
  const location = useLocation();

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  const accountType = location.state;

  const handleFormToDisplay = (accType: string) => {
    switch (accType) {
      case "shipper":
        return <ShipperRegisterUI accountType={accType} />;

      case "carrier":
        return <CarrierRegisterUI accountType={accType} />;

      default:
        return <CarrierRegisterUI accountType={accType} />;
    }
  };
  return (
    <div className="login-container">
      <div className="login-container-header">
        <div className="mt-4">
          <img src="/Logo.svg" alt="company-logo" />
        </div>
      </div>

      <div className="login-form">
        <div className="login-form-card">
          <p className="text-center">
            Already have an account ? &nbsp;{" "}
            <Link to={"/account/login"}>Sign in</Link>
          </p>
          {handleFormToDisplay(String(accountType))}
        </div>
      </div>
    </div>
  );
});

import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-icon">
        <Icon name="search" /> 404
      </div>
      <div className="not-found-message">
        Sorry, we checked everywhere and couldn't find the page you requested.
      </div>
      <div className="mt-3">
        <Link to={"/"}>Return home</Link>
      </div>
    </div>
  );
}

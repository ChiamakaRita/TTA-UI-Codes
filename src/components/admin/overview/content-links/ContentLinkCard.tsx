import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Link } from "react-router-dom";
import "./ContentLinkCard.css";

interface Props {
  name: string;
  to: string;
  icon: ReactJSXElement;
}

export default function ContentLinkCard({ name, to, icon }: Props) {
  return (
    <Link className="content-link-card-box" to={to}>
      <div className="content-link-card-icon">{icon}</div>

      <div className="content-link-card-name">{name}</div>
    </Link>
  );
}

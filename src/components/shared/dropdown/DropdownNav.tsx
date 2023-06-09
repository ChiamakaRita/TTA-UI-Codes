import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { LinkData } from "../../../api/models/shared";
import "./DropdownNav.css";

interface Props {
  name: string;
  links: LinkData[];
}

export default function DropdownNav({ name, links }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="dropbtn">
        {name} <Icon name={`${open ? "angle up" : "angle down"}`} />
      </span>
      <div className="dropdown-content">
        {links.map((el, i) => (
          <Link key={i} to={el.to}>
            {el.text}
          </Link>
        ))}
      </div>
    </div>
  );
}

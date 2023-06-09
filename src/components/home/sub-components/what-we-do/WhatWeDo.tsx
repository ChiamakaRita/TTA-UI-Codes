import "./WhatWeDo.css";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface Props {
  icon: ReactJSXElement;
  heading: string;
  detail: string;
  // btnFunc: () => void;
  actionText: string;
}

export default function WhatWeDo({
  icon,
  heading,
  detail,
  // btnFunc,
  actionText,
}: Props) {
  return (
    <div className="what-we-do_container">
      <div>
        <div className="what-we-do_icon">{icon}</div>
      </div>
      <div className="what-we-do_text">
        <h2>{heading}</h2>
        <p>{detail}</p>
        <a href="/questions" className="what-we-do-action_btn" >
          {actionText}
        </a>
      </div>
    </div>
  );
}

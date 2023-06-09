import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useState } from "react";
import { Icon } from "semantic-ui-react";
import "./CustomAccordion.css";

interface Props {
  title: string | ReactJSXElement;
  content: ReactJSXElement;
  open?: boolean;
}

export default function CustomAccordion({ title, content, open }: Props) {
  const [openContent, setOpenContent] = useState(open);

  return (
    <div className="accordion-container shadow-sm mb-3">
      <div
        className="accordion-header pointer-cursor"
        onClick={() => setOpenContent(!openContent)}
      >
        <div className="accordion-header_title">{title}</div>
        <div className="accordion-header_icon">
          {openContent ? <Icon name="angle up" /> : <Icon name="angle down" />}
        </div>
      </div>

      <div
        className={`accordion-body ${
          openContent ? "active-content" : "inactive-content"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

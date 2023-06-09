import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import "./BasicHorizontalTab.css";

interface Tab {
  text: string;
  icon: ReactJSXElement;
}

interface Props {
  tabs: Tab[];
  panels: ReactJSXElement[];
}

export default observer(function BasicHorizontalTab({ tabs, panels }: Props) {
  const [bodyIndex, setBodyIndex] = useState(0);

  return (
    <div>
      <div className="tab-key">
        {tabs.map((el, index) => {
          return (
            <span
              className={`tab-key_item ${
                index === bodyIndex ? "tab-key_item-active" : ""
              }`}
              key={index}
              onClick={() => setBodyIndex(index)}
            >
              <span>{el.icon}</span>
              <span>{el.text}</span>
            </span>
          );
        })}
      </div>
      <div className="tab-content">
        <div className="tab-content_item">{panels[bodyIndex]}</div>
      </div>
    </div>
  );
});

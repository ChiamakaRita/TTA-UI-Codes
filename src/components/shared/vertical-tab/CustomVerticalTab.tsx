import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useEffect } from "react";
import { useState } from "react";
import "./CustomVerticalTab.css";

interface Tab {
  icon: ReactJSXElement;
  text: string;
  callbackFn?: () => void;
  isDropdown?: boolean;
  hidden?: boolean;
}

interface Props {
  tabs: Tab[];
  panels: ReactJSXElement[];
  transparentRightBg?: boolean;
}

export default function CustomVerticalTab({
  tabs,
  panels,
  transparentRightBg,
}: Props) {
  const [bodyIndex, setBodyIndex] = useState(0);
  const [tabsToDisplay, setTabsToDisplay] = useState<Tab[]>([]);
  const [panelsToDisplay, setPanelsToDisplay] = useState<ReactJSXElement[]>([]);

  useEffect(() => {
    setTabsToDisplay(tabs.filter((e) => !e.hidden));
    setPanelsToDisplay(panels.filter((e) => !e.props.decisionToHide));
  }, [tabs, panels]);

  return (
    <div className="vertical-tab-container">
      <div className="vertical-tab-left">
        {tabsToDisplay.map((el, index) => {
          return !el.isDropdown ? (
            <span
              className={`vertical-tab-left_item ${
                index === bodyIndex ? "vertical-tab-left_item-active" : ""
              }`}
              key={index}
              onClick={
                el.callbackFn ? el.callbackFn : () => setBodyIndex(index)
              }
            >
              <span className="vertical-tab-left_item-icon">{el.icon}</span>
              <span className="vertical-tab-left_item-text">{el.text}</span>
            </span>
          ) : null;
        })}
      </div>

      <div
        className={`vertical-tab-right ${
          transparentRightBg ? "custom-right-bg" : "right-bg"
        }`}
      >
        <div className="vertical-tab-right_item">
          {panelsToDisplay[bodyIndex]}
        </div>
      </div>
    </div>
  );
}

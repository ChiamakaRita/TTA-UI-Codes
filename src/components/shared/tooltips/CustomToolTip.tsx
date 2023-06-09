import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Popup } from "semantic-ui-react";

interface Props {
  trigger: ReactJSXElement;
  content: ReactJSXElement;
}

const CustomToolTip = ({ trigger, content }: Props) => {
  return (
    <Popup trigger={trigger} wide position="bottom center">
      {content}
    </Popup>
  );
};

export default CustomToolTip;

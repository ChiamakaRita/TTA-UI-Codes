import "./CustomSwitch.css";
import Switch from "react-switch";
import { useState } from "react";

interface Props {
  active: boolean;
  callbackFn: (switchStatus: boolean) => void;
}

export default function CustomSwitch({ active, callbackFn }: Props) {
  const [checked, setChecked] = useState(active);

  const handleChange = (checked: boolean) => {
    setChecked(checked);

    callbackFn(checked);
  };

  return (
    <Switch
      checked={checked}
      onChange={(checked, e) => handleChange(checked)}
    />
  );
}

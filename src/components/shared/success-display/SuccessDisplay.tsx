import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import "./SuccessDisplay.css";

interface Props {
  visible: boolean;
}

export default observer(function SuccessDisplay({ visible }: Props) {
  const { commonStore } = useStore();

  return visible ? (
    <div className="fadeIn">
      <div className="success-display-container row ">
        <p className="success-display-message col-11">{commonStore.success}</p>
        <span
          className="col-1"
          onClick={() => {
            commonStore.setSuccess(null);
            commonStore.setIsThereSuccess(false);
          }}
        >
          <i className="icon times success-display-message-close"></i>
        </span>
      </div>
    </div>
  ) : null;
});

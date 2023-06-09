import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import "./ErrorDisplay.css";

interface Props {
  visible: boolean;
}

export default observer(function ErrorDisplay({ visible }: Props) {
  const { commonStore } = useStore();

  return visible ? (
    <div className="fadeIn">
      <div className="error-display-container row ">
        <p className="error-display-message col-11">{commonStore.error}</p>
        <span
          className="col-1"
          onClick={() => {
            commonStore.setError(null);
            commonStore.setIsThereError(false);
          }}
        >
          <i className="icon times error-display-message-close"></i>
        </span>
      </div>
    </div>
  ) : null;
});

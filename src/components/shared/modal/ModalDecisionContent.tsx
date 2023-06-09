import "./ModalDecisionContent.css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Divider } from "semantic-ui-react";

interface Props {
  actionName: string;
  actionCallback: () => void;
  futherDetail?: ReactJSXElement;
}

export default observer(function ModalDecisionContent({
  actionName,
  actionCallback,
  futherDetail,
}: Props) {
  const { commonStore } = useStore();

  return (
    <div>
      <div className="modal-decision-text">You are about to {actionName}</div>
      {futherDetail ? <Divider /> : null}

      <div className="">{futherDetail}</div>
      {futherDetail ? <Divider /> : null}
      <div className="mt-3 d-flex justify-content-center gap-3">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => {
            actionCallback();
            commonStore.setModalVisible(false);
          }}
        >
          Confirm
        </button>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => commonStore.setModalVisible(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
});

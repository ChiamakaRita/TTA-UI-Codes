import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import "./MyModal.css";

interface Props {
  visible: boolean;
}

export default observer(function MyModal({ visible }: Props) {
  const { commonStore } = useStore();

  return (
    <div
      className={`modal-container  ${!visible ? "hide-modal" : ""}`}
      onClick={() => commonStore.setModalVisible(false)}
    >
      <div
        className={`modal-content shadow-card ${!visible ? "d-none" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {commonStore.modalContent}
      </div>
    </div>
  );
});

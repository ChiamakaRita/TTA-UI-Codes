import { observer } from "mobx-react-lite";
import Header from "../../../shared/header/Header";
import CreateNewAssetForm from "./CreateNewAssetForm";

export default observer(function CreateNewAsset() {
  return (
    <>
      <Header />
      <CreateNewAssetForm />
    </>
  );
});

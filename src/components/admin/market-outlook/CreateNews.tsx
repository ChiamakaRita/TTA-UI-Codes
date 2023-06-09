import { observer } from "mobx-react-lite";
import CustomDefaultTabHeading from "../../shared/headings/CustomDefaultTabHeading";
import CreateOrEditMarketOutlookForm from "./CreateOrEditMarketOutlookForm";

export default observer(function CreateNews() {
  return (
    <>
      <CustomDefaultTabHeading content="Post New Article" />
      <div className="p-3 mt-3 shadow-card">
        <CreateOrEditMarketOutlookForm />
      </div>
    </>
  );
});

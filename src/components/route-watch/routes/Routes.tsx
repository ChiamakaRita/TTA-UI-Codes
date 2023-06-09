import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";
import CustomDefaultTabHeading from "../../shared/headings/CustomDefaultTabHeading";
import BasicHorizontalTab from "../../shared/horizontal-tab/BasicHorizontalTab";
import AllRoutes from "./AllRoutes";
import RouteTrackers from "./RouteTrackers";
import UploadRoutes from "./UploadRoutes";

export default observer(function Routes() {
  return (
    <>
      <CustomDefaultTabHeading content="Routes Management" />
      <BasicHorizontalTab
        tabs={[
          {
            text: "My Routes",
            icon: <Icon name="list" />,
          },
          {
            text: "Trackers",
            icon: <Icon name="tablet" />,
          },
          {
            text: "Upload Routes",
            icon: <Icon name="upload" />,
          },
        ]}
        panels={[<AllRoutes />, <RouteTrackers />, <UploadRoutes />]}
      />
    </>
  );
});

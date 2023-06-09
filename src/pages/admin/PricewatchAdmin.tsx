import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";
import AnalyticsDestinations from "../../components/admin/pricewatch/destinations/AnalyticsDestinations";
import AnalyticsOrigins from "../../components/admin/pricewatch/origins/AnalyticsOrigins";
import AnalyticsVariable from "../../components/admin/pricewatch/variables/AnalyticsVariable";
import Header from "../../components/shared/header/Header";
import CustomVerticalTab from "../../components/shared/vertical-tab/CustomVerticalTab";

export default observer(function PricewatchAdmin() {
  return (
    <>
      <Header />
      <CustomVerticalTab
        tabs={[
          { icon: <Icon name="book" />, text: "Variables Log" },
          { icon: <Icon name="code branch" />, text: "Origins" },
          { icon: <Icon name="warehouse" />, text: "Destinations" },
        ]}
        panels={[
          <AnalyticsVariable />,
          <AnalyticsOrigins />,
          <AnalyticsDestinations />,
        ]}
      />
    </>
  );
});

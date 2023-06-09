import { Icon } from "semantic-ui-react";
import CreateNews from "../../components/admin/market-outlook/CreateNews";
import MarketNewsHeadlines from "../../components/admin/market-outlook/MarketNewsHeadlines";
import Header from "../../components/shared/header/Header";
import CustomVerticalTab from "../../components/shared/vertical-tab/CustomVerticalTab";

export default function MarketOutlookAdmin() {
  return (
    <>
      <Header />
      <CustomVerticalTab
        tabs={[
          { icon: <Icon name="newspaper" />, text: "Market News" },
          { icon: <Icon name="pencil" />, text: "Create" },
        ]}
        panels={[<MarketNewsHeadlines />, <CreateNews />]}
      />
    </>
  );
}

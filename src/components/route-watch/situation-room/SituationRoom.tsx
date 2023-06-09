import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { customHistory } from "../../..";
import { useStore } from "../../../api/main/appStore";
import Header from "../../shared/header/Header";
import CustomVerticalTab from "../../shared/vertical-tab/CustomVerticalTab";
import Routes from "../routes/Routes";
import Shipments from "../shipments/Shipments";
import Transporters from "../shippers/Shippers";

export default observer(function SituationRoom() {
  const { userAccountStore } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!userAccountStore.user) customHistory.push("/account/login");
  }, [userAccountStore.user]);
  return (
    <>
      <Header />

      <CustomVerticalTab
        tabs={[
          { icon: <Icon name="exchange" />, text: "Routes" },
          { icon: <Icon name="shipping" />, text: "Shipments" },
          { icon: <Icon name="users" />, text: "Shippers" },
        ]}
        panels={[<Routes />, <Shipments />, <Transporters />]}
      />
    </>
  );
});

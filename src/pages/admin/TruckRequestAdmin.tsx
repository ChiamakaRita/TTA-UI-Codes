import { Icon } from "semantic-ui-react";
import Place from "../../components/admin/truck-request/places/Place";
import Header from "../../components/shared/header/Header";
import CustomVerticalTab from "../../components/shared/vertical-tab/CustomVerticalTab";

export default function TruckRequestAdmin() {
  return (
    <>
      <Header />
      <CustomVerticalTab
        tabs={[
          // { icon: <Icon name="building" />, text: "Companies" },
          { icon: <Icon name="road" />, text: "Places" },
          // { icon: <Icon name="male" />, text: "Vendors" },
        ]}
        panels={[
          // <Company />
          <Place />,
          // <Vendor />,
        ]}
      />
    </>
  );
}

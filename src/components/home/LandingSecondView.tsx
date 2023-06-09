import "./css/LandingSecondView.css";
import WhatWeDo from "./sub-components/what-we-do/WhatWeDo";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import AccountTypeForm from "../user-account/register/AccountTypeForm";
import { Icon } from "semantic-ui-react";

export default observer(function LandingSecondView() {
  const { commonStore } = useStore();

  return (
    <>
      <div className={`landing-second_view`}>
        <WhatWeDo
          icon={<Icon name="truck" />}
          heading="DO YOU WANT TO OUTSOURCE YOUR FLEET MAINTENANCE?"
          detail="Our truck maintenance services are designed just for your fleet."
          // btnFunc={() => commonStore.setModalContent(<AccountTypeForm />)}
          actionText="CONTACT US NOW!"
        />
        <WhatWeDo
          icon={<Icon name="search" />}
          heading="LOOKING  FOR TRUCK IN-TRANSIT BREAKDOWN RECOVERY?"
          detail="We have experienced technicians and equipped mobile workshop vans dedicated for truck breakdown recovery."
          // btnFunc={() => commonStore.setModalContent(<AccountTypeForm />)}
          actionText="CALL US NOW!"
        />
      </div>
    </>
  );
});

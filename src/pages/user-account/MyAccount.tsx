import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";

import { useStore } from "../../api/main/appStore";
import { useEffect } from "react";
import { customHistory } from "../..";
import CustomVerticalTab from "../../components/shared/vertical-tab/CustomVerticalTab";
import ModalDecisionContent from "../../components/shared/modal/ModalDecisionContent";
import UserProfile from "../../components/user-account/profile/UserProfile";
import Header from "../../components/shared/header/Header";
import AccountUsers from "../../components/user-account/users/AccountUsers";
import { hideByUserPosition } from "../../helper-functions/sharedFunctions";
import PrivateContent from "../../components/shared/private/PrivateContent";

export default observer(function MyAccount() {
  const { userAccountStore, commonStore } = useStore();

  useEffect(() => {
    if (userAccountStore.user === null) {
      customHistory.push("/account/login");
    }
  }, [userAccountStore.user, userAccountStore]);

  if (userAccountStore.user === null) return <></>;

  return (
    <>
      <Header />
      <CustomVerticalTab
        tabs={[
          { icon: <Icon name="user" />, text: "Profile" },
          {
            icon: <Icon name="users" />,
            text: "Account Users",
            hidden: hideByUserPosition(userAccountStore.user),
          },
          {
            icon: <Icon name="sign-out" />,
            text: "Log out",
            callbackFn: () =>
              commonStore.setModalContent(
                <ModalDecisionContent
                  actionName="logout of this application"
                  actionCallback={userAccountStore.logout}
                />
              ),
          },
        ]}
        panels={[
          <UserProfile user={userAccountStore.user} />,
          <PrivateContent
            decisionToHide={hideByUserPosition(userAccountStore.user)}
            content={<AccountUsers />}
          />,
        ]}
      />
    </>
  );
});

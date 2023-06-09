import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import { UserData } from "../../../api/models/userAccount";
import CustomDefaultTabHeading from "../../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../../shared/table/SimpleTable";
import "./AccountUsers.css";
import AddToOrganisation from "./AddToOrganisation";
import ChangeRole from "./ChangeRole";

export default observer(function AccountUsers() {
  const { userAccountStore, commonStore } = useStore();

  useEffect(() => {
    (async function getData() {
      await userAccountStore.usersInOrganisation(
        userAccountStore.user?.organisationId!
      );
    })();
  }, [userAccountStore]);

  const handleOnClickUser = (el: UserData) => {
    return userAccountStore.isAdmin
      ? commonStore.setModalContent(<ChangeRole data={el} />)
      : null;
  };

  if (userAccountStore.user === null) return <></>;

  return (
    <>
      <CustomDefaultTabHeading content="Account Users" />

      <div className="shadow-card p-3">
        <SimpleTable
          titles={
            userAccountStore.isAdmin
              ? ["Name", "Email", "Phone", "Role"]
              : ["Name", "Email", "Phone"]
          }
          data={userAccountStore.usersInOrg}
          tableBodyBuilder={(el) => (
            <tr
              key={el.id}
              className="pointer-cursor"
              onClick={() => handleOnClickUser(el)}
            >
              <td>{`${el.firstName} ${el.lastName}`}</td>
              <td>{el.email}</td>
              <td>{el.phone}</td>
              {userAccountStore.isAdmin && <td>{el.roles.join(", ")}</td>}
            </tr>
          )}
        />

        <Button
          content="Add New User"
          type="submit"
          color="vk"
          icon="plus"
          className="official-form-btn"
          onClick={() => commonStore.setModalContent(<AddToOrganisation />)}
        />
      </div>
    </>
  );
});

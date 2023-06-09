import { observer } from "mobx-react-lite";
import AdminOverviewContent from "../../components/admin/overview/AdminOverviewContent";
import Header from "../../components/shared/header/Header";

export default observer(function AdminOverview() {
  return (
    <>
      <Header />
      <AdminOverviewContent />
    </>
  );
});

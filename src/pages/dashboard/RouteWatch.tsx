import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Header from "../../components/shared/header/Header";
import RouteWatchOverview from "../../components/route-watch/RouteWatchOverview";
import { customHistory } from "../..";
import { useStore } from "../../api/main/appStore";

export default observer(function RouteWatch() {
  const { userAccountStore } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!userAccountStore.user) customHistory.push("/account/login");
  }, [userAccountStore.user]);

  return (
    <>
      <Header />
      <RouteWatchOverview />
    </>
  );
});

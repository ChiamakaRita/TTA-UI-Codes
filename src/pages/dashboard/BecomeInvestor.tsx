import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { customHistory } from "../..";
import { useStore } from "../../api/main/appStore";

import BecomeInvestorContent from "../../components/become-investor/BecomeInvestorContent";
import BecomeInvestorForm from "../../components/become-investor/BecomeInvestorForm";
import Header from "../../components/shared/header/Header";

export default observer(function BecomeInvestor() {
  const { userAccountStore } = useStore();

  const products = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!userAccountStore.user) customHistory.push("/account/login");
    window.scrollTo(0, 0);
  }, [userAccountStore.user]);

  const scrollToOurProducts = () => {
    products.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (userAccountStore.user === null) return <></>;

  return (
    <div>
      <Header />

      <BecomeInvestorContent learnMoreBtn={scrollToOurProducts} />
      <div ref={products}>
        <BecomeInvestorForm data={userAccountStore.user} />
      </div>
    </div>
  );
});

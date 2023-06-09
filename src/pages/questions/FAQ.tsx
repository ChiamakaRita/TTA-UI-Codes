import { useEffect } from "react";
import Header from "../../components/shared/header/Header";
import AppFaq from "../../components/faq/FAQ";
import Navbar from "../../components/shared/servicenavbar/Navbar";


export default function Questions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* <Header /> */}
      <Navbar/>
     <AppFaq/>
    </div>
  );
}

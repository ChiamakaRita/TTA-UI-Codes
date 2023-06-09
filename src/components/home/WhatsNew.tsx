import "./css/WhatNew.css";
import WhatIsNew from "./sub-components/what-is-new/WhatIsNew";

export default function WhatsNew() {
  return (
    <div className="whats-new">
      <h1 className="whats-new_title text-center">What we offer</h1>
      <div className="row">
        <div className="col-lg-4">
          <WhatIsNew
            productName="route watch analytics"
            catchyTitle="Stay ahead of the game with"
            catchyList={[
              "Real-time load tracking and reporting",
              "Route Demand Analysis",
              "Real-time Road Condition",
              "Profitable Route Analysis",
            ]}
            position={1}
          />
        </div>

        <div className="col-lg-4 mt-3 mt-lg-0">
          <WhatIsNew
            productName="Truck Investment &amp; Management"
            catchyTitle="Use historical and real-time data to"
            catchyList={[
              "Forecast Truck Investment ROI",
              "Invest in Truck, while",
              "We manage it for you",
              "As you relax and earn monthly Income",
            ]}
            position={2}
          />
        </div>

        <div className="col-lg-4 mt-3 mt-lg-0">
          <WhatIsNew
            productName="price watch analytics"
            catchyTitle="Thanks to Price Watch Analytics, you can now"
            catchyList={[
              "Perform Competitive Price Analysis",
              "Predict Load Prices On Different Routes",
              "Generate Reports",
            ]}
            position={3}
          />
        </div>
      </div>
    </div>
  );
}

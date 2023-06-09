import "./TruckUpdateTimeline.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { useStore } from "../../../api/main/appStore";
import {
  TruckUpdateData,
  TruckUpdateTimelineData,
} from "../../../api/models/truck-portal/truckPortal";
import { BiCurrentLocation } from "react-icons/bi";
import { BsFillSkipBackwardFill } from "react-icons/bs";
import { customHistory } from "../../..";

export default function TruckUpdateTimeline() {
  const location = useLocation();
  const { truckPortalStore, commonStore } = useStore();
  const [timelines, setTimelines] = useState<TruckUpdateTimelineData[]>([]);

  let passedData: TruckUpdateData | null = null;

  if (location.state) {
    //   @ts-ignore
    passedData = JSON.parse(`${location.state.data}`);
  }

  useEffect(() => {
    commonStore.setShowFooter(false);
    if (passedData) {
      (async () => {
        const res = await truckPortalStore.getTruckUpdateTimelines(
          passedData.requestId
        );

        setTimelines(res);
      })();
    } else {
      customHistory.push("/dashboard/truck-request-portal");
    }
  }, []);

  if (passedData === null) {
    customHistory.push("/dashboard/truck-request-portal");
  }

  if (!passedData) {
    return <></>;
  }

  return (
    <div className="timeline-container">
      <span className="back-arrow" onClick={() => commonStore.goBack()}>
        <BsFillSkipBackwardFill />
      </span>

      <h1 className="title">
        {passedData.origin} to {passedData.destination}
      </h1>
      <h3 className="text-center">{passedData.truckNumber}</h3>
      <VerticalTimeline className="timeline-box">
        {timelines.map((timeline) => {
          return (
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              key={timeline.id}
              contentArrowStyle={{
                borderRight: "15px solid  rgb(0, 0, 0)",
              }}
              dateClassName="date"
              iconStyle={{
                background: "#aaa",
                color: "#fff",
              }}
              icon={<BiCurrentLocation />}
            >
              <span className="date-added">{timeline.dateAdded}</span>
              <h4 className="vertical-timeline-element-title">
                <span className="text-secondary">Location</span>:{" "}
                {timeline.currentLocation}
              </h4>
              <p className="vertical-timeline-element-subtitle">
                Distance Left : {timeline.remainingDistance} km
              </p>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
}

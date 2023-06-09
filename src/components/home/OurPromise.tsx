import { useRef, useState, useEffect } from "react";
import "./css/OurPromise.css";

export default function OurPromise() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio > 0) {
        setVisible(true);
      }
    }, {});

    if (headRef.current) {
      observer.observe(headRef.current);
    }

    if (bodyRef.current) {
      observer.observe(bodyRef.current);
    }
  }, [headRef, bodyRef]);
  return (
    <div className="our-promise_container">
      <div className="our-promise">
        <h3
          className={`our-promise_heading ${visible ? "comeright" : ""}`}
          ref={headRef}
        >
          OUR PROMISE
        </h3>

        <p
          className={`our-promise_text ${visible ? "comeleft" : ""}`}
          ref={bodyRef}
        >
          Gauranteed maximum vehicle uptime that keeps your fleets running and
          your business moving forward!
        </p>
      </div>
    </div>
  );
}

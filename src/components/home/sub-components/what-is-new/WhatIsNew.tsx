import { customHistory } from "../../../..";
import "./WhatIsNew.css";

interface Props {
  productName: string;
  catchyTitle: string;
  catchyList: string[];
  position: number;
}

export default function WhatIsNew({
  productName,
  catchyTitle,
  catchyList,
  position,
}: Props) {
  return (
    <div className="whats-new_card">
      <div className="whats-new_card-side whats-new_card-side__front">
        <div
          className={`product-card_picture product-card_picture-${position}`}
        ></div>
        <h3 className="product-card_heading">
          <span className={`product-card_span product-card_span-${position}`}>
            {productName}
          </span>
        </h3>

        <div className={`product-card_details`}>
          <p>{catchyTitle} :</p>
          <ul>
            {catchyList.map((el, i) => (
              <li key={i}>{el}</li>
            ))}
          </ul>
        </div>

        <span
          className={`whats-new_card-btn product-btn-${position}`}
          onClick={() => customHistory.push("/service")}
        >
          Learn More...
        </span>
      </div>
    </div>
  );
}

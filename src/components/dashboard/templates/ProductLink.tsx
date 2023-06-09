import { Link } from "react-router-dom";
import "./ProductLink.css";
import ProductDescription from "./ProductDescription";
import CustomToolTip from "../../shared/tooltips/CustomToolTip";

interface Props {
  to: string;
  name: string;
  imageName: string;
  bgColor: string;
  description: string;
  noIcon?: boolean;
}

export default function ProductLink({
  to,
  name,
  imageName,
  bgColor,
  description,
  noIcon,
}: Props) {
  return (
    <CustomToolTip
      trigger={
        <Link
          className="product-container_box"
          to={to}
          style={{ backgroundColor: `${bgColor}` }}
        >
          <div className="product-container_icon">
            {noIcon ? null : (
              <img
                src={`/images/${imageName}`}
                alt="naira"
                className=" img-fluid"
              />
            )}
          </div>
          <div className="product-container_name">{name}</div>
        </Link>
      }
      content={
        <ProductDescription
          productName={name}
          productDescription={description}
        />
      }
    />
  );
}

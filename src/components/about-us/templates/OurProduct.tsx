import "./OurProduct.css";
interface Props {
  name: string;
  description: string;
  optional?: string;
  subtitle?: string;
  position: number;
  imgUrl: string;
}

export default function OurProduct({
  name,
  description,
  optional,
  position,
  subtitle,
  // imgUrl,
}: Props) {
  return (
    <div className={`row about-page-bg-${position}`}>
      <div className={`what-we-bring col-md-7 order-1 order-md-${position}`}>
        <h2>{name}</h2>
        <p>{subtitle}</p>
        <p>{description}</p>
        <p>{optional}</p>
      </div>
      <div className={`col-md-5 order-2 order-md-${position === 1 ? 2 : 1}`}>
        {/* <img
          alt={imgUrl.split(".")[0]}
          src={imgUrl}
          className="what-we-bring-img img-fluid"
        /> */}
      </div>
    </div>
  );
}

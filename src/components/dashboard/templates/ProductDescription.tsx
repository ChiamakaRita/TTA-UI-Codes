import "./ProductDescription.css";

interface Props {
  productName: string;
  productDescription: string;
}

export default function ProductDescription({
  productName,
  productDescription,
}: Props) {
  return (
    <div className="product-description_box">
      <h2 className="product-description_title">{productName}</h2>

      <p className="product-description_detail">{productDescription}</p>
    </div>
  );
}

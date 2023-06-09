import "./PricewatchBackground.css";

interface Props {
  children: React.ReactNode;
}

export default function PricewatchBackground({ children }: Props) {
  return <div className="pricewatch-container">{children}</div>;
}

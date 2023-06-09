import "./TruckPortalBackground.css";

interface Props {
  children: React.ReactNode;
}

export default function TruckPortalBackground({ children }: Props) {
  return <div className="truck-portal-container">{children}</div>;
}

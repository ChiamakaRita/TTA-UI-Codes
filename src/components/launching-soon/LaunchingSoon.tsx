import "./LaunchingSoon.css";

interface Props {
  name: string;
  detail: string;
}

export default function LaunchingSoon({ name, detail }: Props) {
  return (
    <div className="launching-soon-container">
      <h4 className="launching-soon-title">
        This feature will be launched soon
      </h4>

      <div className="launching-soon-detail">
        <span className="launching-soon-product">{name}</span> - {detail}
      </div>
    </div>
  );
}

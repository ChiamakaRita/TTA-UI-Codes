import "./DescribeUs.css";

interface Props {
  learnMoreBtn: () => void;
}

export default function DescribeUs({ learnMoreBtn }: Props) {
  return (
    <div className="describe-us-container">
      <div className="describe-us-card comeleft">
        <h2>THE TRUCK ARENA AT A GLANCE</h2>
        <p>
          The Truck Arena is set up with a clear focus on delivering maximum
          vehicle uptime to ensure fleet owners focus on their core operations.
          With advanced diagnostic equipment, highly qualified service
          technicians and a comprehensive suite of service, our clients are
          assured of minimal monthly cost on truck repairs and maintenance.
        </p>
        {/* <button onClick={learnMoreBtn}>Learn More </button> */}
      </div>
    </div>
  );
}

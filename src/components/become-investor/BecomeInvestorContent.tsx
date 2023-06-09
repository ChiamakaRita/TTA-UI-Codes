import "./BecomeInvestorContent.css";

interface Props {
  learnMoreBtn: () => void;
}

export default function BecomeInvestorContent({ learnMoreBtn }: Props) {
  return (
    <div className="investor-apply-container">
      <div className="investor-apply-card comeleft">
        <h2>Become An Investor</h2>
        <p>
          Own trucks in the haulage sector while we manage all logistics and you
          track your earnings from anywhere in the world.
        </p>
        <button onClick={learnMoreBtn}>Apply Now </button>
      </div>
    </div>
  );
}

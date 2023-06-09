import { Icon } from "semantic-ui-react";
import "./NoResult.css";

interface Props {
  content?: string;
}

export default function NoResult({ content }: Props) {
  return (
    <div className="not-result-container">
      <div className="not-result-icon">
        <Icon name="database" />
      </div>
      <div className="not-result-message">
        {content ? content : "No data available"}
      </div>
    </div>
  );
}

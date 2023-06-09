import exportFromJSON from "export-from-json";
import { Icon } from "semantic-ui-react";
import "./PageSizeAndExport.css";

interface Props {
  fileName: string;
  data: object[];
  handlePageSizeChange: (size: number) => void;
}

export default function PageSizeAndExport({
  handlePageSizeChange,
  fileName,
  data,
}: Props) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>
        Page Size :{" "}
        <select
          className="inline-text-input"
          onChange={(e) => handlePageSizeChange(+e.target.value)}
        >
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
        </select>
      </div>

      <div
        className="export-button shadow-card"
        onClick={() => exportFromJSON({ data, fileName, exportType: "csv" })}
      >
        <Icon name="download" /> Export
      </div>
    </div>
  );
}

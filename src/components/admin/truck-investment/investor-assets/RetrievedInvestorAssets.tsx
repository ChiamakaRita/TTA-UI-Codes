import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { FleetData } from "../../../../api/models/truck-investment/asset";
import { InvestorData } from "../../../../api/models/truck-investment/investor";
import { DateOnlyFormat } from "../../../../helper-functions/sharedFunctions";
import SimpleTable from "../../../shared/table/SimpleTable";

interface Props {
  data: FleetData[];
  investorDetail: InvestorData;
}

export default observer(function RetrievedInvestorAssets({
  data,
  investorDetail,
}: Props) {
  return (
    <div className="shadow-card p-3 mt-3">
      <h5>
        Name:{" "}
        <small className="text-secondary">{`${investorDetail.firstName} ${investorDetail.lastName}`}</small>{" "}
      </h5>
      <h5>
        Unique Code:{" "}
        <small className="text-secondary">
          {`${investorDetail.investorCode}`}{" "}
        </small>
      </h5>

      <h5>
        Total Assets: <small className="text-secondary">{data.length}</small>
      </h5>

      <SimpleTable
        titles={[
          "Truck No.",
          "Model",
          "Type",
          "Size (in tons)",
          "Insurance Expires",
          "",
        ]}
        data={data}
        tableBodyBuilder={(el) => (
          <tr key={el.id}>
            <td>{el.truckNumber}</td>
            <td>{el.truckModel}</td>
            <td>{el.truckType}</td>
            <td>{el.truckSize}</td>
            <td>{DateOnlyFormat(el.insuranceExpiryDate)}</td>
            <td>
              <Button
                content="manage"
                onClick={() => console.log("")}
                size="tiny"
                disabled
              />
            </td>
          </tr>
        )}
      />

      <Button
        as={Link}
        to={`/admin/truck-investment/create-new-asset/${investorDetail.id}`}
        className="official-form-btn"
        color="vk"
      >
        Add New Asset
      </Button>
    </div>
  );
});

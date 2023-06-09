import { Divider } from "semantic-ui-react";
import { TruckActivityRecord } from "../../api/models/truck-investment/revenue";
import {
  DateOnlyFormat,
  NairaFormatter,
} from "../../helper-functions/sharedFunctions";

interface Props {
  data: TruckActivityRecord;
}

export default function MiscellaneousDetail({ data }: Props) {
  return (
    <>
      <h4>Miscellaneous Expenses for {data.truckNumber}</h4>
      <h5>{data.route}</h5>
      <small>{DateOnlyFormat(data.dateModified)}</small>

      <Divider />

      {data.miscellaneousExpenses.map((el) => {
        return (
          <p key={el.id}>
            {el.title} = {NairaFormatter(el.amount)}
          </p>
        );
      })}
    </>
  );
}

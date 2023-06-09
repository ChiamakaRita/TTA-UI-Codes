import { RevenueData } from "../../../../api/models/truck-investment/revenue";
import { DateOnlyFormat } from "../../../../helper-functions/sharedFunctions";
import AddMiscellaneousExpense from "./AddMiscellaneousExpense";

interface Props {
  data: RevenueData;
}

export default function MiscellaneousExpense({ data }: Props) {
  return (
    <>
      <h4>Miscellaneous Expense for {data.truckNumber}</h4>
      <h5>{data.route}</h5>
      <small>Created on : {DateOnlyFormat(data.dateAdded)}</small>

      <AddMiscellaneousExpense revenueData={data} />
    </>
  );
}

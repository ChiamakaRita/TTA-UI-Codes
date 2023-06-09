import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import "./SimpleTable.css";

interface Props<T> {
  titles: string[];
  data: T[];
  tableBodyBuilder: (el: T, idx: number) => ReactJSXElement;
}

export default function SimpleTable<T>({
  titles,
  data,
  tableBodyBuilder,
}: Props<T>) {
  return (
    <div className="table-responsive simple-table-container">
      <table className="table table-bordered">
        <thead>
          <tr>
            {titles.map((el, i) => (
              <th className="th-style" key={i}>
                {el}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="border-top-0">{data.map(tableBodyBuilder)}</tbody>
      </table>
    </div>
  );
}

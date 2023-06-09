import { Form, Formik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button } from "semantic-ui-react";
import {
  AvailableMonths,
  TruckActivityRecord,
} from "../../api/models/truck-investment/revenue";
import { useStore } from "../../api/main/appStore";
import { CustomSelect } from "../shared/custom-input/CustomInputs";
import SimpleTable from "../shared/table/SimpleTable";
import {
  DateOnlyFormat,
  NairaFormatter,
} from "../../helper-functions/sharedFunctions";
import CustomDefaultTabHeading from "../shared/headings/CustomDefaultTabHeading";
import MiscellaneousDetail from "./MiscellaneousDetail";

interface Props {
  availableMonths: AvailableMonths[];
  availableYears: number[];
}

export default observer(function TruckActivities({
  availableMonths,
  availableYears,
}: Props) {
  const [searched, setSearched] = useState(false);
  const { investorStore, revenueStore, commonStore } = useStore();

  const handleGetTruckActivityRecords = async (
    investorId: number,
    month: number,
    year: number
  ) =>
    revenueStore
      .getTruckActivityRecords(investorId, month, year)
      .finally(() => setSearched(true));

  const handleSeeDetails = async (value: TruckActivityRecord) => {
    return commonStore.setModalContent(<MiscellaneousDetail data={value} />);
  };
  return (
    <>
      <CustomDefaultTabHeading content="Transaction Records" />

      <div className="p-3 mt-3 shadow-card">
        <h5>Truck Activity Records</h5>

        <Formik
          initialValues={{
            investorId: investorStore.investorId,
            month: 0,
            year: 0,
          }}
          onSubmit={(values) =>
            handleGetTruckActivityRecords(
              Number(values.investorId),
              values.month,
              values.year
            )
          }
          validationSchema={Yup.object({
            investorId: Yup.number().required(),
            month: Yup.number().required(),
            year: Yup.number().required(),
          })}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form>
              <div className="row">
                <div className="col-md-6">
                  <CustomSelect
                    label="Enter Month"
                    name="month"
                    children={
                      <>
                        <option value={""}>Select activity month</option>
                        {availableMonths.map((el) => (
                          <option value={el.value} key={el.value}>
                            {el.monthName}
                          </option>
                        ))}
                      </>
                    }
                    required
                  />
                </div>
                <div className="col-md-6 mt-2 mt-md-0">
                  <CustomSelect
                    label="Enter Year"
                    name="year"
                    children={
                      <>
                        <option value={""}>Select activity year</option>
                        {availableYears.map((el) => (
                          <option value={el} key={el}>
                            {el}
                          </option>
                        ))}
                      </>
                    }
                    required
                  />
                </div>
              </div>
              <Button
                className="official-form-btn"
                content="Fetch Record"
                color="vk"
                type="submit"
                loading={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>

      {searched ? (
        <div className="shadow-card p-3 mt-3">
          <SimpleTable
            titles={[
              "Route",
              "Truck",
              "Price",
              "Diesel Cost",
              "Driver's Wage",
              "Management Fee",
              "Miscellaneous Cost",
              "Debt Repaid",
              "Profit",
              "Date",
            ]}
            data={revenueStore.truckActivityRecords}
            tableBodyBuilder={(el) => (
              <tr key={el.id}>
                <td>{el.route}</td>
                <td>{el.truckNumber}</td>
                <td>{NairaFormatter(el.tripPrice)}</td>
                <td>{NairaFormatter(el.dieselCost)}</td>
                <td>{NairaFormatter(el.driverWage)}</td>
                <td>{NairaFormatter(el.managementCost)}</td>
                <td className="d-flex justify-content-between gap-2 align-items-center">
                  <span>{NairaFormatter(el.miscellaneous)}</span>
                  <Button
                    content="view"
                    size="tiny"
                    className="p-2"
                    color="twitter"
                    onClick={() => handleSeeDetails(el)}
                  />
                </td>
                <td>{NairaFormatter(el.debtPaid)}</td>
                <td>{NairaFormatter(el.grossProfit)}</td>
                <td>{DateOnlyFormat(el.dateModified)}</td>
              </tr>
            )}
          />
        </div>
      ) : null}
    </>
  );
});

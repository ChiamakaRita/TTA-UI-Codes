import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useStore } from "../../../../api/main/appStore";
import {
  AvailableMonths,
  TruckActivityRecord,
} from "../../../../api/models/truck-investment/revenue";
import {
  DateOnlyFormat,
  NairaFormatter,
} from "../../../../helper-functions/sharedFunctions";
import { CustomSelect } from "../../../shared/custom-input/CustomInputs";
import SimpleTable from "../../../shared/table/SimpleTable";
import MiscellaneousDetail from "../../../truck-investor-account/MiscellaneousDetail";

interface Props {
  availableMonths: AvailableMonths[];
  availableYears: number[];
}

const TODAY = new Date();
const CURRENT_MONTH = TODAY.getMonth() + 1;
const CURRENT_YEAR = TODAY.getFullYear();

export default observer(function RevenueRecord({
  availableMonths,
  availableYears,
}: Props) {
  const { revenueStore, commonStore, investorStore } = useStore();

  useEffect(() => {
    (async function getDefaultData() {
      if (investorStore.selectedInvestor) {
        await revenueStore.getTruckActivityRecords(
          investorStore.selectedInvestor.id,
          CURRENT_MONTH,
          CURRENT_YEAR
        );
      }
    })();
  }, [revenueStore, investorStore.selectedInvestor]);

  const handleSeeDetails = async (value: TruckActivityRecord) => {
    return commonStore.setModalContent(<MiscellaneousDetail data={value} />);
  };

  if (investorStore.selectedInvestor === null) {
    return <></>;
  }
  return (
    <div className="p-3">
      <Formik
        initialValues={{
          month: CURRENT_MONTH,
          year: CURRENT_YEAR,
        }}
        onSubmit={(values) =>
          revenueStore.getTruckActivityRecords(
            investorStore.selectedInvestor!.id,
            values.month,
            values.year
          )
        }
        validationSchema={Yup.object({
          month: Yup.number().required(),
          year: Yup.number().required(),
        })}
      >
        {({ isSubmitting }) => (
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

      {revenueStore.truckActivityRecords ? (
        <div className="shadow-card p-3 mt-3">
          <SimpleTable
            titles={[
              "Date",
              "Truck",
              "Trip",
              "Price",
              "Diesel",
              "Driver",
              "Management",
              "Miscellaneous",
              "Debt Repaid",
              "Profit",
            ]}
            data={revenueStore.truckActivityRecords}
            tableBodyBuilder={(el) => (
              <tr key={el.id}>
                <td>{DateOnlyFormat(el.dateModified)}</td>
                <td>{el.truckNumber}</td>
                <td>{el.route}</td>
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
                    color="vk"
                    onClick={() => handleSeeDetails(el)}
                  />
                </td>
                <td>{NairaFormatter(el.debtPaid)}</td>
                <td>{NairaFormatter(el.grossProfit)}</td>
              </tr>
            )}
          />
        </div>
      ) : null}
    </div>
  );
});

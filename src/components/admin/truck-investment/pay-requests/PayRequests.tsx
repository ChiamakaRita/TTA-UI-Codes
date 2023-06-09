import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../../api/main/appStore";
import { PaymentRequestModel } from "../../../../api/models/truck-investment/payment";
import {
  DateOnlyFormat,
  NairaFormatter,
} from "../../../../helper-functions/sharedFunctions";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import NoResult from "../../../shared/no-result/NoResult";
import SimpleTable from "../../../shared/table/SimpleTable";
import PayRequest from "./PayRequest";

export default observer(function PayRequests() {
  const { paymentStore, commonStore } = useStore();

  useEffect(() => {
    (async function getData() {
      await paymentStore.getPaymentRequests();
    })();
  }, [paymentStore]);

  const handleSeeDetails = async (value: PaymentRequestModel) => {
    const modalInformation = await paymentStore.handlePayRequestDetail(value);

    return commonStore.setModalContent(<PayRequest data={modalInformation} />);
  };

  return (
    <>
      <CustomDefaultTabHeading content="Pay Requests" />

      {paymentStore.paymentRequests.length !== 0 ? (
        <div className="shadow-card p-3">
          <SimpleTable
            titles={["Date Requested", "Amount", ""]}
            data={paymentStore.paymentRequests}
            tableBodyBuilder={(el) => (
              <tr key={el.id}>
                <td>{DateOnlyFormat(el.dateAdded)}</td>
                <td>{NairaFormatter(el.amountRequested)}</td>
                <td>
                  {" "}
                  <button
                    className="btn btn-secondary text-light btn-sm"
                    onClick={() => handleSeeDetails(el)}
                  >
                    see details
                  </button>
                </td>
              </tr>
            )}
          />
        </div>
      ) : (
        <NoResult content="No Pending Pay Request " />
      )}
    </>
  );
});

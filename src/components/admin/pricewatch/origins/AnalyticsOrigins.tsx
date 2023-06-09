import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../../../shared/table/SimpleTable";
import AddNewOrigin from "./AddNewOrigin";

export default observer(function AnalyticsOrigins() {
  const { pricewatchStore, commonStore } = useStore();

  useEffect(() => {
    if (pricewatchStore.origins.length === 0) {
      (async function getData() {
        await pricewatchStore.getOrigins();
      })();
    }
  }, [pricewatchStore]);

  return (
    <>
      <CustomDefaultTabHeading content="Pricewatch Analytics Origins" />

      <div className="shadow-card p-3">
        <SimpleTable
          titles={["S/N", "Name"]}
          data={pricewatchStore.origins}
          tableBodyBuilder={(el, i) => (
            <tr key={el.id}>
              <td>{i + 1}</td>
              <td>{el.name}</td>
            </tr>
          )}
        />

        <Button
          content="Add New Origin"
          color="vk"
          className=" official-form-btn"
          onClick={() => commonStore.setModalContent(<AddNewOrigin />)}
        />
      </div>
    </>
  );
});

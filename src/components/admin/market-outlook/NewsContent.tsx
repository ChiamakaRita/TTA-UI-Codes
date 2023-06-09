import { Divider } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import parse from "html-react-parser";
import { DateOnlyFormat } from "../../../helper-functions/sharedFunctions";
import { MarketOutlookData } from "../../../api/models/market-outlook/marketOutlook";
import { useStore } from "../../../api/main/appStore";
import { Button } from "semantic-ui-react";
import CustomSwitch from "../../shared/switch/CustomSwitch";
import CreateOrEditMarketOutlookForm from "./CreateOrEditMarketOutlookForm";
import ModalDecisionContent from "../../shared/modal/ModalDecisionContent";

interface Props {
  data: MarketOutlookData;
}
export default observer(function NewsContent({ data }: Props) {
  const { marketOutlookStore, commonStore } = useStore();

  return (
    <div>
      <small className="text-secondary">{DateOnlyFormat(data.created)}</small>
      {parse(`<div className="mt-2">
      ${data.content.replaceAll("\n", "<br/>")}
      </div>`)}

      <Divider />
      <div className="d-flex justify-content-between pt-3">
        <Button
          content="Edit"
          size="tiny"
          primary
          onClick={() =>
            commonStore.setModalContent(
              <CreateOrEditMarketOutlookForm currentData={data} />
            )
          }
        />
        <CustomSwitch
          active={data.active}
          callbackFn={(status) =>
            marketOutlookStore.editMarketOutlook(data, status)
          }
        />
        <Button
          content="Delete"
          color="red"
          size="tiny"
          onClick={() =>
            commonStore.setModalContent(
              <ModalDecisionContent
                actionName={`delete "${data.title}"`}
                actionCallback={() =>
                  marketOutlookStore.deleteMarketOutlook(data.id)
                }
              />
            )
          }
        />
      </div>
    </div>
  );
});

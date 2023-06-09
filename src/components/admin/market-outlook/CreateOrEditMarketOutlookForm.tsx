import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { MarketOutlookData } from "../../../api/models/market-outlook/marketOutlook";
import { useStore } from "../../../api/main/appStore";
import {
  CustomTextArea,
  CustomTextInput,
} from "../../shared/custom-input/CustomInputs";

interface Props {
  currentData?: MarketOutlookData | null;
}

export default observer(function CreateOrEditMarketOutlookForm({
  currentData,
}: Props) {
  const { marketOutlookStore, userAccountStore } = useStore();
  const INITIAL_VALUES = {
    title: currentData?.title ?? "",
    content: currentData?.content ?? "",
    active: currentData?.active ?? true,
    userId: userAccountStore.user?.recordId!,
  };

  return (
    <>
      <h5>{currentData ? "Edit Market Outlook" : "Add New Article"}</h5>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, { resetForm }) =>
          currentData
            ? marketOutlookStore.editMarketOutlook(
                {
                  ...values,
                  id: currentData.id,
                  created: currentData.created,
                },
                currentData.active
              )
            : marketOutlookStore
                .createMarketOutlook(values)
                .finally(() => resetForm({ values: INITIAL_VALUES }))
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="title"
              placeholder="Enter title"
              label="Title"
              required
            />

            <CustomTextArea
              name="content"
              placeholder="Enter description"
              label="Description"
              required
            />

            <Button
              loading={isSubmitting}
              content="Submit"
              type="submit"
              color="vk"
              className="official-form-btn"
            />
          </Form>
        )}
      </Formik>
    </>
  );
});

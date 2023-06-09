import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStore } from "../../../api/main/appStore";

const SAMPLE_FORMAT = (
  <Link
    className=" text-decoration-underline"
    to="/files/Origins_Destinations-ROUTEWATCH.xlsx"
    target="_blank"
    download
  >
    Download Sample Sheet
  </Link>
);

export default observer(function UploadRoutes() {
  const { userAccountStore, routeStore } = useStore();
  const [fieldValue, setFieldValue] = useState<any>();

  const INITIAL_VALUES = {
    excel: fieldValue,
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("excel", fieldValue);

    await routeStore.uploadRouteExcel(form);
  };

  if (userAccountStore.user === null) return <></>;

  return (
    <div className="p-3 mt-3 shadow-card">
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label className="input-label">
                Routes File [{SAMPLE_FORMAT}]
              </label>
              <input
                name="excel"
                type="file"
                onChange={(event) => {
                  setFieldValue(event.currentTarget.files?.[0]);
                }}
                accept=".xlsx,.xls"
                className="form-control mb-2"
                required
              />
            </div>

            <Button
              loading={isSubmitting}
              content="Proceed"
              type="submit"
              className="official-form-btn"
              color="vk"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
});

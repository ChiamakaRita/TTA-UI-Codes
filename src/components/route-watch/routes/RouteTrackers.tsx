import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import { CustomSelect } from "../../shared/custom-input/CustomInputs";
import RetrievedRouteDetails from "./RetrievedRouteDetails";

export default observer(function RouteTrackers() {
  const { routeStore } = useStore();

  useEffect(() => {
    (async function getData() {
      await routeStore.getAllRoutes();
    })();
  }, [routeStore]);

  const handleFetchingDetails = async (routeId: number) => {
    await routeStore.getRouteDetails(routeId);
  };

  return (
    <>
      <div className="shadow-card p-3 mt-3">
        <Formik
          initialValues={{ routeId: "" }}
          onSubmit={(values) => handleFetchingDetails(+values.routeId)}
        >
          {({ isSubmitting }) => (
            <Form>
              <CustomSelect
                label="Select a route"
                name="routeId"
                children={
                  <>
                    <option value={""}>Select a route</option>

                    {routeStore.allRoutes.map((el) => (
                      <option key={el.id} value={el.id}>
                        {el.name}
                      </option>
                    ))}
                  </>
                }
                required
              />
              <Button
                className="official-form-btn"
                content="Fetch Trackers"
                type="submit"
                color="vk"
                loading={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>

      {routeStore.isTrackerFetched && routeStore.currentRouteDetail && (
        <RetrievedRouteDetails data={routeStore.currentRouteDetail} />
      )}
    </>
  );
});

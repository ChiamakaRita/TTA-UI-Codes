import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { TrackerData } from "../../../api/models/route-watch/routes";
import { useStore } from "../../../api/main/appStore";
import { CustomSelect } from "../../shared/custom-input/CustomInputs";

interface Props {
  tracker: TrackerData;
  routeId: number;
}
export default observer(function ReassignTracker({ tracker, routeId }: Props) {
  const { routeStore, userAccountStore } = useStore();

  return (
    <>
      <h5>Which route do you want to re-assign this tracker to ?</h5>
      <Formik
        initialValues={{
          newrouteId: 0,
          error: null,
        }}
        onSubmit={(values) =>
          routeStore.reassingTracker(
            userAccountStore.user?.organisationId!,
            routeId,
            +tracker.id,
            +values.newrouteId
          )
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomSelect
              name="newrouteId"
              label="Choose a route"
              children={
                <>
                  <option value={""}></option>

                  {routeStore.allRoutes
                    .filter((x) => x.id !== routeId)
                    .map((el) => (
                      <option key={el.id} value={el.id}>
                        {el.name}
                      </option>
                    ))}
                </>
              }
              required
            />

            <Button
              loading={isSubmitting}
              content="Complete"
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

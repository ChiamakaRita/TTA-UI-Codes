import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import { Origin } from "../../../../api/models/price-watch/pricewatch";
import { CustomSelect } from "../../../shared/custom-input/CustomInputs";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../../../shared/table/SimpleTable";
import AddNewDestination from "./AddNewDestination";

export default observer(function AnalyticsDestinations() {
  const { pricewatchStore, commonStore } = useStore();

  const [origins, setOrigins] = useState<Origin[]>([]);
  const [isDataRequested, setIsDataRequested] = useState(false);
  const [selectedOrigin, setSelectedOrigin] = useState<Origin | undefined>(
    undefined
  );

  useEffect(() => {
    (async function getData() {
      await pricewatchStore.getOrigins();
      setOrigins(pricewatchStore.origins);
    })();
  }, [pricewatchStore]);

  const handleGetDestinations = async (originId: number) => {
    await pricewatchStore.getDestinations(originId);

    setSelectedOrigin(pricewatchStore.origins.find((el) => el.id === originId));
    setIsDataRequested(true);
  };

  return (
    <>
      <CustomDefaultTabHeading content="Pricewatch Analytics Destinations" />
      <div className="p-3 shadow-card">
        <Formik
          initialValues={{ originId: "" }}
          onSubmit={(values) => handleGetDestinations(+values.originId)}
        >
          {({ isSubmitting }) => (
            <Form>
              <CustomSelect
                label="Select an origin"
                name="originId"
                children={
                  <>
                    <option value={""}>Choose an origin</option>

                    {origins.map((el) => (
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
                content="Get Destinations"
                type="submit"
                color="vk"
                loading={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>
      {isDataRequested ? (
        <div className="shadow-card p-3 mt-3">
          <h5 className="text-secondary">
            {pricewatchStore.destinations.length} destinations retrieved
          </h5>
          <SimpleTable
            titles={["Name", "State"]}
            data={pricewatchStore.destinations}
            tableBodyBuilder={(el, i) => (
              <tr key={el.id}>
                <td>{el.name}</td>
                <td>{el.state}</td>
              </tr>
            )}
          />

          <Button
            content="Add New Destination"
            color="vk"
            className=" official-form-btn"
            onClick={() =>
              commonStore.setModalContent(
                <AddNewDestination data={selectedOrigin!} />
              )
            }
          />
        </div>
      ) : null}
    </>
  );
});

import { Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { InvestorData } from "../../../../api/models/truck-investment/investor";
import {
  InvestorClient,
  InvestorClientPrice,
} from "../../../../api/models/truck-investment/investorClients";
import { FleetData } from "../../../../api/models/truck-investment/asset";
import { useStore } from "../../../../api/main/appStore";
import {
  CustomDatePicker,
  CustomSelect,
} from "../../../shared/custom-input/CustomInputs";
import { contentCategory } from "../../../../local-data/shipment/contentCategory";

interface Props {
  verifiedInvestors: InvestorData[];
  investorClients: InvestorClient[];
}

export default observer(function CreateInvestorShipment({
  verifiedInvestors,
  investorClients,
}: Props) {
  const [trucks, setTrucks] = useState<FleetData[]>([]);
  const [clientRoutesAndPrices, setClientRouteAndPrices] = useState<
    InvestorClientPrice[]
  >([]);

  const { assetStore, investorClientStore, revenueStore } = useStore();

  const INITIAL_VALUES = {
    investorId: "",
    fleetId: "",
    clientId: "",
    routeId: "",
    goodsLoaded: "",
  };

  const handleGetTrucks = async (investorId: number) => {
    if (!investorId) return toast.error("You must first select an investor.");
    setTrucks([]);

    await assetStore.getAnInvestorFleet(investorId);

    if (assetStore.investorFleet.length === 0)
      return toast.warning("This investor have no registered fleet.");

    const availableTrucks = assetStore.investorFleet.filter(
      (el) => el.isInMaintenance === false
    );

    if (availableTrucks.length === 0)
      return toast.warning("Trucks under maintenance. No availabe truck!");

    setTrucks(availableTrucks);
  };

  const handleGetClientPrices = async (clientId: number) => {
    if (!clientId) return toast.error("You must first select a client.");
    setClientRouteAndPrices([]);

    await investorClientStore.getInvestorClientPrices(clientId);

    if (investorClientStore.investorClientPrices.length === 0)
      return toast.warning("The selected client has no price list");

    setClientRouteAndPrices(investorClientStore.investorClientPrices);
  };

  return (
    <div className="p-3 mt-3 shadow-card">
      <h5>Investor Shipment Create</h5>

      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={async (values, { resetForm }) => {
          const selectedTruck = trucks.find((e) => e.id === +values.fleetId);
          const selectedClientRoute = clientRoutesAndPrices.find(
            (e) => e.id === +values.routeId
          );

          if (!selectedTruck || !selectedClientRoute) {
            return toast.error("No selected truck or route");
          }
          const currentRoute = `${selectedClientRoute.origin} to ${selectedClientRoute.destination}`;

          await assetStore.updateAnInvestorFleet({
            ...selectedTruck,
            currentRoute: currentRoute,
            goodsLoaded: values.goodsLoaded,
            isInTransit: true,
          });

          const revenueValue = {
            fleetId: +values.fleetId,
            investorId: +values.investorId,
            truckNumber: selectedTruck.truckNumber,
            dieselCost: 0,
            driverWage: 0,
            miscellaneous: 0,
            tripPrice: selectedClientRoute.price,
            managementCost: 0,
            isConfirmed: false,
            dateAdded: new Date(),
            dateModified: new Date(),
            route: currentRoute,
            managementPercentage: 0,
            debtPaid: 0,
          };

          await revenueStore
            .createRevenue(revenueValue)
            .finally(() => resetForm({ values: INITIAL_VALUES }));
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <CustomSelect
              name="investorId"
              label="Investor Name"
              onFocus={() => setTrucks([])}
              children={
                <>
                  <option value={""}>Select an investor</option>
                  {verifiedInvestors.map((el) => (
                    <option key={el.uniqueId} value={el.id}>
                      {el.firstName} {el.lastName}
                    </option>
                  ))}
                </>
              }
              required
            />

            <CustomSelect
              name="fleetId"
              label="Truck Number"
              onFocus={() => handleGetTrucks(+values.investorId)}
              children={
                <>
                  <option value={"  "}>Select truck number</option>
                  {trucks
                    .filter((el) => !el.isInTransit)
                    .map((el) => (
                      <option key={el.uniqueId} value={el.id}>
                        {el.truckNumber} {`[${el.truckSize} tons]`}
                      </option>
                    ))}
                </>
              }
              required
            />

            <CustomSelect
              name="clientId"
              label="Client"
              onFocus={() => setClientRouteAndPrices([])}
              children={
                <>
                  <option value={""}>Select client for this shipment</option>

                  {investorClients.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
                </>
              }
              required
            />
            <CustomSelect
              name="routeId"
              label="Route"
              onFocus={() => handleGetClientPrices(+values.clientId)}
              children={
                <>
                  <option value={""}>Select route</option>

                  {clientRoutesAndPrices.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.origin}-to-{el.destination} {`[${el.truckSize} tons]`}
                    </option>
                  ))}
                </>
              }
              required
            />

            <CustomSelect
              name="goodsLoaded"
              label="Type of Goods Loaded"
              children={
                <>
                  <option value={""}>Enter type of goods</option>

                  {contentCategory.map((el) => (
                    <option key={el.value} value={el.value}>
                      {el.text}
                    </option>
                  ))}
                </>
              }
              required
            />

            <CustomDatePicker name="dateAdded" label="Date of Shipment" />

            <Button
              loading={isSubmitting}
              className="official-form-btn"
              content="Create Shipment"
              type="submit"
              color="vk"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
});

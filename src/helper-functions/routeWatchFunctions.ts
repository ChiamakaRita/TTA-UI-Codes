import { RouteDescription, RouteList } from "../api/models/route-watch/routes";
import { ShipmentData } from "../api/models/route-watch/shipments";

export const RouteFormatter = (data: RouteList[]): RouteDescription[] => {
  return data.map((el) => {
    const [origin, destination] = el.name.split("-to-");

    return {
      id: el.id,
      origin: origin.trim(),
      destination: destination.trim(),
    };
  });
};

function OriginAndDest(id: number, lookup: RouteList[]) {
  const output = lookup.find((el) => el.id === id);
  return {
    origin: output?.name.split("-to-")[0].trim(),
    destination: output?.name.split("-to-")[1].trim(),
  };
}

export const ActiveShipmentListBuilder = (
  routes: RouteList[],
  shipments: ShipmentData[]
) => {
  return shipments.map((el) => {
    return {
      origin: OriginAndDest(el.routeID, routes)?.origin,
      destination: OriginAndDest(el.routeID, routes)?.destination,
      recipient: el.recipientName,
      active: el.isActive,
      trackingNum: el.trackingNumber,
      truckNumber: el.truckNumber,
    };
  });
};

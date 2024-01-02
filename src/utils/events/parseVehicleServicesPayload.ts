import { VehicleServicesEvent, VehicleServicesEventPayload } from "@/types";
import { vehicleServicesParserMap } from "@/data/parser-maps";
import parsePayload from "@/utils/events/parsePayload";

const parseVehicleServicesPayload = <E extends VehicleServicesEvent>(
  event: E,
  payload: unknown,
): VehicleServicesEventPayload<E> =>
  parsePayload(
    event,
    payload,
    vehicleServicesParserMap,
  ) as VehicleServicesEventPayload<E>;

export default parseVehicleServicesPayload;

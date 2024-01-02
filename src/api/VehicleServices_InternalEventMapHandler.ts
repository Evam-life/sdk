import EventMapHandler from "@/api/EventMapHandler";
import {
  _InternalVehicleServicesEventPayloadInterface,
  VehicleServicesEventPayloadInterface,
} from "@/types/interfaces";

class VehicleServices_InternalEventMapHandler extends EventMapHandler<
  VehicleServicesEventPayloadInterface &
    _InternalVehicleServicesEventPayloadInterface
> {}

export default VehicleServices_InternalEventMapHandler;

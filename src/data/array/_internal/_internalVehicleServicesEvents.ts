import { VehicleServicesEvent } from "@/types";
import { _InternalVehicleServicesEventPayloadInterface } from "@/types/interfaces";

const obj: _InternalVehicleServicesEventPayloadInterface = {
  apiReady: undefined,
  navLayerDeleted: undefined,
  navLayerPointSet: undefined,
  navLayerShapeSet: undefined,
  vehicleServicesNotificationSent: undefined,
  rawRakelActionSent: undefined,
  vehicleServicesNotificationCallbackTriggered: undefined,
};

const _internalVehicleServicesEvents: ReadonlyArray<VehicleServicesEvent> =
  Object.keys(obj) as Array<VehicleServicesEvent>;

export default _internalVehicleServicesEvents;

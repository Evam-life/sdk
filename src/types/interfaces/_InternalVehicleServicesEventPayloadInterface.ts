import { _InternalVehicleServicesNotification } from "@/types/_internal/_InternalVehicleServicesNotification";
import { VehicleServicesNotificationCallbackId } from "@/types/vehicle-services/VehicleServicesNotificationCallbackId";

interface _InternalVehicleServicesEventPayloadInterface {
  rawRakelActionSent: string | undefined;
  vehicleServicesNotificationSent:
    | _InternalVehicleServicesNotification
    | undefined;
  navLayerPointSet: string | undefined;
  navLayerShapeSet: string | undefined;
  navLayerDeleted: string | undefined;
  apiReady: undefined;
  vehicleServicesNotificationCallbackTriggered:
    | VehicleServicesNotificationCallbackId
    | undefined;
  makeCall: string;
  answerCall: string;
  hangUpCall: string;
  holdCall: string;
  unholdCall: string;
  muteMicrophone: undefined;
  unmuteMicrophone: undefined;
}

export type { _InternalVehicleServicesEventPayloadInterface };

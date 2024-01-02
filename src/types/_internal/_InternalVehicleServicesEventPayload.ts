import { EventPayloadType } from "@/types/_internal/EventPayloadType";
import { _InternalVehicleServicesEvent } from "@/types/_internal/_InternalVehicleServicesEvent";
import { _InternalVehicleServicesEventPayloadInterface } from "@/types/interfaces";

export type _InternalVehicleServicesEventPayload<
  E extends _InternalVehicleServicesEvent,
> = EventPayloadType<_InternalVehicleServicesEventPayloadInterface, E>;

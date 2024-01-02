import { EventPayloadType } from "@/types/_internal";
import { VehicleServicesEvent } from "@/types/vehicle-services/VehicleServicesEvent";
import { VehicleServicesEventPayloadInterface } from "@/types/interfaces";

/**
 * A payload associated with a Vehicle Services event.
 * When a VehicleServicesEvent is dispatched it will have a payload.
 * @example "newOrUpdatedOperation" event has payload of type Operation (or undefined)
 * @see VehicleServicesEvent
 */
export type VehicleServicesEventPayload<E extends VehicleServicesEvent> =
  EventPayloadType<VehicleServicesEventPayloadInterface, E>;

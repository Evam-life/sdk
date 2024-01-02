import { EventType } from "@/types/_internal";
import { VehicleServicesEventPayloadInterface } from "@/types/interfaces";

/**
 * A subscribable event in Vehicle Services
 * @see EvamApi.prototype.on
 * @see VehicleServicesEventPayloadInterface
 */
export type VehicleServicesEvent =
  EventType<VehicleServicesEventPayloadInterface>;

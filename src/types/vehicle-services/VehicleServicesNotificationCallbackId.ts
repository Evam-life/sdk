import { VehicleServicesNotificationId } from "@/types/vehicle-services/VehicleServicesNotificationId";
import { VehicleServicesCallbackIdSuffix } from "@/types/vehicle-services/VehicleServicesCallbackIdSuffix";

/**
 * The id of a callback inside the SDK. This is generated when a notification is sent.
 * Primary callbacks are suffixed with "-p" whereas secondary "-s"
 */
export type VehicleServicesNotificationCallbackId =
  `${VehicleServicesNotificationId}${VehicleServicesCallbackIdSuffix}`;

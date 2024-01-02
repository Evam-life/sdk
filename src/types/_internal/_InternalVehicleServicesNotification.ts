import { VehicleServicesNotification } from "@/types/vehicle-services/VehicleServicesNotifications";
import { VehicleServicesNotificationCallbackId } from "@/types/vehicle-services/VehicleServicesNotificationCallbackId";

export type _InternalVehicleServicesNotification = Omit<
  VehicleServicesNotification,
  "secondaryButton" | "primaryButton"
> & {
  primaryButton: {
    label: string;
    callback: VehicleServicesNotificationCallbackId;
  };
  secondaryButton?: {
    label: string;
    callback: VehicleServicesNotificationCallbackId;
  };
};

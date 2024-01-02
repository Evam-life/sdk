import { NotificationType } from "@/types/vehicle-services/NotificationType";
import { VehicleServicesNotificationButton } from "@/types/vehicle-services/VehicleServicesNotificationButton";

/**
 * A notification which can be sent to Vehicle Services
 * @property {string} heading the heading of the notification (i.e. the title)
 * @property {string} description the notification description
 * @property {NotificationType} type the type of the notification (which will determine how it displays)
 * @property {VehicleServicesNotificationButton} primaryButton the primary button
 * @property {VehicleServicesNotificationButton | undefined} primaryButton the (optional) secondary button
 * @see VehicleServicesNotificationButton
 */
type VehicleServicesNotification = {
  heading: string;
  description: string;
  notificationType: NotificationType;
  primaryButton: VehicleServicesNotificationButton;
  secondaryButton?: VehicleServicesNotificationButton;
  notificationId?: string;
};

export type { VehicleServicesNotification };

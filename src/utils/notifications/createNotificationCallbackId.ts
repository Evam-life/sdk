import { VehicleServicesNotificationCallbackId } from "@/types";
import { NotificationCallbackType } from "@/types/_internal";

const createNotificationCallbackId = (
  notificationId: string,
  type: NotificationCallbackType,
): VehicleServicesNotificationCallbackId =>
  `${notificationId}${type === "primary" ? "-p" : "-s"}`;
export default createNotificationCallbackId;

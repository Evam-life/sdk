import {
  VehicleServicesNotification,
  VehicleServicesNotificationId,
} from "@/types";
import { _InternalVehicleServicesNotification } from "@/types/_internal";
import { z } from "zod";
import { notificationTypes } from "@/data/enum";
import { v4 as uuidV4 } from "uuid";
import createNotificationCallbackId from "@/utils/notifications/createNotificationCallbackId";
import { isUndefined } from "lodash";

const _internalCallbackSchema = z.object({
  label: z.string(),
  callback: z.function(),
});

const parseNotification = (notification: VehicleServicesNotification) => {
  const id = notification.notificationId || uuidV4();

  const parser = z
    .object({
      heading: z.string(),
      description: z.string(),
      notificationType: z.enum(notificationTypes),
      primaryButton: _internalCallbackSchema,
      secondaryButton: _internalCallbackSchema.optional(),
      notificationId: z.string().optional(),
    })
    .transform(notification => {
      const primaryButtonCallbackId = createNotificationCallbackId(
        id,
        "primary",
      );
      const secondaryButtonCallbackId = isUndefined(
        notification.secondaryButton,
      )
        ? undefined
        : createNotificationCallbackId(id, "secondary");

      return {
        ...notification,
        primaryButton: {
          label: notification.primaryButton.label,
          callback: primaryButtonCallbackId,
        },
        secondaryButton: notification.secondaryButton
          ? {
              label: notification.secondaryButton.label,
              callback: secondaryButtonCallbackId,
            }
          : undefined,
      };
    });
  return {
    id,
    _internalNotification: parser.parse(
      notification,
    ) as _InternalVehicleServicesNotification,
  };
};

const generate_InternalNotification = (
  notification: VehicleServicesNotification,
): {
  _internalNotification: _InternalVehicleServicesNotification;
  id: VehicleServicesNotificationId;
} => parseNotification(notification);

export default generate_InternalNotification;

import AndroidHandler from "@/api/AndroidHandler";
import {
  generate_InternalNotification,
  splitCallbackIdSuffix,
} from "@/utils/notifications";
import {
  VehicleServicesNotification,
  VehicleServicesNotificationCallbackId,
  VehicleServicesNotificationId,
} from "@/types";
import isValid_InternalNotificationCallbackSuffix from "@/utils/notifications/isValid_InternalNotificationCallbackSuffix";
import {
  _InternalVehicleServicesEvent,
  _InternalVehicleServicesNotification,
  EventInterfaceType,
} from "@/types/_internal";
import EventMapHandler from "@/api/EventMapHandler";

class NotificationHandler {
  private callbackMap = new Map<string, () => void>();
  private eventMapHandler: EventMapHandler<EventInterfaceType>;

  constructor(eventMapHandler = new EventMapHandler<EventInterfaceType>()) {
    this.eventMapHandler = eventMapHandler;
  }

  private setListening = (isListening: boolean = true) => {
    if (isListening)
      this.eventMapHandler.on(
        "vehicleServicesNotificationCallbackTriggered",
        this.trigger,
      );
    else
      this.eventMapHandler.off(
        "vehicleServicesNotificationCallbackTriggered",
        this.trigger,
      );
  };

  /**
   * Will remove  a notification and its callbacks
   * @param notificationId
   */
  public remove = (notificationId: string) => {
    const keys = this.callbackMap.keys();
    const ids = Array.from(keys);
    const matchingIds = ids.filter(id => id.startsWith(notificationId));
    matchingIds.forEach(id => this.callbackMap.delete(id));
    AndroidHandler.call("removeNotification", [notificationId], {
      nonVsEnvironmentCallback: () => {},
    });
  };

  public send = (
    notification: VehicleServicesNotification,
  ): VehicleServicesNotificationId => {
    const { _internalNotification, id } =
      generate_InternalNotification(notification);

    this.storeCallbackId(
      _internalNotification.primaryButton.callback,
      notification.primaryButton.callback,
    );

    if (
      notification.secondaryButton !== undefined &&
      _internalNotification.secondaryButton !== undefined
    )
      this.storeCallbackId(
        _internalNotification.secondaryButton.callback,
        notification.secondaryButton.callback,
      );

    const stringified_InternalNotification =
      NotificationHandler.stringifyVehicleServicesNotification(
        _internalNotification,
      );

    AndroidHandler.call(
      "sendNotification",
      [stringified_InternalNotification],
      {
        nonVsEnvironmentCallback: stringified_InternalNotification => {
          const event: _InternalVehicleServicesEvent =
            "vehicleServicesNotificationSent";
          this.eventMapHandler.publish(event, stringified_InternalNotification);
        },
      },
    );

    return id;
  };
  private trigger = (callbackId: VehicleServicesNotificationCallbackId) => {
    const callback = this.callbackMap.get(callbackId);
    if (callback !== undefined) {
      callback();
      this.removeNotification(callbackId);
      this.cleanupDeadNotificationCallback(callbackId);
    }
  };

  private cleanupDeadNotificationCallback = (
    triggeredCallbackId: VehicleServicesNotificationCallbackId,
  ) => {
    const [sharedId, suffix] = splitCallbackIdSuffix(triggeredCallbackId);
    if (isValid_InternalNotificationCallbackSuffix(suffix)) {
      const oppositeSuffix = suffix === "-p" ? "-s" : "-p";
      const deadNotificationId = `${sharedId}${oppositeSuffix}`;
      this.removeNotification(deadNotificationId);
    }
  };

  private storeCallbackId = (notificationId: string, callback: () => void) => {
    if (this.callbackMap.size === 0) this.setListening();
    this.callbackMap.set(notificationId, callback);
  };
  private removeNotification = (notificationId: string) => {
    this.callbackMap.delete(notificationId);
    if (this.callbackMap.size === 0) this.setListening(false);
  };
  private static stringifyVehicleServicesNotification = (
    notification: _InternalVehicleServicesNotification,
  ) => JSON.stringify(notification);
}

export default NotificationHandler;

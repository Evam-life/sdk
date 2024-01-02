import NotificationHandler from "@/api/NotificationHandler";
import { VehicleServicesNotification } from "@/types";
import { EvamApi } from "@/api";
import { createNotificationCallbackId, eventHandlerWrapper } from "@/utils";
import { _InternalVehicleServicesEvent } from "@/types/_internal";

describe("NotificationHandler", () => {
  const notificationHandler = new NotificationHandler();
  const listener1 = jest.fn();
  const listener2 = jest.fn();

  const notificationBase: Omit<
    VehicleServicesNotification,
    "primaryButton" | "secondaryButton"
  > = {
    heading: "",
    description: "",
    notificationType: "ACTION_HUN",
  } as const;

  beforeEach(() => {
    listener2.mockReset();
    listener1.mockReset();
  });

  it("should trigger notifications with test-utils", () => {
    const notification1: VehicleServicesNotification = {
      primaryButton: {
        label: "",
        callback: listener1,
      },
      ...notificationBase,
    };

    const notification2: VehicleServicesNotification = {
      primaryButton: {
        label: "",
        callback: () => {},
      },
      secondaryButton: {
        callback: listener2,
        label: "",
      },
      ...notificationBase,
    };

    const id1 = notificationHandler.send(notification1);
    const id2 = notificationHandler.send(notification2);

    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).not.toHaveBeenCalled();

    EvamApi["test-utils"].notification.triggerCallback(id1, "primary");
    EvamApi["test-utils"].notification.triggerCallback(id2, "secondary");

    expect(listener1).toHaveBeenCalled();
    expect(listener2).toHaveBeenCalled();
  });

  it("should not trigger a callback when the opposite callback has already triggered", () => {
    const notification: VehicleServicesNotification = {
      primaryButton: {
        label: "",
        callback: listener1,
      },
      secondaryButton: {
        label: "",
        callback: listener2,
      },
      ...notificationBase,
    };

    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).not.toHaveBeenCalled();

    const id = notificationHandler.send(notification);
    EvamApi["test-utils"].notification.triggerCallback(id, "primary");
    expect(listener1).toHaveBeenCalled();
    EvamApi["test-utils"].notification.triggerCallback(id, "secondary");
    expect(listener2).not.toHaveBeenCalled();

    listener1.mockReset();
    listener2.mockReset();

    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).not.toHaveBeenCalled();

    const id2 = notificationHandler.send(notification);
    EvamApi["test-utils"].notification.triggerCallback(id2, "secondary");
    expect(listener2).toHaveBeenCalled();
    EvamApi["test-utils"].notification.triggerCallback(id2, "primary");
    expect(listener1).not.toHaveBeenCalled();
  });

  it("should trigger a callback no more than once", () => {
    const notification: VehicleServicesNotification = {
      primaryButton: {
        label: "",
        callback: listener1,
      },
      secondaryButton: {
        label: "",
        callback: listener2,
      },
      ...notificationBase,
    };
    const id1 = notificationHandler.send(notification);

    expect(listener1).not.toHaveBeenCalled();
    EvamApi["test-utils"].notification.triggerCallback(id1, "primary");
    EvamApi["test-utils"].notification.triggerCallback(id1, "primary");
    expect(listener1).toHaveBeenCalledTimes(1);

    const id2 = notificationHandler.send(notification);
    expect(listener2).not.toHaveBeenCalled();
    EvamApi["test-utils"].notification.triggerCallback(id2, "secondary");
    EvamApi["test-utils"].notification.triggerCallback(id2, "secondary");
    expect(listener2).toHaveBeenCalledTimes(1);
  });

  it("should trigger when the 'vehicleServicesNotificationCallbackTriggered' event is dispatched", () => {
    const event: _InternalVehicleServicesEvent =
      "vehicleServicesNotificationCallbackTriggered";
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    const notificationWithPrimaryButton: VehicleServicesNotification = {
      primaryButton: {
        label: "label",
        callback: listener1,
      },
      notificationType: "ACTION_HUN",
      heading: "heading",
      description: "",
    };
    const notificationWithSecondaryButton: VehicleServicesNotification = {
      secondaryButton: {
        label: "label",
        callback: listener2,
      },
      ...notificationWithPrimaryButton,
    };
    const id1 = EvamApi.notification.send(notificationWithPrimaryButton);
    const id2 = EvamApi.notification.send(notificationWithSecondaryButton);
    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).not.toHaveBeenCalled();
    eventHandlerWrapper().publish(
      event,
      createNotificationCallbackId(id1, "primary"),
    );
    expect(listener1).toHaveBeenCalled();
    eventHandlerWrapper().publish(
      event,
      createNotificationCallbackId(id2, "secondary"),
    );
    expect(listener2).toHaveBeenCalled();
  });

  it("should return the same id when passed a custom id", () => {
    const notificationId = "123456";
    const id = new NotificationHandler().send({
      primaryButton: {
        label: "label",
        callback: () => {},
      },
      notificationType: "ACTION_HUN",
      heading: "heading",
      description: "",
      notificationId,
    });
    expect(notificationId).toEqual(id);
    const newId = new NotificationHandler().send({
      primaryButton: {
        label: "label",
        callback: () => {},
      },
      notificationType: "ACTION_HUN",
      heading: "heading",
      description: "",
    });
    expect(newId).not.toEqual(notificationId);
  });
});
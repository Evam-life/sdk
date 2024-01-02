import {
  DisplayMode,
  HospitalLocation,
  Operation,
  OperationPriority,
  VehicleServicesEvent,
  VehicleServicesEventPayload,
  VehicleServicesNotification,
} from "@/types";
import { EvamApi } from "@/api";
import __mock__operationPayload from "@/tests/__mocks__/data/mockOperationPayload";
import __mock__locationPayload from "@/tests/__mocks__/data/mockLocationPayload";
import { eventHandlerWrapper, parseVehicleServicesPayload } from "@/utils";
import { faker } from "@faker-js/faker";
import { vehicleServicesEvents } from "@/data/array";
import { ZodError } from "zod";
import { IS_RUNNING_IN_VS } from "@/data/const";
import { EvamApiErrorRepository } from "@/utils/error";
import { _InternalVehicleServicesEvent } from "@/types/_internal";
import { displayModeParser } from "@/data/parsers";
import { mockVehicleServicesEventPayloadMap } from "@/tests/__mocks__/data";

beforeEach(() => {
  EvamApi["test-utils"].reset();
});

describe("EvamApi", () => {
  const testEvent: VehicleServicesEvent = "newOrUpdatedOperation";
  const listener1 = jest.fn();
  const listener2 = jest.fn();

  afterEach(() => {
    listener1.mockReset();
    listener2.mockReset();
    EvamApi["test-utils"].reset();
  });

  it("should invoke with the most recent payload when immediateInvocation is set to true (default)", () => {
    EvamApi["test-utils"].inject("newOrUpdatedInternetState", "NO_INTERNET");
    EvamApi["test-utils"].inject("osVersionSet", "0");
    EvamApi["test-utils"].inject("newOrUpdatedDisplayMode", "DARK");

    const fn = jest.fn();

    EvamApi.event.on("newOrUpdatedInternetState", fn);
    expect(fn).toHaveBeenLastCalledWith("NO_INTERNET");
    EvamApi.event.on("osVersionSet", fn);
    expect(fn).toHaveBeenLastCalledWith("0");
    EvamApi.event.on("newOrUpdatedDisplayMode", fn);
    expect(fn).toHaveBeenLastCalledWith("DARK");
  });

  it("should subscribe using on", () => {
    const listener = jest.fn();
    EvamApi.event.on(testEvent, listener, {
      immediatelyInvoke: false,
    });
    expect(listener).not.toHaveBeenCalled();
    EvamApi["test-utils"].inject(testEvent, __mock__operationPayload);
    expect(listener).toHaveBeenCalledWith(__mock__operationPayload);
  });

  it("should subscribe to multiple listeners using on", () => {
    EvamApi.event.on(testEvent, listener1, {
      immediatelyInvoke: false,
    });
    EvamApi.event.on(testEvent, listener2, {
      immediatelyInvoke: false,
    });
    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).not.toHaveBeenCalled();

    EvamApi["test-utils"].inject(testEvent, __mock__operationPayload);
    expect(listener1).toHaveBeenCalledWith(__mock__operationPayload);
    expect(listener2).toHaveBeenCalledWith(__mock__operationPayload);
  });

  it("should unsubscribe to a specific event callback using off", () => {
    const off = EvamApi.event.on(testEvent, listener1, {
      immediatelyInvoke: false,
    });
    expect(listener1).not.toHaveBeenCalled();
    off();
    EvamApi["test-utils"].inject(testEvent, __mock__operationPayload);
    expect(listener1).not.toHaveBeenCalled();
  });

  it('should trigger a callback with undefined when "initialTrigger" is set to "true" (default) and the event has not previously been dispatched', () => {
    const newTestEvent: VehicleServicesEvent = "newOrUpdatedLocation";
    expect(newTestEvent).not.toEqual(testEvent);
    expect(listener1).not.toHaveBeenCalled();
    EvamApi.event.on(newTestEvent, listener1); //initialTrigger is true by default
    expect(listener1).toHaveBeenCalledWith(undefined);
  });

  it('should trigger a callback with a vale when "initialTrigger" is set to "true" (default) and the event has previously been dispatched', () => {
    const newTestEvent: VehicleServicesEvent = "newOrUpdatedLocation";
    expect(newTestEvent).not.toEqual(testEvent);
    expect(listener1).not.toHaveBeenCalled();
    EvamApi["test-utils"].inject(newTestEvent, __mock__locationPayload);
    EvamApi.event.on(newTestEvent, listener1); //initialTrigger is true by default
    expect(listener1).toHaveBeenCalledWith(__mock__locationPayload);
  });

  const notificationBase: Omit<
    VehicleServicesNotification,
    "primaryButton" | "secondaryButton"
  > = {
    heading: "",
    description: "",
    notificationType: "CONCEALED_HUN",
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

    const id1 = EvamApi.notification.send(notification1);
    const id2 = EvamApi.notification.send(notification2);

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

    const id = EvamApi.notification.send(notification);
    EvamApi["test-utils"].notification.triggerCallback(id, "primary");
    expect(listener1).toHaveBeenCalled();
    EvamApi["test-utils"].notification.triggerCallback(id, "secondary");
    expect(listener2).not.toHaveBeenCalled();

    listener1.mockReset();
    listener2.mockReset();

    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).not.toHaveBeenCalled();

    const id2 = EvamApi.notification.send(notification);
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
    const id1 = EvamApi.notification.send(notification);

    expect(listener1).not.toHaveBeenCalled();
    EvamApi["test-utils"].notification.triggerCallback(id1, "primary");
    EvamApi["test-utils"].notification.triggerCallback(id1, "primary");
    expect(listener1).toHaveBeenCalledTimes(1);

    const id2 = EvamApi.notification.send(notification);
    expect(listener2).not.toHaveBeenCalled();
    EvamApi["test-utils"].notification.triggerCallback(id2, "secondary");
    EvamApi["test-utils"].notification.triggerCallback(id2, "secondary");
    expect(listener2).toHaveBeenCalledTimes(1);
  });

  it("should not throw an error or trigger when an invalid payload is passed to a subscribed event", () => {
    const listener = jest.fn();
    const event: VehicleServicesEvent = "newOrUpdatedDisplayMode";
    EvamApi.event.on(event, listener, {
      immediatelyInvoke: false,
    });
    const invalidPayload = faker.number.int();
    expect(displayModeParser.safeParse(invalidPayload).success).toEqual(false);
    EvamApi["test-utils"].uncheckedInject(event, invalidPayload);
    expect(listener).not.toHaveBeenCalled();
  });

  it('should trigger events with "inject"', () => {
    const listener = jest.fn();
    expect(vehicleServicesEvents.length).toBeGreaterThan(0);
    vehicleServicesEvents.forEach(evt => {
      EvamApi.event.on(evt, listener, {
        immediatelyInvoke: false,
      });
    });
    expect(listener).not.toHaveBeenCalled();
    vehicleServicesEvents.forEach(evt => {
      EvamApi["test-utils"].inject(evt);
    });
    expect(listener).toHaveBeenCalledTimes(vehicleServicesEvents.length);
  });

  it("should log events and errors using initLog", () => {
    const target = jest.fn();
    const errorTarget = jest.fn();

    EvamApi["test-utils"].initLog(target, errorTarget);

    expect(target).not.toHaveBeenCalled();
    expect(errorTarget).not.toHaveBeenCalled();

    vehicleServicesEvents.forEach(evt => {
      const payload = mockVehicleServicesEventPayloadMap[evt];
      EvamApi["test-utils"].inject(evt, payload);
      expect(target).toHaveBeenLastCalledWith(evt, payload);
    });

    expect(errorTarget).not.toHaveBeenCalled();

    vehicleServicesEvents
      .filter(evt => evt !== "newOrUpdatedSettings")
      .forEach(evt => {
        const invalidPayload = {
          thisShouldNeverBeValid: true,
        } as const;

        expect(() =>
          parseVehicleServicesPayload(evt, invalidPayload),
        ).toThrow();
        EvamApi["test-utils"].uncheckedInject(evt, invalidPayload);
        expect(errorTarget).toHaveBeenLastCalledWith(
          evt,
          invalidPayload,
          expect.any(ZodError),
        );
      });
  });

  it("should convert null values to undefined when dispatching null", () => {
    const options = {
      immediatelyInvoke: false,
    };
    const listener = jest.fn();
    const off_0 = EvamApi.event.on("newOrUpdatedDisplayMode", listener, options);

    EvamApi["test-utils"].uncheckedInject("newOrUpdatedDisplayMode", null);

    expect(listener).toHaveBeenLastCalledWith(undefined);

    off_0();
    listener.mockClear()

    const off_1 = EvamApi.event.on("newOrUpdatedBattery", listener, options);

    EvamApi["test-utils"].uncheckedInject("newOrUpdatedBattery", {
      health: "UNKNOWN",
      plugged: "AC",
      status: "CHARGING",
      capacity: null,
    });

    expect(listener).toHaveBeenLastCalledWith({
      health: "UNKNOWN",
      plugged: "AC",
      status: "CHARGING",
      capacity: undefined,
    });

    off_1();
    listener.mockClear()

    EvamApi.event.on("newOrUpdatedOperation", listener, options)

    const op/*: Operation*/ = {
      operationID: "",
      name: "",
      operationState: "ACTIVE",
      operationFullId: "",
      operationUnits: [{
        unitId: "hello",
        eta: null,
      }]
    }

    EvamApi["test-utils"].uncheckedInject("newOrUpdatedOperation", op)

    expect(listener).toHaveBeenLastCalledWith({
      operationID: "",
      name: "",
      operationState: "ACTIVE",
      operationFullId: "::",
      operationUnits: [{
        unitId: "hello",
        eta: undefined
      }]
    })

  });

  it("should still parse for keys which don't exist yet, but will scrap those keys", () => {
    const opWithExtraKey: Omit<Operation, "operationFullId"> & {
      extraKey: {
        extraField1: undefined,
        extraField2: string
      }
    } = {
      name: "operation",
      operationState: "ACTIVE",
      operationID: "",
      extraKey: {
        extraField1: undefined,
        extraField2: "example"
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {extraKey, ...opWithoutExtraKey} = opWithExtraKey

    const listener = jest.fn()
    EvamApi.event.on("newOrUpdatedOperation", listener, {
      immediatelyInvoke: false
    });
    EvamApi["test-utils"].uncheckedInject("newOrUpdatedOperation", opWithExtraKey);
    expect(listener).toHaveBeenCalledWith({
      operationFullId: "::",
      ...opWithoutExtraKey
    })
  })
});

describe("setPriority", () => {
  afterEach(() => {
    EvamApi["test-utils"].inject("newOrUpdatedOperation", undefined);
  });

  it("should update the operation's current selected priority outside of Vehicle Services", () => {
    expect(IS_RUNNING_IN_VS).toEqual(false);

    const priorityId = 0;
    const availablePriorities: Array<OperationPriority> = [
      {
        id: priorityId,
        name: "PriorityName",
      },
    ];

    let currentOperation: Operation | undefined = undefined;

    const operationToDispatch: Partial<Operation> = {
      operationID: "id",
      name: "name",
      operationState: "ACTIVE",
      availablePriorities,
    };

    expect(() =>
      parseVehicleServicesPayload("newOrUpdatedOperation", operationToDispatch),
    ).not.toThrow();

    EvamApi.event.on(
      "newOrUpdatedOperation",
      newOperation => {
        currentOperation = newOperation;
      },
      {
        immediatelyInvoke: false,
      },
    );

    EvamApi["test-utils"].uncheckedInject(
      "newOrUpdatedOperation",
      operationToDispatch,
    );
    expect(currentOperation).toEqual(
      expect.objectContaining(operationToDispatch),
    );

    EvamApi.operation.setPriority(priorityId);

    expect(currentOperation!.selectedPriority).toEqual(priorityId);
  });

  it("should throw an error when there is no current operation", () => {
    const listener = jest.fn();
    EvamApi.event.on("newOrUpdatedOperation", listener);
    expect(listener).toHaveBeenCalledWith(undefined);
    expect(() => {
      EvamApi.operation.setPriority(0);
    }).toThrowError(EvamApiErrorRepository.setPriority.operationNotDefined());
  });

  it("should throw an error when there is no available priorities", () => {
    const listener = jest.fn();
    EvamApi.event.on("newOrUpdatedOperation", listener, { immediatelyInvoke: false });
    const operation: Operation = {
      name: "",
      operationID: "",
      operationFullId: "::",
      operationState: "ACTIVE",
      availablePriorities: undefined,
    };
    EvamApi["test-utils"].inject("newOrUpdatedOperation", operation);
    expect(listener).toHaveBeenCalledWith(expect.objectContaining(operation));
    expect(() => {
      EvamApi.operation.setPriority(0);
    }).toThrowError(EvamApiErrorRepository.setPriority.noAvailablePriorities());
  });

  it("should throw an error when there are available priorities but the one set is not one them", () => {
    const listener = jest.fn();
    const availablePriorityId = 1;
    const unavailablePriorityId = 0;
    const availablePriorities: Array<OperationPriority> = [
      {
        name: "",
        id: availablePriorityId,
      },
    ];

    EvamApi.event.on("newOrUpdatedOperation", listener, { immediatelyInvoke: false });
    const operation: Operation = {
      name: "",
      operationID: "",
      operationFullId: "::",
      operationState: "ACTIVE",
      availablePriorities,
    };
    EvamApi["test-utils"].inject("newOrUpdatedOperation", operation);
    expect(listener).toHaveBeenCalledWith(expect.objectContaining(operation));
    expect(() => {
      EvamApi.operation.setPriority(unavailablePriorityId);
    }).toThrowError(
      EvamApiErrorRepository.setPriority.priorityNotAvailable(
        unavailablePriorityId,
        availablePriorities,
      ),
    );
  });
});

describe("setHospital", () => {
  afterEach(() => {
    EvamApi["test-utils"].inject("newOrUpdatedOperation", undefined);
  });

  it("should update the operation's current selected hospital outside of Vehicle Services", () => {
    expect(IS_RUNNING_IN_VS).toEqual(false);

    const hospitalId = 0;
    const availableHospitalLocations: Array<HospitalLocation> = [
      {
        id: hospitalId,
        name: "HospitalName",
        latitude: 0,
        longitude: 0,
      },
    ];

    let currentOperation: Operation | undefined = undefined;

    const operationToDispatch: Partial<Operation> = {
      operationID: "id",
      name: "name",
      operationState: "ACTIVE",
      availableHospitalLocations,
    };

    expect(() =>
      parseVehicleServicesPayload("newOrUpdatedOperation", operationToDispatch),
    ).not.toThrow();

    EvamApi.event.on(
      "newOrUpdatedOperation",
      newOperation => {
        currentOperation = newOperation;
      },
      {
        immediatelyInvoke: false,
      },
    );

    EvamApi["test-utils"].uncheckedInject(
      "newOrUpdatedOperation",
      operationToDispatch,
    );
    expect(currentOperation).toEqual(
      expect.objectContaining(operationToDispatch),
    );

    EvamApi.operation.setHospital(hospitalId);
    expect(currentOperation!.selectedHospital).toEqual(hospitalId);
  });

  it("should throw an error when there is no current operation", () => {
    const listener = jest.fn();
    EvamApi.event.on("newOrUpdatedOperation", listener);
    expect(listener).toHaveBeenCalledWith(undefined);
    expect(() => {
      EvamApi.operation.setHospital(0);
    }).toThrowError(EvamApiErrorRepository.setHospital.operationNotDefined());
  });

  it("should throw an error when there is no available hospitals", () => {
    const listener = jest.fn();
    EvamApi.event.on("newOrUpdatedOperation", listener, { immediatelyInvoke: false });
    const operation: Operation = {
      name: "",
      operationID: "",
      operationFullId: "::",
      operationState: "ACTIVE",
      availableHospitalLocations: undefined,
    };
    EvamApi["test-utils"].inject("newOrUpdatedOperation", operation);
    expect(listener).toHaveBeenCalledWith(expect.objectContaining(operation));
    expect(() => {
      EvamApi.operation.setHospital(0);
    }).toThrowError(
      EvamApiErrorRepository.setHospital.noAvailableHospitalLocations(),
    );
  });

  it("should throw an error when there are available hospitals locations but the one set is not one them", () => {
    const listener = jest.fn();
    const availableHospitalLocationId = 1;
    const unavailableHospitalLocationId = 0;

    const availableHospitalLocations: Array<HospitalLocation> = [
      {
        name: "",
        id: availableHospitalLocationId,
        latitude: 0,
        longitude: 0,
      },
    ];

    EvamApi.event.on("newOrUpdatedOperation", listener, { immediatelyInvoke: false });

    const operation: Operation = {
      name: "",
      operationID: "",
      operationFullId: "::",
      operationState: "ACTIVE",
      availableHospitalLocations,
    };
    EvamApi["test-utils"].inject("newOrUpdatedOperation", operation);
    expect(listener).toHaveBeenCalledWith(expect.objectContaining(operation));

    expect(() => {
      EvamApi.operation.setHospital(unavailableHospitalLocationId);
    }).toThrowError(
      EvamApiErrorRepository.setHospital.hospitalNotAvailable(
        unavailableHospitalLocationId,
        availableHospitalLocations,
      ),
    );
  });
});

describe("test-utils.setDocument", () => {
  const doc = new Document();
  const event: VehicleServicesEvent = "newOrUpdatedDisplayMode" as const;
  const payload: VehicleServicesEventPayload<"newOrUpdatedDisplayMode"> =
    "DARK";
  const listener = jest.fn();

  beforeEach(() => {
    EvamApi["test-utils"].setDocument(doc);
  });

  afterAll(() => {
    EvamApi["test-utils"].setDocument(document);
  });

  it("should not listen to the global document instance once setDocument has been called", () => {
    EvamApi.event.on(event, listener, {
      immediatelyInvoke: false,
    });
    eventHandlerWrapper(document).publish(event, payload);
    expect(listener).not.toHaveBeenCalled();
  });

  it("should listen to the new document instead", () => {
    EvamApi.event.on(event, listener, {
      immediatelyInvoke: false,
    });
    eventHandlerWrapper(doc).publish(event, payload);
    expect(listener).toHaveBeenCalledWith(payload);
  });

  it("should still handle notifications", () => {
    const callback = jest.fn();
    const notification: VehicleServicesNotification = {
      heading: "",
      description: "",
      notificationType: "ACTION_HUN",
      primaryButton: {
        label: "",
        callback,
      },
    };
    const id = EvamApi.notification.send(notification);
    const notificationTriggeredEvent: _InternalVehicleServicesEvent =
      "vehicleServicesNotificationCallbackTriggered";
    expect(callback).not.toHaveBeenCalled();
    eventHandlerWrapper(document).publish(
      notificationTriggeredEvent,
      `${id}-p`,
    );
    expect(callback).not.toHaveBeenCalled();
    EvamApi["test-utils"].notification.triggerCallback(id, "primary");
    expect(callback).toHaveBeenCalledWith();
  });

  it("should unsubscribe from previous callbacks", () => {
    const evt: VehicleServicesEvent = "newOrUpdatedInternetState";
    const payload: VehicleServicesEventPayload<"newOrUpdatedInternetState"> =
      "NO_INTERNET";
    const listener = jest.fn();
    EvamApi.event.on(evt, listener, {
      immediatelyInvoke: false,
    });
    EvamApi["test-utils"].inject(evt, payload);
    expect(listener).toHaveBeenCalledWith(payload);
    EvamApi["test-utils"].setDocument(new Document());
    EvamApi["test-utils"].inject(evt, payload);
    expect(listener).toHaveBeenCalledTimes(1);
  });
});

describe("maps", () => {
  it("should dispatch the relevant events outside of VehicleServices", () => {
    expect(IS_RUNNING_IN_VS).toBe(false);

    const navLayerPointSetEvent: _InternalVehicleServicesEvent =
      "navLayerPointSet";
    const navLayerShapeSetEvent: _InternalVehicleServicesEvent =
      "navLayerShapeSet";
    const navLayerDeletedEvent: _InternalVehicleServicesEvent =
      "navLayerDeleted";

    const navLayerPointSetEventListener = jest.fn();
    const navLayerShapeSetEventListener = jest.fn();
    const navLayerDeletedEventListener = jest.fn();

    eventHandlerWrapper().subscribe(
      navLayerPointSetEvent,
      navLayerPointSetEventListener,
    );
    eventHandlerWrapper().subscribe(
      navLayerShapeSetEvent,
      navLayerShapeSetEventListener,
    );
    eventHandlerWrapper().subscribe(
      navLayerDeletedEvent,
      navLayerDeletedEventListener,
    );

    expect(navLayerPointSetEventListener).not.toHaveBeenCalled();
    expect(navLayerShapeSetEventListener).not.toHaveBeenCalled();
    expect(navLayerDeletedEventListener).not.toHaveBeenCalled();

    EvamApi.map.setNavLayerPoint("", []);
    expect(navLayerPointSetEventListener).toHaveBeenCalled();

    EvamApi.map.setNavLayerShape("", []);
    expect(navLayerShapeSetEventListener).toHaveBeenCalled();

    EvamApi.map.deleteNavLayer("");
    expect(navLayerDeletedEventListener).toHaveBeenCalled();
  });
});

test("JavaScript converts CustomDetail 'detail' property to 'null' when it is dispatched as 'undefined'", () => {
  const listener1 = jest.fn();
  vehicleServicesEvents.forEach((evt, index) => {
    const off = EvamApi.event.on(evt, listener1, {
      immediatelyInvoke: false,
    });
    EvamApi["test-utils"].uncheckedInject(evt, null);
    expect(listener1).toHaveBeenCalledTimes(index + 1);
    expect(listener1).toHaveBeenLastCalledWith(undefined);
    off();
  });
});

describe("reset", () => {
  beforeEach(() => {
    EvamApi["test-utils"].reset();
  });
  it("should reset data", () => {
    const listener = jest.fn();
    EvamApi.event.on("newOrUpdatedDisplayMode", listener, {
      immediatelyInvoke: false,
    });
    const displayMode: DisplayMode = "DARK";
    expect(listener).not.toHaveBeenCalled();
    EvamApi["test-utils"].inject("newOrUpdatedDisplayMode", displayMode);
    expect(listener).toHaveBeenCalledWith(displayMode);
    EvamApi["test-utils"].reset();
    EvamApi.event.on("newOrUpdatedDisplayMode", listener, {
      immediatelyInvoke: true,
    });
    expect(listener).toHaveBeenLastCalledWith(undefined);
  });
});

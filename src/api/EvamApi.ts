import {
  LayerPoint,
  LayerShape,
  Operation,
  VehicleServicesEvent,
  VehicleServicesEventPayload,
  VehicleServicesNotification,
  VehicleServicesNotificationId,
} from "@/types";
import { vehicleServicesEvents } from "@/data/array";
import VehicleServicesEventMapHandler from "@/api/VehicleServicesEventMapHandler";
import { IS_RUNNING_IN_VS } from "@/data/const";
import AndroidHandler from "@/api/AndroidHandler";
import NotificationHandler from "@/api/NotificationHandler";
import { ZodError } from "zod";
import {
  _InternalVehicleServicesEvent,
  _InternalVehicleServicesEventPayload,
  EventInterfaceType,
  EventPayloadType,
  EventType,
  NotificationCallbackType,
} from "@/types/_internal";
import { vehicleServicesParserMap } from "@/data/parser-maps";
import { find, forEach, isUndefined } from "lodash";
import { EvamApiErrorRepository } from "@/utils/error";
import { createNotificationCallbackId } from "@/utils";
import EventMapHandler from "@/api/EventMapHandler";

/**
 * A class which caches the most recently dispatched payload for
 * a VehicleServicesEvent. This is used inside the EvamApi.prototype.on method to trigger
 * the callback with the most recent payload.
 */
class VehicleServicesDataMapHandler {
  private dataMap = new Map<
    VehicleServicesEvent,
    VehicleServicesEventPayload<VehicleServicesEvent>
  >();

  constructor(eventMapHandler = new EventMapHandler<EventInterfaceType>()) {
    forEach(vehicleServicesEvents, event =>
      eventMapHandler.on(event, args => {
        if (args === undefined) this.dataMap.delete(event);
        else this.dataMap.set(event, args);
      }),
    );
    AndroidHandler.call("apiReady", [], {
      nonVsEnvironmentCallback: () => {},
    });
  }

  public getDatum = <E extends VehicleServicesEvent>(
    event: E,
  ): VehicleServicesEventPayload<E> =>
    this.dataMap.get(event) as VehicleServicesEventPayload<E>;
}

/**
 * Evam API singleton that exposes methods to interact with the Evam platform.
 */
class EvamApi {
  /**
   * Constant to be used to detect if the Certified App is currently running inside Vehicle Services.
   */
  public static readonly isRunningInVehicleServices = IS_RUNNING_IN_VS;

  //handles internal events
  private static _internalEventMapHandler =
    new EventMapHandler<EventInterfaceType>();

  private static eventMapHandler = new VehicleServicesEventMapHandler();

  private static vehicleServicesDataMapHandler =
    new VehicleServicesDataMapHandler(EvamApi._internalEventMapHandler);

  private static notificationHandler = new NotificationHandler(
    EvamApi._internalEventMapHandler,
  );

  /**
   * Utilities to handle Vehicle Services events.
   */
  public static event = {
    /**
     * Used to subscribe to a Vehicle Services event
     * @param event the event to subscribe to
     * @param callback the callback to trigger on the event
     * @param immediatelyInvoke by default the callback will immediately trigger with the most recently dispatched payload for the event. To disable this behavior set immediatelyInvoke to false.
     * @returns a method which will unsubscribe the callback from the event. You can use this to handle cleanup.
     */
    on: <E extends VehicleServicesEvent>(
      event: E,
      callback: (payload: VehicleServicesEventPayload<E>) => void,
      {
        immediatelyInvoke = true,
      }: {
        immediatelyInvoke: boolean;
      } = {
        immediatelyInvoke: true,
      },
    ) => {
      if (immediatelyInvoke) {
        const mostRecentlyDispatchedPayload =
          EvamApi.vehicleServicesDataMapHandler.getDatum(event);
        callback(mostRecentlyDispatchedPayload);
      }
      EvamApi.eventMapHandler.on(event, callback);
      return () => EvamApi.off(event, callback);
    },
  };

  /**
   * Used to unsubscribe from a Vehicle Services event.
   * Calling EvamApi.prototype.off() will unsubscribe all callbacks from every event.
   * Calling EvamApi.prototype.off(event) will unsubscribe all callbacks from a named event.
   * Calling EvamApi.prototype.off(event, callback) will unsubscribe a specific callback from a named event.
   * @param event the event to unsubscribe from
   * @param callback the callback to unsubscribe from
   */
  private static off = <E extends VehicleServicesEvent>(
    event?: E,
    callback?: (payload: VehicleServicesEventPayload<E>) => void,
  ) => EvamApi.eventMapHandler.off(event, callback);

  //like on, but for internal events
  private static _internalOn = <
    I extends EventInterfaceType,
    E extends EventType<I>,
  >(
    event: E,
    callback: (payload: EventPayloadType<I, E>) => void,
  ) => {
    EvamApi._internalEventMapHandler.on(event as string, callback);
  };

  //like off, but for internal events
  private static _internalOff = <
    I extends EventInterfaceType,
    E extends EventType<I>,
  >(
    event: E,
    callback: (payload: EventPayloadType<I, E>) => void,
  ) => {
    EvamApi._internalEventMapHandler.off(event as string, callback);
  };

  /**
   * Provides methods for interacting with the currently active operation inside Vehicle Services.
   */
  public static operation = {
    /**
     * Sets the priority of the current operation.
     * @param id the priority id.
     * @throws if 'current operation is undefined'
     * @throws if 'current operation has not available priorities'
     * @throws if 'the id set is not present inside the available priorities'
     */
    setPriority: (id: number) =>
      AndroidHandler.call("setPriority", [id], {
        nonVsEnvironmentCallback: id => {
          const currentOperation =
            EvamApi.vehicleServicesDataMapHandler.getDatum(
              "newOrUpdatedOperation",
            );

          if (isUndefined(currentOperation))
            throw new Error(
              EvamApiErrorRepository.setPriority.operationNotDefined(),
            );

          const { availablePriorities } = currentOperation;
          if (isUndefined(availablePriorities))
            throw new Error(
              EvamApiErrorRepository.setPriority.noAvailablePriorities(),
            );

          const availablePriorityExists = !isUndefined(
            find(availablePriorities, { id }),
          );
          if (!availablePriorityExists)
            throw new Error(
              EvamApiErrorRepository.setPriority.priorityNotAvailable(
                id,
                availablePriorities,
              ),
            );

          const newOperation: Operation = {
            selectedPriority: id,
            ...currentOperation,
          };
          EvamApi["test-utils"].inject("newOrUpdatedOperation", newOperation);
        },
      }),
    /**
     * Sets the hospital of the current operation.
     * @param id the hospital id.
     * @throws if 'current operation is undefined'
     * @throws if 'current operation has not available hospital locations'
     * @throws if 'the id set is not present inside the available hospital locations'
     */
    setHospital: (id: number) =>
      AndroidHandler.call("setHospital", [id], {
        nonVsEnvironmentCallback: id => {
          const currentOperation =
            EvamApi.vehicleServicesDataMapHandler.getDatum(
              "newOrUpdatedOperation",
            );
          if (isUndefined(currentOperation))
            throw new Error(
              EvamApiErrorRepository.setHospital.operationNotDefined(),
            );
          if (isUndefined(currentOperation.availableHospitalLocations))
            throw new Error(
              EvamApiErrorRepository.setHospital.noAvailableHospitalLocations(),
            );
          const availableHospitalLocationExists = !isUndefined(
            find(currentOperation.availableHospitalLocations, { id }),
          );
          if (!availableHospitalLocationExists)
            throw new Error(
              EvamApiErrorRepository.setHospital.hospitalNotAvailable(
                id,
                currentOperation.availableHospitalLocations,
              ),
            );
          const newOperation: Operation = {
            selectedHospital: id,
            ...currentOperation,
          };
          this["test-utils"].inject("newOrUpdatedOperation", newOperation);
        },
      }),
  };

  /**
   * Provides methods to handle notifications in Vehicle Services
   */
  public static notification = {
    /**
     * Send a notification to Vehicle Services.
     * @param notification The notification to send
     * @returns the notification id
     */
    send: (notification: VehicleServicesNotification) =>
      EvamApi.notificationHandler.send(notification),
    /**
     * Removes a previously sent notification.
     * @param notificationId the id you passed to the notification
     *
     * @param notificationId
     */
    remove: (notificationId: string) =>
      EvamApi.notificationHandler.remove(notificationId),
  };

  /**
   * Provides methods to interface with the connected rakel device
   */
  public static rakel = {
    /**
     * Send commands to the connected radio.
     * @param commands The Rakel commands that should be sent.
     * Normally, each one should end with the carriage return character (\r)
     */
    sendRawRakelAction: (commands: Array<string>) =>
      AndroidHandler.call(
        "sendRawRakelAction",
        [
          JSON.stringify({
            value: commands,
          }),
        ],
        {
          nonVsEnvironmentCallback: args => {
            const e: _InternalVehicleServicesEvent = "rawRakelActionSent";
            EvamApi._internalEventMapHandler.publish(e, args);
          },
        },
      ),
  };

  public static app = {
    putInForeground: () =>
      AndroidHandler.call("putAppInForeground", [], {
        nonVsEnvironmentCallback: () => {},
      }),
  };

  /**
   * Provides methods to interact with the Vehicle Services map.
   */
  public static map = {
    /**
     * Adds/Update a layer by its ID. Reusing a layerID causes the data to be replaced. A certified app can only update a layer it has created.
     * This function adds a set of shapes on the map with the text in its center.
     * @param id the id of the layer (if the layer doesn't exist then one will be created)
     * @param layerShapeData array of shapes to be shown with text and shape color (format: "#AARRGGBB", just like the SC buttons)
     * @requires Permissions NAVIGATION_PRIVATE_LAYERS
     * @preview This function is currently available in the Development Environment only.
     */
    setNavLayerShape: (id: string, layerShapeData: Array<LayerShape>) =>
      AndroidHandler.call(
        "setNavLayerShape",
        [id, JSON.stringify(layerShapeData)],
        {
          nonVsEnvironmentCallback: args => {
            const e: _InternalVehicleServicesEvent = "navLayerShapeSet";
            EvamApi._internalEventMapHandler.publish(e, args);
          },
        },
      ),
    /**
     * Adds/Update a layer by its ID. Reusing a layerID causes the data to be replaced. A certified app can only update a layer it has created.
     * This function adds a set of points on the map with text and icon at the specified lat and lon
     * @param id the id of the layer (if the layer doesn't exist then one will be created)
     * @param layerPointData array of points to be shown with text and icon. Note that the icon of the first element will be used for all points.
     * @requires Permissions NAVIGATION_PRIVATE_LAYERS
     * @preview This function is currently available in the Development Environment only.
     */
    setNavLayerPoint: (id: string, layerPointData: Array<LayerPoint>) =>
      AndroidHandler.call(
        "setNavLayerPoint",
        [id, JSON.stringify(layerPointData)],
        {
          nonVsEnvironmentCallback: args => {
            const e: _InternalVehicleServicesEvent = "navLayerPointSet";
            EvamApi._internalEventMapHandler.publish(e, args);
          },
        },
      ),
    /**
     * Deletes a layer by its ID. A certified app can only delete a layer it has created.
     * @param id the id of the layer (if the layer doesn't exist then one will be created)
     * @requires Permissions NAVIGATION_PRIVATE_LAYERS
     * @preview This function is currently available in the Development Environment only.
     */
    deleteNavLayer: (id: string) =>
      AndroidHandler.call("deleteNavLayer", [id], {
        nonVsEnvironmentCallback: args => {
          const e: _InternalVehicleServicesEvent = "navLayerDeleted";
          EvamApi._internalEventMapHandler.publish(e, args);
        },
      }),
  };

  /**
   * Various utilities for use in testing environments and development.
   * Most test utilities will not work inside Vehicle Services.
   */
  public static "test-utils" = {
    /**
     * Simulates an event with a payload.
     * This will not execute inside Vehicle Services.
     * @param event the event to simulate
     * @param payload the payload to dispatch
     */
    inject: <E extends VehicleServicesEvent>(
      event: E,
      payload?: VehicleServicesEventPayload<E>,
    ) => {
      if (IS_RUNNING_IN_VS) return;
      EvamApi.eventMapHandler.publish(event, payload);
    },
    /**
     * Same as inject but without typechecking for the payload.
     * This will not run inside Vehicle Services.
     * @param event the event to simulate
     * @param payload the payload to dispatch
     */
    uncheckedInject: (event: VehicleServicesEvent, payload: unknown) => {
      if (IS_RUNNING_IN_VS) return;
      // @ts-expect-error We're not checking the payload here on purpose
      EvamApi.eventMapHandler.publish(event, payload);
    },
    /**
     * Initialises a log for all dispatched instances of VehicleServicesEvent.
     * Note that once a log is initialised it cannot be uninitialised.
     * This will still run in Vehicle Services.
     * @param [target=console.log] The target to log the VehicleServicesEvent with its payload.
     * @param [errorTarget=console.error] The error target to log parsing errors between a dispatched payload and a callback to the VehicleServicesEvent.
     */
    initLog: <E extends VehicleServicesEvent>(
      target: (
        event: E,
        payload: VehicleServicesEventPayload<E>,
      ) => void = console.log,
      errorTarget: (
        event: E,
        payload: VehicleServicesEventPayload<E>,
        error: ZodError,
      ) => void = console.error,
    ) => {
      forEach(vehicleServicesEvents, event => {
        this._internalOn(event, payload => {
          const parser = vehicleServicesParserMap.get(event);
          if (isUndefined(parser))
            return target(
              event as E,
              payload as VehicleServicesEventPayload<E>,
            );
          const parse = parser.safeParse(payload);
          return parse.success
            ? target(event as E, payload as VehicleServicesEventPayload<E>)
            : errorTarget(
                event as E,
                payload as VehicleServicesEventPayload<E>,
                parse.error,
              );
        });
      });
    },
    /**
     * The EvamApi class acts as a wrapper around DOM events.
     * For particular E2E testing frameworks such as Cypress the "setDocument"
     * can be used to target a 'document' instance in which to subscribe/unsubscribe/dispatch events to.
     * Calling setDocument will reset all previously subscribed-to callbacks.
     * This will not run inside Vehicle Services.
     * @param doc the document instance
     */
    setDocument: (doc: Document = document) => {
      if (IS_RUNNING_IN_VS) return;
      EvamApi.off();
      EvamApi.eventMapHandler.reinitialise(doc);
      EvamApi._internalEventMapHandler.reinitialise(doc);
    },
    /**
     * Resets all stored data to 'undefined' and optionally will unsubscribe all callbacks.
     * This will not run inside Vehicle Services.
     * @param [off=true] if true the reset method will unsubscribe all callbacks
     */
    reset: (off: boolean = true) => {
      if (IS_RUNNING_IN_VS) return;
      if (off) EvamApi.off();
      forEach(vehicleServicesEvents, evt =>
        this["test-utils"].inject(evt, undefined),
      );
    },
    /**
     * Test utilities for testing notifications.
     */
    notification: {
      /**
       * Will trigger a notification callback.
       * This will not run inside Vehicle Services.
       * @param notificationId the notification id in which the callback belongs.
       * @see EvamApi.prototype.notification.send
       * @param [type = "primary"] use to trigger the primary or secondary callback.
       */
      triggerCallback: (
        notificationId: VehicleServicesNotificationId,
        type: NotificationCallbackType = "primary",
      ) => {
        if (IS_RUNNING_IN_VS) return;
        const fullId = createNotificationCallbackId(notificationId, type);
        EvamApi._internalEventMapHandler.publish(
          "vehicleServicesNotificationCallbackTriggered",
          fullId,
        );
      },
    },
    /**
     * Some events are dispatched from the SDK for internal use.
     * This utility allows for subscribing to / unsubscribing from said internal events.
     * This will not run inside Vehicle Services.
     */
    _internalEvent: {
      /**
       * Subscribe to an internal event
       * This will not run inside Vehicle Services.
       * @param event the event to subscribe to
       * @param callback the callback which will execute
       */
      on: <E extends _InternalVehicleServicesEvent>(
        event: E,
        callback: (payload: _InternalVehicleServicesEventPayload<E>) => void,
      ) => {
        if (IS_RUNNING_IN_VS) return;
        EvamApi._internalOn(event, callback);
      },
      /**
       * Unsubscribe from an internal event.
       * This will not run inside Vehicle Services.
       * @param event the event to unsubscribe to
       * @param callback the callback which is tied to the event
       *
       */
      off: <E extends _InternalVehicleServicesEvent>(
        event: E,
        callback: (payload: _InternalVehicleServicesEventPayload<E>) => void,
      ) => {
        if (IS_RUNNING_IN_VS) return;
        EvamApi._internalOff(event, callback);
      },
    },
  };
}

export default EvamApi;

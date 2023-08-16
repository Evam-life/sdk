import {
    convertedTripLocationHistory,
    notification,
    tripLocationHistory
} from "../testdata";

import {EvamApi} from "../../src";
import {publish, subscribe, unsubscribe} from "../../src/util/EventHelpers";
import {EvamEvents, Notification, Location} from "../../src";
import * as crypto from "crypto";
import * as _ from "lodash";

class TestEvamApi extends EvamApi {
    public constructor() {
        super();
    }
}

const evamApi = new TestEvamApi();

Object.defineProperty(globalThis, "crypto", {
    value: {
        getRandomValues: (arr: Uint8Array) => crypto.randomBytes(arr.length)
    }
});

/**
 * Store this so that we can unsubscribe from events so that callbacks set in one test don't get triggered in another.
 * See beforeEach
 */
let currentCallbackForVehicleServicesNotificationSentEvent: EventListenerOrEventListenerObject;

beforeEach(() => {
    unsubscribe(EvamEvents.VehicleServicesNotificationSent, currentCallbackForVehicleServicesNotificationSentEvent);
    evamApi.unsubscribeFromAllCallbacks();
    jest.resetAllMocks();
});


it("should trigger VehicleServicesNotificationSent event when sendNotification called", () => {
    const evamApi = new TestEvamApi();
    const callback = jest.fn();

    currentCallbackForVehicleServicesNotificationSentEvent = callback;

    subscribe(EvamEvents.VehicleServicesNotificationSent, currentCallbackForVehicleServicesNotificationSentEvent);

    expect(callback).not.toHaveBeenCalled();
    evamApi.sendNotification(notification);

    expect(callback).toHaveBeenCalledTimes(1);
});

it("should trigger notification callback when VehicleServicesNotificationCallbackTriggered event is dispatched after sendNotification method is invoked", () => {

    let button1UUID: string;
    let button2UUID: string;

    const primaryButtonCallbackSpy = jest.spyOn(notification.primaryButton, "callback");
    const secondaryButtonCallbackSpy = jest.spyOn(notification.secondaryButton, "callback");

    currentCallbackForVehicleServicesNotificationSentEvent = (e) => {
        const notification = (<CustomEvent>e).detail;
        button1UUID = notification.primaryButton.callback;
        button2UUID = notification.secondaryButton.callback;
    };

    subscribe(EvamEvents.VehicleServicesNotificationSent, currentCallbackForVehicleServicesNotificationSentEvent);

    evamApi.sendNotification(notification);

    expect(primaryButtonCallbackSpy).not.toHaveBeenCalled();
    publish(EvamEvents.VehicleServicesNotificationCallbackTriggered, button1UUID);
    expect(primaryButtonCallbackSpy).toHaveBeenCalledTimes(1);

    expect(secondaryButtonCallbackSpy).not.toHaveBeenCalled();
    publish(EvamEvents.VehicleServicesNotificationCallbackTriggered, button2UUID);
    expect(secondaryButtonCallbackSpy).toHaveBeenCalledTimes(1);
});

it("secondaryButton should NOT be provided a UUID when secondaryButton is not present in notification object", () => {

    let button1UUID: string | undefined;
    const notificationWithoutSecondaryButton = _.omit(notification,'secondaryButton');

    currentCallbackForVehicleServicesNotificationSentEvent = (e) => {
        const notification = (<CustomEvent>e).detail;
        button1UUID = notification.primaryButton.callback;
        expect(notification.secondaryButton).toBeUndefined();
    };

    subscribe(EvamEvents.VehicleServicesNotificationSent, currentCallbackForVehicleServicesNotificationSentEvent);

    evamApi.sendNotification(Notification.fromJSON(notificationWithoutSecondaryButton));

    expect(button1UUID).not.toBeUndefined();
});

it("notification triggers should not be called twice", () => {

    let button1UUID: string | undefined;
    let button2UUID: string | undefined;

    const primaryButtonCallbackSpy = jest.spyOn(notification.primaryButton, "callback");
    const secondaryButtonCallbackSpy = jest.spyOn(notification.secondaryButton, "callback");

    currentCallbackForVehicleServicesNotificationSentEvent = (e) => {
        const notification = (<CustomEvent>e).detail;
        button1UUID = notification.primaryButton.callback;
        button2UUID = notification.secondaryButton.callback;
    }

    subscribe(EvamEvents.VehicleServicesNotificationSent, currentCallbackForVehicleServicesNotificationSentEvent);

    evamApi.sendNotification(notification);

    expect(button1UUID).not.toBeUndefined();
    expect(button2UUID).not.toBeUndefined();

    expect(primaryButtonCallbackSpy).not.toHaveBeenCalled();
    publish(EvamEvents.VehicleServicesNotificationCallbackTriggered, button1UUID);
    expect(primaryButtonCallbackSpy).toHaveBeenCalledTimes(1);

    expect(secondaryButtonCallbackSpy).not.toHaveBeenCalled();
    publish(EvamEvents.VehicleServicesNotificationCallbackTriggered, button2UUID);
    publish(EvamEvents.VehicleServicesNotificationCallbackTriggered, button2UUID); //<--- This is how this line differs from the previous test
    expect(secondaryButtonCallbackSpy).toHaveBeenCalledTimes(1);
});

it('tests that Notification fromJSON correctly assigns right values',()=>{
    expect(convertedTripLocationHistory.locationHistory).not.toBeUndefined()
    expect(convertedTripLocationHistory.etaSeconds).not.toBeUndefined()

    expect(tripLocationHistory.locationHistory).toEqual(convertedTripLocationHistory.locationHistory)
    expect(tripLocationHistory.etaSeconds).toEqual(convertedTripLocationHistory.etaSeconds)
})

it('tests that Notification fromJSON throws error when heading, description, notificationType or primaryButton is not present in JSON',()=>{
    const tripLocationHistoryWithoutLocationHistory = _.omit(notification,'locationHistory')

    expect(()=> {
        Location.fromJSON(tripLocationHistoryWithoutLocationHistory);
    }).toThrow()

})
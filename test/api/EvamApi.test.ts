import {EvamApi} from "../../src";
import {InternetState} from "../../src";
import {DeviceRole} from "../../src";
import {
    convertedLocation,
    convertedOperation,
    convertedOperationWithAvailableHospitals, convertedOperationWithAvailablePriorities,
    convertedTripLocationHistory,
    convertedVehicleState
} from "../testdata";

class TestEvamApi extends EvamApi {
    public constructor() {
        super();
    }
}

beforeEach(() => {
    jest.resetAllMocks();
});


it("onNewOrUpdatedSettings triggers the callback after subscription to the event", () => {
    const settings = {test: "test"};
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectSettings(settings);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedSettings(listener);
    evamApi.injectSettings(settings);

    expect(listener).toHaveBeenCalledWith(expect.objectContaining(settings));
});

it("onNewOrUpdatedSettings doesn't trigger the callback after unsubscription from all events", () => {
    const settings = {test: "test"};
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectSettings(settings);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedSettings(listener);
    evamApi.injectSettings(settings);
    expect(listener).toHaveBeenCalledWith(expect.objectContaining(settings));

    evamApi.unsubscribeFromAllCallbacks();
    evamApi.injectSettings(settings);
    expect(listener).toHaveBeenCalledTimes(1);

});

it("onNewOrUpdatedSettings triggers multiple set callbacks", () => {
    const settings = {test: "test"};
    const listeners = [jest.fn(), jest.fn()];

    let evamApi = new TestEvamApi();

    evamApi.injectSettings(settings);

    listeners.forEach((listener) => {
        expect(listener).not.toHaveBeenCalled();
    });

    listeners.forEach((listener) => {
        evamApi.onNewOrUpdatedSettings(listener);
    });

    evamApi.injectSettings(settings);

    listeners.forEach((listener) => {
        expect(listener).toHaveBeenCalledTimes(1);
    });
});

it("onNewOrUpdatedOperation triggers the callback after subscription to the event", () => {
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectOperation(convertedOperation);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedOperation(listener);
    evamApi.injectOperation(convertedOperation);

    expect(listener).toHaveBeenCalledWith(
        expect.objectContaining(convertedOperation)
    );

});

it("onNewOrUpdatedLocation triggers the callback after subscription to the event", () => {
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectLocation(convertedLocation);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedLocation(listener);
    evamApi.injectLocation(convertedLocation);

    expect(listener).toHaveBeenCalledWith(
        expect.objectContaining(convertedLocation)
    );

});

it("onNewOrUpdatedInternetState triggers the callback after subscription to the event", () => {

    const internetState: InternetState = InternetState.NO_INTERNET;
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectInternetState(internetState);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedInternetState(listener);
    evamApi.injectInternetState(internetState);

    expect(listener).toHaveBeenCalledWith(
        internetState
    );

});

it("onNewOrUpdatedVehicleState triggers the callback after subscription to the event", () => {
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectVehicleState(convertedVehicleState);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedVehicleState(listener);
    evamApi.injectVehicleState(convertedVehicleState);

    expect(listener).toHaveBeenCalledWith(
        expect.objectContaining(convertedVehicleState)
    );

});

it("onNewOrUpdatedTripLocationHistory triggers the callback after subscription to the event", () => {
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectTrip(convertedTripLocationHistory);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedTripLocationHistory(listener);
    evamApi.injectTrip(convertedTripLocationHistory);

    expect(listener).toHaveBeenCalledWith(
        expect.objectContaining(convertedTripLocationHistory)
    );

});

it("onNewOrUpdatedDeviceRole triggers the callback after subscription to the event", () => {

    const deviceRole = DeviceRole.MAIN_DEVICE;
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectDeviceRole(deviceRole);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedDeviceRole(listener);
    evamApi.injectDeviceRole(deviceRole);

    expect(listener).toHaveBeenCalledWith(
        deviceRole
    );

});

it("setHospital correctly calls the injectOperation with the right data", () => {

    let evamApi = new TestEvamApi();
    const injectOperationSpy = jest.spyOn(evamApi, "injectOperation");

    const hospitalToSetId = convertedOperationWithAvailableHospitals.availableHospitalLocations.at(0).id;

    expect(hospitalToSetId).not.toBeUndefined();

    if (hospitalToSetId !== undefined) {
        expect(() => {
            evamApi.setHospital(hospitalToSetId);
        }).toThrow();

        expect(injectOperationSpy).not.toHaveBeenCalled();

        expect(convertedOperationWithAvailableHospitals.selectedHospital).toEqual(undefined);
        evamApi.injectOperation(convertedOperationWithAvailableHospitals);
        evamApi.setHospital(hospitalToSetId);

        expect(injectOperationSpy).toHaveBeenLastCalledWith(expect.objectContaining({
            selectedHospital: hospitalToSetId
        }));
    }

});

it("setPriority correctly calls the injectOperation with the right data", () => {

    let evamApi = new TestEvamApi();
    const injectOperationSpy = jest.spyOn(evamApi, "injectOperation");

    const priorityToSetId = convertedOperationWithAvailablePriorities.availablePriorities.at(0).id;

    expect(priorityToSetId).not.toBeUndefined();

    if (priorityToSetId !== undefined) {
        expect(() => {
            evamApi.setPriority(priorityToSetId);
        }).toThrow();

        expect(injectOperationSpy).not.toHaveBeenCalled();

        expect(convertedOperationWithAvailablePriorities.selectedPriority).toEqual(undefined);
        evamApi.injectOperation(convertedOperationWithAvailablePriorities);
        evamApi.setPriority(priorityToSetId);

        expect(injectOperationSpy).toHaveBeenLastCalledWith(expect.objectContaining({
            selectedPriority: priorityToSetId
        }));
    }

});
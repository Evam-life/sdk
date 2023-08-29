import {
    convertedBattery,
    convertedLocation,
    convertedOperation,
    convertedOperationList,
    convertedOperationWithAvailableHospitals,
    convertedOperationWithAvailablePriorities,
    convertedTripLocationHistory,
    convertedVehicleState
} from "../testdata";
import {DeviceRole, EvamApi, EvamEvent, InternetState} from "../../src";
import {waitFor} from "@testing-library/react";
import {publish} from "../../src/util/EventHelpers";

class TestEvamApi extends EvamApi {
    public constructor() {
        super();
    }
}

beforeEach(() => {
    jest.resetAllMocks();
});


it("onNewOrUpdatedSettings triggers the callback after subscription to the event", async () => {
    const settings = {test: "test"};
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectSettings(settings);

    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedSettings(listener);
    evamApi.injectSettings(settings);


    await waitFor(() => {
        expect(listener).toHaveBeenCalledWith(expect.objectContaining(settings));
    });

});

it("onNewOrUpdatedSettings doesn't trigger the callback after unsubscription from all events", async () => {
    const settings = {test: "test"};
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectSettings(settings);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedSettings(listener);
    evamApi.injectSettings(settings);

    await waitFor(() => {
        expect(listener).toHaveBeenCalledWith(expect.objectContaining(settings));
    });

    evamApi.unsubscribeFromAllCallbacks();
    evamApi.injectSettings(settings);

    await waitFor(() => {
        expect(listener).toHaveBeenCalledTimes(1);
    });

});

it("onNewOrUpdatedSettings triggers multiple set callbacks", async () => {
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

    await waitFor(() => {
        listeners.forEach((listener) => {
            expect(listener).toHaveBeenCalledTimes(1);
        });
    });

});

it("onNewOrUpdatedActiveOperation triggers the callback after subscription to the event", async () => {
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectOperation(convertedOperation);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedActiveOperation(listener);
    evamApi.injectOperation(convertedOperation);

    await waitFor(() => {
        expect(listener).toHaveBeenCalledWith(
            expect.objectContaining(convertedOperation)
        );
    });

});

it("onNewOrUpdatedLocation triggers the callback after subscription to the event", async () => {
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectLocation(convertedLocation);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedLocation(listener);
    evamApi.injectLocation(convertedLocation);

    await waitFor(() => {
        expect(listener).toHaveBeenCalledWith(
            expect.objectContaining(convertedLocation)
        );
    });

});

it("onNewOrUpdatedInternetState triggers the callback after subscription to the event", async () => {

    const internetState: InternetState = InternetState.NO_INTERNET;
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectInternetState(internetState);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedInternetState(listener);
    evamApi.injectInternetState(internetState);

    await waitFor(() => {
        expect(listener).toHaveBeenCalledWith(
            internetState
        );
    });

});

it("onNewOrUpdatedVehicleState triggers the callback after subscription to the event", async () => {
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectVehicleState(convertedVehicleState);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedVehicleState(listener);
    evamApi.injectVehicleState(convertedVehicleState);

    await waitFor(() => {
        expect(listener).toHaveBeenCalledWith(
            expect.objectContaining(convertedVehicleState)
        );
    });

});

it("onNewOrUpdatedTripLocationHistory triggers the callback after subscription to the event", async () => {
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectTrip(convertedTripLocationHistory);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedTripLocationHistory(listener);
    evamApi.injectTrip(convertedTripLocationHistory);

    await waitFor(() => {
        expect(listener).toHaveBeenCalledWith(
            expect.objectContaining(convertedTripLocationHistory)
        );
    });

});

it("onNewOrUpdatedDeviceRole triggers the callback after subscription to the event", async () => {

    const deviceRole = DeviceRole.MAIN_DEVICE;
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectDeviceRole(deviceRole);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedDeviceRole(listener);
    evamApi.injectDeviceRole(deviceRole);

    await waitFor(() => {
        expect(listener).toHaveBeenCalledWith(
            deviceRole
        );
    });

});

it("onNewOrUpdatedOperationList triggers the callback after subscription to the event", async () => {

    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectOperationList(convertedOperationList);

    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedOperationList(listener);
    evamApi.injectOperationList(convertedOperationList);

    await waitFor(() => {
        expect(listener).toHaveBeenCalledWith(
            convertedOperationList
        );
    });

});

it("onNewOrUpdatedBattery triggers the callback after subscription to the event", async () => {
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectBattery(convertedBattery);

    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedBattery(listener);
    evamApi.injectBattery(convertedBattery);

    await waitFor(() => {
        expect(listener).toHaveBeenCalledWith(convertedBattery);
    });
});

it("setHospital correctly calls the injectOperation with the right data", async () => {

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

        await waitFor(() => {
            expect(injectOperationSpy).toHaveBeenLastCalledWith(expect.objectContaining({
                selectedHospital: hospitalToSetId
            }));
        });

    }

});

it("setPriority correctly calls the injectOperation with the right data", async () => {

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

        await waitFor(() => {
            expect(injectOperationSpy).toHaveBeenLastCalledWith(expect.objectContaining({
                selectedPriority: priorityToSetId
            }));
        });
    }

});

describe("software versions",()=>{

    it("Software versions are undefined by default", async () => {
        const evamApi = new EvamApi();
        expect(evamApi.getVehicleServicesVersion()).toBeUndefined();
        expect(evamApi.getOSVersion()).toBeUndefined();
        expect(evamApi.getAppVersion()).toBeUndefined();
    });

    it("sets the app version correctly", async () => {
        const evamApi = new TestEvamApi();

        const appVersion = 1234;

        expect(evamApi.getAppVersion()).toBeUndefined();
        publish(EvamEvent.AppVersionSet, appVersion);
        await waitFor(() => {
            expect(evamApi.getAppVersion()).toEqual(appVersion);
        });
    });

    it("sets the OS version correctly", async () => {
        const evamApi = new TestEvamApi();
        const osVersion = 4567;

        expect(evamApi.getOSVersion()).toBeUndefined();
        publish(EvamEvent.OSVersionSet, osVersion);

        await waitFor(() => {
            expect(evamApi.getOSVersion()).toEqual(osVersion);
        });
    });

    it("sets the VS version correctly", async () => {
        const evamApi = new TestEvamApi();
        const vsVersion = 8910;

        expect(evamApi.getVehicleServicesVersion()).toBeUndefined();
        publish(EvamEvent.VehicleServicesVersionSet, vsVersion);

        await waitFor(() => {
            expect(evamApi.getVehicleServicesVersion()).toEqual(vsVersion);
        });
    });

})



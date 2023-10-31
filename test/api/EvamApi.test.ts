import {
    convertedBattery,
    convertedLocation,
    convertedOperation,
    convertedOperationList,
    convertedOperationWithAvailableHospitals,
    convertedOperationWithAvailablePriorities,
    convertedTripLocationHistory,
    convertedVehicleState,
    displayMode, operation,
    settings,
    tripLocationHistory
} from "../testdata";
import {
    DeviceRole,
    EvamApi,
    EvamEvent,
    InternetState,
    Location as EvamLocation,
    Operation,
    TripLocationHistory,
    VehicleState,
    VehicleStatus,
    Battery, HospitalLocation
} from "../../src";
import {waitFor} from "@testing-library/react";
import {publish} from "../../src/util/EventHelpers";
import crypto from "crypto";
import {BatteryHealth, BatteryPlugged, BatteryStatus, DisplayMode} from "../../src/domain";

class TestEvamApi extends EvamApi {
    public constructor() {
        super();
    }
}

beforeEach(() => {
    jest.resetAllMocks();
});

Object.defineProperty(globalThis, "crypto", {
    value: {
        getRandomValues: (arr: Uint8Array) => crypto.randomBytes(arr.length)
    }
});


it("all inject methods allow undefined", () => {
    const evamApi = new TestEvamApi();

    const {
        injectSettings,
        injectOperation,
        injectOperationList,
        injectTrip,
        injectLocation,
        injectVehicleState,
        injectInternetState,
        injectDisplayMode,
        injectBattery,
        injectDeviceRole
    } = evamApi;

    expect(() => {
        injectSettings(undefined);
        injectOperation(undefined);
        injectOperationList(undefined);
        injectTrip(undefined);
        injectLocation(undefined);
        injectVehicleState(undefined);
        injectInternetState(undefined);
        injectDisplayMode(undefined);
        injectBattery(undefined);
        injectDeviceRole(undefined);
    }).not.toThrow();
});


it("onNewOrUpdatedSettings triggers the callback after subscription to the event", async () => {
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
        expect(listener).toHaveBeenCalledTimes(2);
    });

});

it("onNewOrUpdatedSettings triggers multiple set callbacks", async () => {
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
            expect(listener).toHaveBeenCalledTimes(2);
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

it("onNewOrUpdatedDisplayMode triggers the callback after subscription to the event", async () => {
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectDisplayMode(displayMode);

    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedDisplayMode(listener);
    evamApi.injectDisplayMode(displayMode);

    await waitFor(() => {
        expect(listener).toHaveBeenCalledWith(displayMode);
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

describe("software versions", () => {

    const appVersion = "1234";
    const osVersion = "4567";
    const vsVersion = "8910";

    it("Software versions are undefined by default", async () => {
        const evamApi = new TestEvamApi();
        expect(evamApi.getVehicleServicesVersion()).toBeUndefined();
        expect(evamApi.getOSVersion()).toBeUndefined();
        expect(evamApi.getAppVersion()).toBeUndefined();
    });

    it("sets the app version correctly", async () => {
        const evamApi = new TestEvamApi();

        expect(evamApi.getAppVersion()).toBeUndefined();

        evamApi.injectAppVersion(appVersion);

        await waitFor(() => {
            expect(evamApi.getAppVersion()).toEqual(appVersion);
        });
    });

    it("sets the OS version correctly", async () => {
        const evamApi = new TestEvamApi();

        expect(evamApi.getOSVersion()).toBeUndefined();
        evamApi.injectOSVersion(osVersion);

        await waitFor(() => {
            expect(evamApi.getOSVersion()).toEqual(osVersion);
        });
    });

    it("sets the VS version correctly", async () => {
        const evamApi = new TestEvamApi();

        expect(evamApi.getVehicleServicesVersion()).toBeUndefined();

        evamApi.injectVSVersion(vsVersion);

        await waitFor(() => {
            expect(evamApi.getVehicleServicesVersion()).toEqual(vsVersion);
        });
    });

    it("doesn't reassign the app/os/vs version after it has been assigned", () => {
        const evamApi = new TestEvamApi();

        const oldAppVersion = appVersion;
        const oldOsVersion = osVersion;
        const oldVsVersion = vsVersion;

        const newAppVersion = oldAppVersion + "1";
        const newOsVersion = oldOsVersion + "1";
        const newVsVersion = oldVsVersion + "1";

        evamApi.injectAppVersion(oldAppVersion);
        evamApi.injectOSVersion(oldOsVersion);
        evamApi.injectVSVersion(oldVsVersion);

        expect(evamApi.getAppVersion()).toEqual(oldAppVersion);
        expect(evamApi.getOSVersion()).toEqual(oldOsVersion);
        expect(evamApi.getVehicleServicesVersion()).toEqual(oldVsVersion);

        publish(EvamEvent.AppVersionSet, newAppVersion);
        publish(EvamEvent.VehicleServicesVersionSet, newVsVersion);
        publish(EvamEvent.OSVersionSet, newOsVersion);

        expect(evamApi.getAppVersion()).toEqual(oldAppVersion);
        expect(evamApi.getOSVersion()).toEqual(oldOsVersion);
        expect(evamApi.getVehicleServicesVersion()).toEqual(oldVsVersion);

    });

    describe("device id", () => {
        const evampApi = new TestEvamApi();
        const exampleId = "12345";
        const exampleChangedId = exampleId + "1";

        expect(evampApi).not.toEqual(exampleChangedId);

        it("should be undefined by default", () => {
            expect(evampApi.getDeviceId()).toBeUndefined();
        });

        it("can be retrieved after being set", async () => {
            publish(EvamEvent.DeviceIdSet, exampleId);
            await waitFor(() => {
                expect(evampApi.getDeviceId()).toBe(exampleId);
            });
        });

        it("cannot be reset once initialised", async () => {
            publish(EvamEvent.DeviceIdSet, exampleChangedId);
            await waitFor(() => {
                expect(evampApi.getDeviceId()).toBe(exampleId);
            });
            await waitFor(() => {
                expect(evampApi.getDeviceId()).not.toBe(exampleChangedId);
            });
        });
    });
});

describe("gRPC", () => {

    const evamApi = new TestEvamApi();
    const gRPCAddress = "https://localhost:...";

    it("it is undefined by default", () => {
        expect(evamApi.getGRPC()).toBeUndefined();
    });

    it("then gets set by EvamEvent.GRPCEstablished event", async () => {
        publish(EvamEvent.GRPCEstablished, gRPCAddress);
        await waitFor(() => {
            expect(evamApi.getGRPC()).toEqual(gRPCAddress);
        });
    });

    it("should be able to change the GRPC address", async () => {
        const newAddress = gRPCAddress + "adding this to change the address";
        expect(gRPCAddress).not.toEqual(newAddress);
        publish(EvamEvent.GRPCEstablished, newAddress);
        await waitFor(() => {
            expect(evamApi.getGRPC()).toEqual(newAddress);
        });
    });
});

describe("persistent storage", () => {

    const evamApi = new TestEvamApi();
    const warningMessage = "Using EvamApi localstorage functions will not persist until you set the app id. If you are not running in Vehicle Services then you need to call";


    it("should warn you if you try to set items when app Id is undefined", async () => {
        const warnMock = jest.spyOn(global.console, "warn").mockImplementation(() => {
        });
        expect(warnMock).not.toHaveBeenCalledWith(warningMessage);

        expect(evamApi.getAppId()).toBeUndefined();
        evamApi.store.set("exampleKey", "exampleValue");
        evamApi.store.delete("exampleKey");
        evamApi.store.clear();

        await waitFor(() => {
            expect(warnMock).toHaveBeenCalledTimes(3);
        });

        warnMock.mockRestore();
    });

    it("should no longer warn you when app id is set", async () => {
        const warnMock = jest.spyOn(global.console, "warn").mockImplementation(() => {
        });

        expect(warnMock).not.toHaveBeenCalledWith(warningMessage);

        const newAppId = "12345";

        evamApi.injectAppId(newAppId);
        expect(evamApi.getAppId()).toEqual(newAppId);

        evamApi.store.set("exampleKey", "exampleValue");
        evamApi.store.delete("exampleKey");
        evamApi.store.clear();

        await waitFor(() => {
            expect(warnMock).toHaveBeenCalledTimes(0);
        });
        warnMock.mockRestore();

    });

    const exampleKey = "exampleKey";
    const exampleValue = "12345";

    it("should set an item then be able to get an item", async () => {

        expect(evamApi.store.get(exampleKey)).toBeNull();

        evamApi.store.set(exampleKey, exampleValue);

        await waitFor(() => {
            expect(evamApi.store.get(exampleKey)).toEqual(exampleValue);
        });
    });


    it("should delete the item with store.delete", () => {
        expect(evamApi.store.get(exampleKey)).not.toBeNull();
        evamApi.store.delete(exampleKey);
        expect(evamApi.store.get(exampleKey)).toBeNull();
    });

    it("should not be able to get the item when it doesn't exist", () => {
        expect(evamApi.store.get(exampleKey + "1234")).toBeNull();
    });

    it("should not be able to get the items when clear is called", () => {

        const exampleItemOne = {
            key: "12345",
            value: "12345"
        };

        const exampleItemTwo = {
            key: "45678",
            value: "45678"
        };

        //just for extra precaution
        expect(exampleItemOne.key).not.toEqual(exampleItemTwo.key);

        //Items don't already exist
        expect(evamApi.store.get(exampleItemOne.key)).toBeNull();
        expect(evamApi.store.get(exampleItemTwo.key)).toBeNull();

        //set items
        evamApi.store.set(exampleItemOne.key, exampleItemOne.value);
        evamApi.store.set(exampleItemTwo.key, exampleItemTwo.value);

        //get items
        expect(evamApi.store.get(exampleItemOne.key)).toEqual(exampleItemOne.value);
        expect(evamApi.store.get(exampleItemTwo.key)).toEqual(exampleItemTwo.value);

        evamApi.store.clear();

        //items don't exist again
        expect(evamApi.store.get(exampleItemOne.key)).toBeNull();
        expect(evamApi.store.get(exampleItemTwo.key)).toBeNull();
    });


});

it("should call callbacks with type Operation for newOrUpdatedOperation event", () => {
    const evamApi = new EvamApi();
    const detail = operation;
    const callbackFn = jest.fn();
    evamApi.onNewOrUpdatedActiveOperation(callbackFn);
    publish(EvamEvent.NewOrUpdatedOperation, detail);
    expect(callbackFn.mock.lastCall[0]).toBeInstanceOf(Operation);
});

it("should call callbacks with type Object for newOrUpdatedSettings event", () => {
    const evamApi = new EvamApi();
    const detail = {
        settingA: "12345"
    };
    const callbackFn = jest.fn();
    evamApi.onNewOrUpdatedSettings(callbackFn);
    publish(EvamEvent.NewOrUpdatedSettings, detail);
    expect(callbackFn.mock.lastCall[0]).toBeInstanceOf(Object);
});

it("should call callbacks with type DeviceRole for newOrUpdatedDeviceRole event", () => {
    const evamApi = new EvamApi();
    const detail: DeviceRole = DeviceRole.MAIN_DEVICE;
    const callbackFn = jest.fn();
    evamApi.onNewOrUpdatedDeviceRole(callbackFn);
    publish(EvamEvent.NewOrUpdatedDeviceRole, detail);
    expect(Object.values(DeviceRole)).toContain(callbackFn.mock.lastCall[0]);
});

it("should call callbacks with type Location for newOrUpdatedLocation event", () => {
    const evamApi = new EvamApi();
    const detail = {
        longitude: 0,
        latitude: 0
    };
    const callbackFn = jest.fn();
    evamApi.onNewOrUpdatedLocation(callbackFn);
    publish(EvamEvent.NewOrUpdatedLocation, detail);
    expect(callbackFn.mock.lastCall[0]).toBeInstanceOf(EvamLocation);
});

it("should call callbacks with type InternetState for newOrUpdatedInternetState event", () => {
    const evamApi = new EvamApi();
    const detail = InternetState.CONNECTED_2G;
    const callbackFn = jest.fn();
    evamApi.onNewOrUpdatedInternetState(callbackFn);
    publish(EvamEvent.NewOrUpdatedInternetState, detail);
    expect(Object.values(InternetState)).toContain(callbackFn.mock.lastCall[0]);
});

it("should call callbacks with type VehicleState for newOrUpdatedVehicleState event", () => {
    const evamApi = new EvamApi();
    const detail = VehicleState.fromJSON({
        timestamp: 0,
        vehicleStatus: {
            name: test,
            isStartStatus: true,
            isEndStatus: false,
            categoryType: "test",
            categoryName: "test"
        }
    });
    const callbackFn = jest.fn();

    evamApi.onNewOrUpdatedVehicleState(callbackFn);
    publish(EvamEvent.NewOrUpdatedVehicleState, detail);

    expect(callbackFn.mock.lastCall[0].vehicleStatus).toBeInstanceOf(VehicleStatus);
    expect(callbackFn.mock.lastCall[0]).toBeInstanceOf(VehicleState);

});

it("should contain type TripLocationHistory for when we dispatch a new CustomEvent of type \"newOrUpdatedTripLocationHistory\" with \"detail\" being a JSON", () => {

    const evamApi = new EvamApi();

    const detail = tripLocationHistory;

    const callbackFn = jest.fn();

    evamApi.onNewOrUpdatedTripLocationHistory(callbackFn);

    publish(EvamEvent.NewOrUpdatedTripLocationHistory, detail);
    expect(callbackFn.mock.lastCall[0]).toBeInstanceOf(TripLocationHistory);
    expect(callbackFn.mock.lastCall[0].locationHistory[0]).toBeInstanceOf(EvamLocation);
});


it("should contain type Operation for when we dispatch a new CustomEvent of type \"newOrUpdatedOperationList\" with \"detail\" being a JSON", () => {

    const evamApi = new EvamApi();

    const detail = [{
        "operationID": "1",
        "name": "Trafikolycka",
        "sendTime": 1697734938000,
        "createdTime": 1697734958000,
        "callCenterId": "18",
        "caseFolderId": "1358263",
        "radioGroupMain": "Sthm RAPS-01",
        "radioGroupSecondary": "230 RtjIns-1",
        "availablePriorities": [{"id": 1, "name": "PRIO 1"}, {"id": 2, "name": "PRIO 2"}, {
            "id": 3,
            "name": "PRIO 3"
        }],
        "vehicleStatus": {
            "name": "Lastat",
            "isStartStatus": false,
            "isEndStatus": false,
            "categoryType": "STATUS_MISSION",
            "categoryName": "mission",
            "successorName": "Lämnar",
            "event": "EVENT_EXIT_SITE"
        },
        "destinationSiteLocation": {
            "latitude": 59.368248333333334,
            "longitude": 18.020505,
            "street": "E4 Norrgående",
            "locality": "Stockholm",
            "municipality": "Stockholm"
        },
        "availableHospitalLocations": [{
            "id": -1006239340,
            "latitude": 59.36339,
            "longitude": 17.967539,
            "name": "My hospital",
            "street1": "",
            "city": "",
            "region": "",
            "postalCode": ""
        }, {
            "id": 105668922,
            "latitude": 59.353016,
            "longitude": 17.970813,
            "name": "Karolinska",
            "street1": "",
            "city": "",
            "region": "",
            "postalCode": ""
        }],
        "header1": "Personbil",
        "header2": "Övrigt",
        "selectedPriority": 1,
        "operationState": "ACTIVE"
    }];

    const callbackFn = jest.fn();

    evamApi.onNewOrUpdatedOperationList(callbackFn);
    publish(EvamEvent.NewOrUpdatedOperationList, detail);

    const operationPassedToLastCall = callbackFn.mock.lastCall[0][0];
    expect(operationPassedToLastCall).toBeInstanceOf(Operation);
    expect(operationPassedToLastCall.vehicleStatus).toBeInstanceOf(VehicleStatus);
    expect(operationPassedToLastCall.availableHospitalLocations[0]).toBeInstanceOf(HospitalLocation);
    expect(operationPassedToLastCall.sendTime).toBeInstanceOf(Date);
    expect(operationPassedToLastCall.createdTime).toBeInstanceOf(Date);
});

it("should call callbacks with type Battery for newOrUpdatedBattery event", () => {
    const evamApi = new EvamApi();
    const detail = Battery.fromJSON({
        health: "GOOD",
        plugged: "WIRELESS",
        status: "DISCHARGING",
        capacity: 0
    });
    const callbackFn = jest.fn();
    evamApi.onNewOrUpdatedBattery(callbackFn);

    publish(EvamEvent.NewOrUpdatedBattery, detail);

    const lastCallArg = callbackFn.mock.lastCall[0];
    expect(lastCallArg).toBeInstanceOf(Battery);

    expect(Object.values(BatteryHealth)).toContain(lastCallArg.health);
    expect(Object.values(BatteryPlugged)).toContain(lastCallArg.plugged);
    expect(Object.values(BatteryStatus)).toContain(lastCallArg.status);
    expect(lastCallArg.capacity).toEqual(0);


});

it("should call callbacks with type DisplayMode for newOrUpdatedDisplayMode event", () => {
    const evamApi = new EvamApi();
    const detail = DisplayMode.DARK;
    const callbackFn = jest.fn();
    evamApi.onNewOrUpdatedDisplayMode(callbackFn);

    publish(EvamEvent.NewOrUpdatedDisplayMode, detail);
    expect(Object.values(DisplayMode)).toContain(callbackFn.mock.lastCall[0]);
});
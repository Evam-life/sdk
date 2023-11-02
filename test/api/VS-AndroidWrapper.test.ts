import {EvamApi, Operation} from "../../src";
import {notification, operationWithAvailableHospitals, operationWithAvailablePriorities} from "../testdata";
import {publish} from "../../src/util/EventHelpers";
import {EvamEvent} from "../../src";

const sendNotificationMock = jest.fn().mockImplementation(() => {
});
const apiReadyMock = jest.fn().mockImplementation(() => {
});
const setItemMock = jest.fn().mockImplementation((key: string, value: string) => {
});
const getItemMock = jest.fn().mockImplementation((key: string) => {
});
const deleteItemMock = jest.fn().mockImplementation((key: string) => {
});
const clearItemsMock = jest.fn().mockImplementation((key: string) => {
});
const setHospitalMock = jest.fn().mockImplementation((id: number) => {
});
const setPriorityMock = jest.fn().mockImplementation((id: number) => {
});

jest.mock("uuid", () => ({
    ...jest.requireActual("uuid"),
    v4: jest.fn().mockImplementation(() => {
        return "undefined";
    })
}));
jest.mock("../../src/api/AndroidNativeHelpers", () => ({
    androidNativeHelpers: jest.fn().mockImplementation((arg: boolean) => ({
        sendNotification: sendNotificationMock,
        apiReady: apiReadyMock,
        setItem: setItemMock,
        getItem: getItemMock,
        deleteItem: deleteItemMock,
        clearItems: clearItemsMock,
        setHospital: setHospitalMock,
        setPriority: setPriorityMock
    })),
    isRunningInVehicleServices: true,
}));

describe("AndroidWrapper in Vehicle Services", () => {

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    it("EvamApi.isRunningInVehicleServices should equal true", () => {
        expect(EvamApi.isRunningInVehicleServices).toEqual(true);
    });

    it("should call apiReady on construction", () => {
        expect(apiReadyMock).not.toHaveBeenCalled();
        const evamApi = new EvamApi();
        expect(apiReadyMock).toHaveBeenCalled();
    });

    it("should use evamApi.store.set as a lightweight wrapper around Android.setItem when in VS", () => {
        const evamApi = new EvamApi();
        const key = "test";
        const value = "test";
        expect(setItemMock).not.toHaveBeenCalled();
        evamApi.store.set(key, value);
        expect(setItemMock).toHaveBeenCalledWith(key, value);
    });

    it("should use evamApi.store.get as a lightweight wrapper around Android.getItem when in VS", () => {
        const evamApi = new EvamApi();
        const key = "test";
        expect(getItemMock).not.toHaveBeenCalled();
        evamApi.store.get(key);
        expect(getItemMock).toHaveBeenCalledWith(key);
    });

    it("should use evamApi.store.deleteItem as a lightweight wrapper around Android.deleteItem when in VS", () => {
        const evamApi = new EvamApi();
        const key = "test";
        expect(deleteItemMock).not.toHaveBeenCalled();
        evamApi.store.delete(key);
        expect(deleteItemMock).toHaveBeenCalledWith(key);
    });

    it("should use evamApi.store.clear as a lightweight wrapper around Android.clearItems when in VS", () => {
        const evamApi = new EvamApi();
        expect(clearItemsMock).not.toHaveBeenCalled();
        evamApi.store.clear();
        expect(clearItemsMock).toHaveBeenCalled();
    });

    it("should use sendNotification as a lightweight wrapper around Android.sendNotification when in VS", () => {
        const evamApi = new EvamApi();
        evamApi.sendNotification(notification);
        expect(sendNotificationMock).toHaveBeenCalledWith(expect.objectContaining({
            heading: notification.heading,
            description: notification.description,
        }));
    });

    it("should use evamApi.setHospital as a lightweight wrapper around Android.setHospital when in VS", () => {
        const evamApi = new EvamApi()
        publish(EvamEvent.NewOrUpdatedOperation,operationWithAvailableHospitals)
        const {id} = operationWithAvailableHospitals.availableHospitalLocations[0];
        expect(setHospitalMock).not.toHaveBeenCalled();
        evamApi.setHospital(id)
        expect(setHospitalMock).toHaveBeenCalledWith(id);
    });

    it("should use evamApi.setPriority as a lightweight wrapper around Android.setPriority when in VS", () => {
        const evamApi = new EvamApi();
        publish(EvamEvent.NewOrUpdatedOperation,operationWithAvailablePriorities)
        const {id} = operationWithAvailablePriorities.availablePriorities[0]
        expect(setPriorityMock).not.toHaveBeenCalled();
        evamApi.setPriority(id)
        expect(setPriorityMock).toHaveBeenCalledWith(id);
    });

});
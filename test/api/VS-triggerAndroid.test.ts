import {androidNativeHelpers} from "../../src/api/AndroidNativeHelpers";
import {triggerAndroid} from "../../src/util/triggerAndroid";
import {_InternalVehicleServicesNotification} from "../../src/domain/_InternalVehicleServicesNotification";
import {NotificationType} from "../../src";
import {LayerPointData, LayerShapeData} from "../../sdk/domain/LayerData";

jest.mock("../../src/util/triggerAndroid", () => ({
    triggerAndroid: jest.fn()
}));

describe("triggerAndroid method calls triggerAndroid with primitive types", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("clearItems", () => {
        androidNativeHelpers(true).clearItems();
        expect(triggerAndroid).toHaveBeenLastCalledWith("clearItems");
    });

    it("getItem", () => {
        const itemName = "item";
        androidNativeHelpers(true).getItem(itemName);
        expect(triggerAndroid).toHaveBeenLastCalledWith("getItem", itemName);
    });

    it("sendNotification", () => {
        const notification: _InternalVehicleServicesNotification = {
            primaryButton: {
                label: "",
                callback: ""
            },
            description: "",
            notificationType: NotificationType.ACTION_HUN,
            secondaryButton: {
                label: "",
                callback: ""
            },
            heading: ""
        };
        androidNativeHelpers(true).sendNotification(notification);
        expect(triggerAndroid).toHaveBeenCalledWith("sendNotification", JSON.stringify(notification));
    });

    it("apiReady", () => {
        androidNativeHelpers(true).apiReady();
        expect(triggerAndroid).toHaveBeenCalledWith("apiReady");
    });

    it("setItem", () => {
        const key = "key";
        const value = "value";
        androidNativeHelpers(true).setItem(key, value);
        expect(triggerAndroid).toHaveBeenCalledWith("setItem", key, value);
    });

    it("deleteItem", () => {
        const key = "key";
        androidNativeHelpers(true).deleteItem(key);
        expect(triggerAndroid).toHaveBeenCalledWith("deleteItem", key);
    });

    it("setHospital", () => {
        const id = 0;
        androidNativeHelpers(true).setHospital(id);
        expect(triggerAndroid).toHaveBeenCalledWith("setHospital", id);
    });

    it("setPriority", () => {
        const id = 0;
        androidNativeHelpers(true).setPriority(id);
        expect(triggerAndroid).toHaveBeenCalledWith("setPriority", id);
    });

    it("setNavLayerPoint", () => {
        const layerData: LayerPointData[] = [];
        const id = "id";
        androidNativeHelpers(true).setNavLayerPoint(id, layerData);
        expect(triggerAndroid).toHaveBeenCalledWith("setNavLayerPoint", id, JSON.stringify(layerData));
    });

    it("setNavLayerShape", () => {
        const layerData: LayerShapeData[] = [];
        const id = "id";
        androidNativeHelpers(true).setNavLayerShape(id, layerData);
        expect(triggerAndroid).toHaveBeenCalledWith("setNavLayerShape", id, JSON.stringify(layerData));
    });

    it("deleteNavLayer", () => {
        const id = "id";
        androidNativeHelpers(true).deleteNavLayer(id);
        expect(triggerAndroid).toHaveBeenCalledWith("deleteNavLayer", id);
    });

});
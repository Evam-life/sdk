import {_InternalVehicleServicesNotification} from "../domain/_InternalVehicleServicesNotification";
import {LayerPointData, LayerShapeData} from "../domain/LayerData";
import { RawRakelAction } from "../domain/RawRakelAction";
import {triggerAndroid} from "../util/triggerAndroid";

const isRunningInVehicleServices = (() => {
    try {
        //@ts-ignore
        const android = Android;
        return (android !== undefined);
    } catch {
        return false;
    }
})();

/**
 *
 * This is a helper method which triggers the 'triggerAndroid' method.
 * This method allows you to pass serializable data to the arguments whereas triggerAndroid only accepts primitives.
 * @ignore
 * @param insideVs boolean for if you are in VehicleServices or not
 */
const androidNativeHelpers = (insideVs: boolean) => ({
    sendNotification: (notification: _InternalVehicleServicesNotification) => {
        if (insideVs) {
            try {
                const arg = JSON.stringify(notification);
                triggerAndroid("sendNotification", arg);
            } catch (e) {
                console.error(e);
            }
        }
    },
    apiReady: () => {
        if (insideVs) {
            try {
                triggerAndroid("apiReady");
            } catch (e) {
                console.error(e);
            }
        }
    },
    setItem: (key: string, value: string) => {
        if (insideVs) {
            try {
                triggerAndroid("setItem", key, value);
            } catch (e) {
                console.error(e);
            }
        }
    },
    getItem: (key: string) => {
        if (insideVs) {
            try {
                return triggerAndroid("getItem", key);
            } catch (e) {
                console.error(e);
            }
        }
        return null;
    },
    deleteItem: (key: string) => {
        if (insideVs) {
            try {
                triggerAndroid("deleteItem", key);
            } catch (e) {
                console.error(e);
            }
        }
    },
    clearItems: () => {
        if (insideVs) {
            try {
                console.log('this called')
                triggerAndroid("clearItems");
            } catch (e) {
                console.error(e);
            }
        }
    },
    setHospital: (id: number) => {
        if (insideVs) {
            try {
                triggerAndroid("setHospital", id);
            } catch (e) {
                console.error(e);
            }
        }
    },
    setPriority: (id: number) => {
        if (insideVs) {
            try {
                triggerAndroid("setPriority", id);
            } catch (e) {
                console.error(e);
            }
        }
    },
    setNavLayerPoint: (id: string, layerData: LayerPointData[]) => {
        if (insideVs) {
            try {
                const arg = JSON.stringify(layerData);
                triggerAndroid("setNavLayerPoint", id, arg);
            } catch (e) {
                console.error(e);
            }
        }
    },
    setNavLayerShape: (id: string, layerData: LayerShapeData[]) => {
        if (insideVs) {
            try {
                const arg = JSON.stringify(layerData);
                triggerAndroid("setNavLayerShape", id, arg);
            } catch (e) {
                console.error(e);
            }
        }
    },
    deleteNavLayer: (id: string) => {
        if (insideVs) {
            try {
                triggerAndroid("deleteNavLayer", id);
            } catch (e) {
                console.error(e);
            }
        }
    },
    sendRawRakelAction: (rawRakelAction: RawRakelAction) => {
        if (insideVs) {
            try {
                const data = JSON.stringify(rawRakelAction)
                triggerAndroid("sendRawRakelAction", data);
            } catch (e) {
                console.error(e)
            }
        }
    },
    putAppInForeground: () => {
        if (insideVs) {
            triggerAndroid("putAppInForeground");
        }
    }
});

export {androidNativeHelpers, isRunningInVehicleServices};
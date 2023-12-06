import {_InternalVehicleServicesNotification} from "../domain/_InternalVehicleServicesNotification";
import {LayerPointData, LayerShapeData} from "../domain/LayerData";

const isRunningInVehicleServices = (() => {
    try {
        //@ts-ignore
        const android = Android;
        return (android !== undefined);
    } catch {
        return false;
    }
})();

const androidNativeHelpers = (insideVs: boolean) => ({
    sendNotification: (notification: _InternalVehicleServicesNotification) => {
        if (insideVs) {
            try {
                //@ts-ignore
                Android.sendNotification(JSON.stringify(notification));
            } catch (e) {
                console.error(e);
            }
        }
    },
    apiReady: () => {
        if (insideVs) {
            try {
                //@ts-ignore
                Android.apiReady();
            } catch (e) {
                console.error(e);
            }
        }
    },
    setItem: (key: string, value: string) => {
        if (insideVs) {
            try {
                //@ts-ignore
                Android.setItem(key, value);
            } catch (e) {
                console.error(e);
            }
        }
    },
    getItem: (key: string) => {
        if (insideVs) {
            try {
                //@ts-ignore
                return Android.getItem(key);
            } catch (e) {
                console.error(e);
            }
        }
        return null;
    },
    deleteItem: (key: string) => {
        if (insideVs) {
            try {
                //@ts-ignore
                Android.deleteItem(key);
            } catch (e) {
                console.error(e);
            }
        }
    },
    clearItems: () => {
        if (insideVs) {
            try {
                //@ts-ignore
                Android.clearItems();
            } catch (e) {
                console.error(e);
            }
        }
    },
    setHospital: (id: number) => {
        if (insideVs) {
            try {
                //@ts-ignore
                Android.setHospital(id);
            } catch (e) {
                console.error(e);
            }
        }
    },
    setPriority: (id: number) => {
        if (insideVs) {
            try {
                //@ts-ignore
                Android.setPriority(id);
            } catch (e) {
                console.error(e);
            }
        }
    },
    setNavLayerPoint: (id: string, layerData: LayerPointData[]) => {
        if (insideVs) {
            try {
                //@ts-ignore
                Android.setNavLayerPoint(id, layerData);
            } catch (e) {
                console.error(e);
            }
        }
    },
    setNavLayerShape: (id: string, layerData: LayerShapeData[]) => {
        if (insideVs) {
            try {
                //@ts-ignore
                Android.setNavLayerShape(id, layerData);
            } catch (e) {
                console.error(e);
            }
        }
    },
    deleteNavLayer: (id: string) => {
        if (insideVs) {
            try {
                //@ts-ignore
                Android.deleteNavLayer(id);
            } catch (e) {
                console.error(e);
            }
        }
    }
});

export {androidNativeHelpers, isRunningInVehicleServices};
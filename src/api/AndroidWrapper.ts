import {_InternalVehicleServicesNotification} from "../domain/_InternalVehicleServicesNotification";
import {EvamEvent} from "../domain";


class AndroidWrapper {

    public static isRunningInVehicleServices: boolean = ((): boolean => {
        try {
            //@ts-ignore
            const android = Android;
            if ((android !== undefined)) {
                return true;
            }
            return false;
        } catch {
            return false;
        }
    })();

    constructor() {

    }

    public sendNotification = (notification: _InternalVehicleServicesNotification) => {
        if (AndroidWrapper.isRunningInVehicleServices) {
            //@ts-ignore
            Android.sendNotification(JSON.stringify(notification));
        }
        document.dispatchEvent(new CustomEvent(EvamEvent.VehicleServicesNotificationSent, {
            detail: notification
        }));
    };

    public apiReady = () => {
        if (AndroidWrapper.isRunningInVehicleServices) {
            //@ts-ignore
            Android.apiReady();
        }
    };

    public setItem = (key: string, value: string) => {
        if (AndroidWrapper.isRunningInVehicleServices) {
            //@ts-ignore
            Android.setItem(key, value);
        }
    };

    public getItem = (key: string): string => {
        if (AndroidWrapper.isRunningInVehicleServices) {
            //@ts-ignore
            return Android.getItem(key);
        }
    };

    public deleteItem = (key: string) => {
        if (AndroidWrapper.isRunningInVehicleServices) {
            //@ts-ignore
            Android.deleteItem(key);
        }
    };

    public clearItems = () => {
        if (AndroidWrapper.isRunningInVehicleServices) {
            //@ts-ignore
            Android.clearItems();
        }
    };

    public setHospital = (id: number) => {
        if (AndroidWrapper.isRunningInVehicleServices) {
            //@ts-ignore
            Android.setHospital(id);
        }
    };

    public setPriority = (id: number) => {
        if (AndroidWrapper.isRunningInVehicleServices) {
            //@ts-ignore
            Android.setPriority(id);
        }
    };

}

export default AndroidWrapper;
/**
 * Main API
 * @module EvamApi
 */

import {
    Battery,
    DeviceRole,
    DisplayMode,
    EvamEvent,
    InternetState,
    Location,
    Notification,
    Operation,
    TripLocationHistory,
    VehicleState
} from "../domain";
import {publish, subscribe, unsubscribe} from "../util/EventHelpers";
import {_InternalVehicleServicesNotification} from "../domain/_InternalVehicleServicesNotification";
import {v4 as uuidV4} from "uuid";
import _ from "lodash";

/**
 * @hidden
 */
class EvamData {
    constructor(
        public activeCase?: Operation | undefined,
        public settings?: object | undefined,
        public internetState?: InternetState | undefined,
        public deviceRole?: DeviceRole | undefined,
        public location?: Location | undefined,
        public vehicleState?: VehicleState | undefined,
        public tripLocationHistory?: TripLocationHistory | undefined,
        public operationList?: Operation[] | undefined,
        public battery?: Battery | undefined,
        public osVersion?: string | undefined,
        public vsVersion?: string | undefined,
        public appVersion?: string | undefined,
        public deviceId?: string | undefined,
        public displayMode?: DisplayMode | undefined
    ) {

    }
}

type CallbackFunction<T1, T2 = void> = (t: T1) => T2
type CallbackFunctionArray = Array<CallbackFunction<Event>>;

/**
 * Evam API singleton that exposes methods to interact with the Evam platform.
 *
 * @example
 * ```ts
 * // Get instance (don't be afraid to copy them around or create more, as they're simply a lightweight reference to shared static data)
 * const evamApi = new EvamApi();
 *
 * // Register a new callback on any operation update that simply logs it
 * evamApi.onNewOrUpdatedActiveOperation((activeOperation) => console.log(activeOperation));
 *
 * // Register a new callback on any application settings update that simply logs them
 * evamApi.onNewOrUpdatedSettings((settings) => console.log(settings));
 *
 * //Register a new callback to any specific application data update. Available register methods:
 * evamApi.onNewOrUpdatedDeviceRole((deviceRole) => ...);
 * evamApi.onNewOrUpdatedLocation((location) => ...);
 * evamApi.onNewOrUpdatedInternetState((internetState) => ...);
 * evamApi.onNewOrUpdatedVehicleState((vehicleState) => ...);
 * evamApi.onNewOrUpdatedTripLocationHistory((tripLocationHistory) => ...);
 *
 * // Send a new notification to VS (this will also work for the developer environment)
 * // This will display a notification with heading "example", description "lorem ipsum". It will have type 'QUICK_HUN' and a primary button
 * // which is labelled 'primary button' that doesn't do anything when called. The secondary button is not defined, thus it will not display.
 * evamApi.sendNotification(new Notification("example","lorem ipsum", NotificationType.QUICK_HUN, {label:'primary button', callback:()=>{}}, undefined))
 *
 * //Remove all callbacks from the SDK (this is useful for cleanup)
 * evamApi.unsubscribeFromAllCallbacks()
 *
 * //Detect whether the certified app is currently running in Vehicle Services
 * EvamApi.isRunningInVehicleServices
 *
 * //update the current hospital by id (be sure that the hospital is listed in available hospitals)
 * evamApi.setHospital(1234)
 *
 * //update the current priority (be sure that the priority is listed in available priorities)
 * evamApi.setPriority (1)
 *
 * //simulate Vehicle Services data inject (development + testing only)
 * //DO NOT USE THESE METHODS IN PRODUCTION, While not breaking by any means they will not perform any function.
 * evamApi.injectLocation(new Location(59.364, 18.012, new Date()))
 * evamApi.injectVehicleState(new VehicleState(...))
 * evamApi.injectTrip(new TripLocationHistory(...))
 * evamApi.injectDeviceRole(new DeviceRole(...))
 * evamApi.injectInternetState(new InternetState(...))
 * evamApi.injectOperation(new Operation(...))
 * evamApi.injectSettings(new Settings(...))
 * evamApi.injectOperationList([new Operation(...), new Operation(...), ...])
 * evamApi.injectBattery(new Battery(...)))
 *```
 *
 */
export class EvamApi {

    private static singletonExists = false;

    constructor() {
        if (!EvamApi.singletonExists) {
            EvamApi.subscribeToVehicleServiceNotifications();

            EvamApi.subscribeToAppVersionSet(); //The subscribeTo*Set commands unsubscribe automatically when such versions have been set
            EvamApi.subscribeToOSVersionSet();
            EvamApi.subscribeToVehicleServicesVersionSet();
            EvamApi.subscribeToDeviceIdSet();

            EvamApi.singletonExists = true;

            //TODO
            //Need to tell VS that we are now ready to receive software versions
        }
    }

    /**
     * EvamData instance for storing data regard Vehicle Services.
     * @private
     */
    private static evamData: EvamData = new EvamData();

    /**
     * These arrays store references to every callback subscribed to certain events. We use these references to later unsubscribe from DOM events.
     * @hidden
     */
    private static newOrUpdatedOperationCallbacks: CallbackFunctionArray = [];
    private static newOrUpdatedSettingsCallbacks: CallbackFunctionArray = [];
    private static newOrUpdatedLocationCallbacks: CallbackFunctionArray = [];
    private static newOrUpdatedDeviceRoleCallbacks: CallbackFunctionArray = [];
    private static newOrUpdatedInternetStateCallbacks: CallbackFunctionArray = [];
    private static newOrUpdatedVehicleStateCallbacks: CallbackFunctionArray = [];
    private static newOrUpdatedTripLocationHistoryCallbacks: CallbackFunctionArray = [];
    private static newOrUpdatedBatteryCallbacks: CallbackFunctionArray = [];
    private static newOrUpdatedDisplayModeCallbacks: CallbackFunctionArray = [];

    private static notificationCallbacks: Map<string, () => any> = new Map([]);

    /**
     * True if Vehicle Services environment is detected, False otherwise (for instance a web application)
     * We have to ignore this because the Android item causes an error.
     */
        //@ts-ignore
    public static readonly isRunningInVehicleServices: boolean = ((): boolean => {
        try {
            //@ts-ignore
            const android = Android;
            return (android !== undefined);
        } catch {
            return false;
        }
    })();

    /**
     * Unsubscribes all registered callbacks from Vehicle Service events.
     */
    unsubscribeFromAllCallbacks = () => {

        const clearCallbacksAndArray = (callbackFunctionArray: CallbackFunctionArray, event: EvamEvent) => {
            callbackFunctionArray.forEach((callback) => {
                unsubscribe(event, callback);
            });
            //This empties the array.
            //The reason I don't just do 'array = []' here is because TypeScript throws a warning, which will mess with pipelines.
            callbackFunctionArray.splice(0, callbackFunctionArray.length);
        };

        clearCallbacksAndArray(EvamApi.newOrUpdatedOperationCallbacks, EvamEvent.NewOrUpdatedOperation);
        clearCallbacksAndArray(EvamApi.newOrUpdatedSettingsCallbacks, EvamEvent.NewOrUpdatedSettings);
        clearCallbacksAndArray(EvamApi.newOrUpdatedLocationCallbacks, EvamEvent.NewOrUpdatedLocation);
        clearCallbacksAndArray(EvamApi.newOrUpdatedDeviceRoleCallbacks, EvamEvent.NewOrUpdatedDeviceRole);
        clearCallbacksAndArray(EvamApi.newOrUpdatedInternetStateCallbacks, EvamEvent.NewOrUpdatedInternetState);
        clearCallbacksAndArray(EvamApi.newOrUpdatedVehicleStateCallbacks, EvamEvent.NewOrUpdatedVehicleState);
        clearCallbacksAndArray(EvamApi.newOrUpdatedTripLocationHistoryCallbacks, EvamEvent.NewOrUpdatedTripLocationHistory);
        clearCallbacksAndArray(EvamApi.newOrUpdatedBatteryCallbacks, EvamEvent.NewOrUpdatedBattery);
        clearCallbacksAndArray(EvamApi.newOrUpdatedDisplayModeCallbacks, EvamEvent.NewOrUpdatedDisplayMode);

        EvamApi.notificationCallbacks = new Map();
    };

    /**
     * Sets the selected hospital id for the current active operation. The id must be present inside the available hospitals
     * @param id the id of the hospital to be set
     */
    setHospital(id: number) {
        if (EvamApi.evamData.activeCase.availableHospitalLocations === undefined || EvamApi.evamData.activeCase.availableHospitalLocations.length === 0) {
            throw Error("Current Operation has no available hospitals.");
        }
        const hl = EvamApi.evamData.activeCase.availableHospitalLocations.find((loc) => {
            return loc.id === id;
        });
        if (hl) {

            const newActiveOperation = _.clone(EvamApi.evamData.activeCase);
            newActiveOperation.selectedHospital = hl.id;
            this.injectOperation(newActiveOperation);

            //TODO
            //Android.setHospital

        } else {
            throw Error("Hospital id not located within available hospitals");
        }
    }

    /**
     * Sets the selected priority id for the current active operation. The id must be present inside the available priorities.
     * @param id of the priority to be set
     */
    setPriority(id: number) {
        if (EvamApi.evamData.activeCase === undefined) {
            throw Error("Can't set priority when there is no active case.");
        } else {
            const p = EvamApi.evamData.activeCase.availablePriorities.find((p) => {
                return p.id === id;
            });
            if (p) {
                const newActiveOperation = _.clone(EvamApi.evamData.activeCase);
                newActiveOperation.selectedPriority = p.id;

                this.injectOperation(newActiveOperation);
                //TODO
                //Android.setPriority

            } else {
                throw Error("Cant set priority when priority is not an available priority");
            }
        }
    }

    /**
     * Manually inject location to EvamApi (Only available in development.)
     * @param location the location to inject.
     */
    injectLocation(location: Location) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.location = location;
            publish(EvamEvent.NewOrUpdatedLocation, location);
        } else {
            throw Error("Injecting an Location is not allowed in the Vehicle Services environment.");
        }
    }

    /**
     * Manually inject vehicleState to EvamApi (Only available in development.)
     * @param vehicleState the vehicleState to inject.
     */
    injectVehicleState(vehicleState: VehicleState) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.vehicleState = vehicleState;
            publish(EvamEvent.NewOrUpdatedVehicleState, vehicleState);
        } else {
            throw Error("Injecting an VehicleState is not allowed in the Vehicle Services environment.");
        }
    }

    /**
     * Manually inject tripLocationHistory to EvamApi (Only available in development.)
     * @param tripLocationHistory the tripLocationHistory to inject.
     */
    injectTrip(tripLocationHistory: TripLocationHistory) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.tripLocationHistory = tripLocationHistory;
            publish(EvamEvent.NewOrUpdatedTripLocationHistory, tripLocationHistory);
        } else {
            throw Error("Injecting an TripLocationHistory is not allowed in the Vehicle Services environment.");
        }
    }

    /**
     * Manually inject deviceRole to EvamApi (Only available in development.)
     * @param deviceRole the deviceRole to inject.
     */
    injectDeviceRole(deviceRole: DeviceRole) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.deviceRole = deviceRole;
            publish(EvamEvent.NewOrUpdatedDeviceRole, deviceRole);
        } else {
            throw Error("Injecting an DeviceRole is not allowed in the Vehicle Services environment.");
        }
    }

    /**
     * Manually inject internetState to EvamApi (Only available in development.)
     * @param internetState the internetState to inject.
     */
    injectInternetState(internetState: InternetState) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.internetState = internetState;
            publish(EvamEvent.NewOrUpdatedInternetState, internetState);
        } else {
            throw Error("Injecting an internetState is not allowed in the Vehicle Services environment.");
        }
    }


    /**
     * Injects the Active Operation manually. This will trigger onNewOrUpdatedActiveOperation(...)'s callback.
     * This function is to be used for development only and will throw an error when used in Vehicle Services.
     * @param activeCase The active case to be injected for development purposes.
     */
    injectOperation(activeCase: Operation) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.activeCase = activeCase;
            publish(EvamEvent.NewOrUpdatedOperation, activeCase);
        } else {
            throw Error("Injecting an Operation is not allowed in the Vehicle Services environment, use the Vehicle Services Demo tool instead.");
        }
    }

    /**
     * Injects the settings manually. This will trigger onNewOrUpdatedSettings(...)'s callback.
     * This function is to be used for development only and will throw an error when used in Vehicle Services.
     * @param settings The settings to be injected for development purposes.
     */
    injectSettings(settings: any) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.settings = settings;
            publish(EvamEvent.NewOrUpdatedSettings, settings);
        } else {
            throw Error("Injecting settings is not allowed in the Vehicle Services environment, use a web browser instead.");
        }
    }

    /**
     * Injects the display mode manually. This will trigger onNewOrUpdatedDisplayMode(...)'s callback.
     * This function is to be used for development only and will throw an error when used in Vehicle Services.
     * @param displayMode The display mode (light or dark) to be injected for development purposes.
     */
    injectDisplayMode(displayMode: DisplayMode){
        if(!EvamApi.isRunningInVehicleServices){
            EvamApi.evamData.displayMode = displayMode;
            publish(EvamEvent.NewOrUpdatedDisplayMode, displayMode);
        } else {
            throw Error("Injecting display mode is not allowed in the Vehicle Services environment, use a web browser instead.");
        }
    }

    injectAppVersion(appVersion: string) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.appVersion = appVersion;
            publish(EvamEvent.AppVersionSet, appVersion);
        } else {
            throw Error("Injecting app version is not allowed in the Vehicle Services environment, use a web browser instead.");
        }
    }

    injectOSVersion(osVersion: string) {
        if (!EvamApi.isRunningInVehicleServices) {
            console.log(osVersion);
            console.log(osVersion===null);
            EvamApi.evamData.osVersion = osVersion;
            publish(EvamEvent.OSVersionSet, osVersion);
        } else {
            throw Error("Injecting OS version is not allowed in the Vehicle Services environment, use a web browser instead.");
        }
    }

    injectVSVersion(vsVersion: string) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.vsVersion = vsVersion;
            publish(EvamEvent.VehicleServicesVersionSet, vsVersion);
        } else {
            throw Error("Injecting VS version is not allowed in the Vehicle Services environment, use a web browser instead.");
        }
    }

    /**
     * Injects the operation list manually. This will trigger onNewOrUpdatedOperationList(...)'s callback.
     * This function is to be used for development only and will throw an error when used in Vehicle Services.
     * @param operationList The operation list to be injected for development purposes.
     */
    injectOperationList(operationList: Operation[]) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.operationList = operationList;
            publish(EvamEvent.NewOrUpdatedOperationList, operationList);
        } else {
            throw Error("Injecting operation list is not allowed in the Vehicle Services environment, use a web browser instead.");
        }
    }

    /**
     * Injects the battery manually. This will trigger onNewOrUpdatedBattery(...)'s callback.
     * This function is to be used for development only and will throw an error when used in Vehicle Services.
     * @param battery The battery to be injected for development purposes.
     */
    injectBattery(battery: Battery) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.battery = battery;
            publish(EvamEvent.NewOrUpdatedBattery, battery);
        } else {
            throw Error("Injecting battery is not allowed in the Vehicle Services environment, use a web browser instead.");
        }
    }

    getDeviceId = () => EvamApi.evamData.deviceId

    //These get*Version functions are different from the other ways of getting data from the SDK.
    //The software versions are set once and then not changed again, so it's fine to allow the developer to get these whenever they want.
    getAppVersion() {
        return EvamApi.evamData.appVersion;
    }

    getOSVersion() {
        return EvamApi.evamData.osVersion;
    }

    getVehicleServicesVersion() {
        return EvamApi.evamData.vsVersion;
    }

    /**
     * Registers a callback to be run upon a new Active Operation is available or the current Active
     * Operation is updated.
     * @param callback The callback to be executed
     */
    onNewOrUpdatedActiveOperation(callback: CallbackFunction<Operation | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                callback((e as CustomEvent).detail as Operation);
            };
            EvamApi.newOrUpdatedOperationCallbacks.push(c);
            subscribe(EvamEvent.NewOrUpdatedOperation, c);
        }
    }

    /**
     * Registers a callback to be run upon new application settings reception or settings update
     * @param callback The callback to be executed.
     */
    onNewOrUpdatedSettings(callback: CallbackFunction<any | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                callback((e as CustomEvent).detail as object);
            };
            EvamApi.newOrUpdatedSettingsCallbacks.push(c);
            subscribe(EvamEvent.NewOrUpdatedSettings, c);
        }
    }

    /**
     * Registers a callback to be run upon new device role or device role update
     * @param callback The callback to be executed.
     */
    onNewOrUpdatedDeviceRole(callback: CallbackFunction<DeviceRole | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                callback((e as CustomEvent).detail as DeviceRole);
            };
            EvamApi.newOrUpdatedDeviceRoleCallbacks.push(c);
            subscribe(EvamEvent.NewOrUpdatedDeviceRole, c);
        }
    }

    /**
     * Registers a callback to be run upon new location or location update
     * @param callback The callback to be executed.
     */
    onNewOrUpdatedLocation(callback: CallbackFunction<Location | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                callback((e as CustomEvent).detail as Location);
            };
            EvamApi.newOrUpdatedLocationCallbacks.push(c);
            subscribe(EvamEvent.NewOrUpdatedLocation, c);
        }
    }

    /**
     * Registers a callback to be run upon new internetState or internetState update
     * @param callback The callback to be executed.
     */
    onNewOrUpdatedInternetState(callback: CallbackFunction<InternetState | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                callback((e as CustomEvent).detail as InternetState);
            };
            EvamApi.newOrUpdatedInternetStateCallbacks.push(c);
            subscribe(EvamEvent.NewOrUpdatedInternetState, c);
        }
    }

    /**
     * Used to assign a callback when the vehicle state is created or updated.
     * @param callback The callback with (optional) argument vehicleState. Use this to access the vehicle state.
     */
    onNewOrUpdatedVehicleState(callback: CallbackFunction<VehicleState | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                callback((e as CustomEvent).detail as VehicleState);
            };
            EvamApi.newOrUpdatedVehicleStateCallbacks.push(c);
            subscribe(EvamEvent.NewOrUpdatedVehicleState, c);
        }
    }


    /**
     * Used to assign a callback when the trip location history is created or updated.
     * @param callback The callback with (optional) argument tripLocationHistory. Use this to access the trip location history.
     */
    onNewOrUpdatedTripLocationHistory(callback: CallbackFunction<TripLocationHistory | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                callback((e as CustomEvent).detail as TripLocationHistory);
            };
            EvamApi.newOrUpdatedTripLocationHistoryCallbacks.push(c);
            subscribe(EvamEvent.NewOrUpdatedTripLocationHistory, c);
        }
    }


    /**
     * Used to assign a callback when the operation list is created or updated.
     * @param callback The callback with (optional) argument operationList. Use this to access the operation list.
     */
    onNewOrUpdatedOperationList(callback: CallbackFunction<Operation[] | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                callback((e as CustomEvent).detail as Operation[]);
            };
            EvamApi.newOrUpdatedTripLocationHistoryCallbacks.push(c);
            subscribe(EvamEvent.NewOrUpdatedOperationList, c);
        }
    }

    /**
     * Used to assign a callback when the battery created or updated.
     * @param callback The callback with (optional) argument battery. Use this to access the battery.
     */
    onNewOrUpdatedBattery(callback: CallbackFunction<Battery | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                callback((e as CustomEvent).detail as Battery);
            };
            EvamApi.newOrUpdatedBatteryCallbacks.push(c);
            subscribe(EvamEvent.NewOrUpdatedBattery, c);
        }
    }

    onNewOrUpdatedDisplayMode(callback: CallbackFunction<DisplayMode | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                callback((e as CustomEvent).detail as DisplayMode);
            };
            EvamApi.newOrUpdatedDisplayModeCallbacks.push(c);
            subscribe(EvamEvent.NewOrUpdatedDisplayMode, c);
        }
    }

    /**
     * send a notification to vehicle services (or evam-dev-environment if using the dev environment)
     * @param notification
     */
    sendNotification(notification: Notification) {
        const {
            heading,
            description,
            notificationType,
            primaryButton,
            secondaryButton,
        } = notification;

        let primaryButtonCallbackUUID: string | undefined = undefined;
        let secondaryButtonCallbackUUID: string | undefined = undefined;

        //The UUID used to identify the callback
        //both callbacks have near-identical identifiers except for the last two digits
        //say the callback uuid generated is '12345' then the primary callback id will be '12345-p' whereas the secondary callback
        //will be '12345-s'
        //The reason we do this is that when the callbacks are stored they don't currently store which notification they belong to, but rather this
        //is handled by the notification. We now use this similar callback to identify the notification so that we can clear the memory of both (if both exist)
        //callbacks.
        const callbackUUID = uuidV4();


        if (primaryButton.callback) {
            //Store the primary button callback in the callbacks Map with an uuid
            primaryButtonCallbackUUID = callbackUUID + "-p";
            EvamApi.notificationCallbacks.set(primaryButtonCallbackUUID, primaryButton.callback);
        }

        //Store the secondary button callback in the callbacks Map with an uuid IF the secondary button is defined
        if ((secondaryButton !== undefined) && (secondaryButton.callback !== undefined)) {
            secondaryButtonCallbackUUID = callbackUUID + "-s";
            EvamApi.notificationCallbacks.set(secondaryButtonCallbackUUID, secondaryButton.callback);
        }

        const vehicleServicesNotificationToSend: _InternalVehicleServicesNotification = {
            heading,
            description,
            notificationType,
            primaryButton: {
                label: primaryButton.label,
                callback: primaryButtonCallbackUUID
            },
            secondaryButton: secondaryButton ? {
                label: secondaryButton.label,
                callback: secondaryButtonCallbackUUID
            } : undefined
        };

        publish(EvamEvent.VehicleServicesNotificationSent, vehicleServicesNotificationToSend);
    }

    private static triggerCallback = (uuid: string) => {
        const callback = EvamApi.notificationCallbacks.get(uuid);

        if (callback) {
            callback();
            EvamApi.notificationCallbacks.delete(uuid);

            //This deletes the other callback (so if we called secondary then primary is deleted from memory and vice versa)
            const isPrimaryCallback = uuid.slice(-2) === "-p"; //Primary callback UUIDs end with "-p" whereas secondary end with "-s"
            const correspondingCallbackTypeIdentifier = isPrimaryCallback ? "-s" : "-p"; //which kind of callback aren't we deleting (the one that wasn't called)
            const correspondingCallbackUUID = uuid.slice(0, -2) + correspondingCallbackTypeIdentifier; //the UUID will be the same as the triggered callback but with different last two chars
            const correspondingCallback = EvamApi.notificationCallbacks.get(correspondingCallbackUUID); //Find the callback


            if (correspondingCallback) { //If it exists then delete it
                EvamApi.notificationCallbacks.delete(correspondingCallbackUUID);
            }
        }
    };

    private static subscribeToVehicleServiceNotifications = () => {
        subscribe(EvamEvent.VehicleServicesNotificationCallbackTriggered, (e) => {
            const callbackId = (e as CustomEvent).detail;
            EvamApi.triggerCallback(callbackId);
        });
    };

    private static subscribeToOSVersionSet = () => {
        const osVersionSetSubscription = (e: Event) => {
            EvamApi.evamData.osVersion = (e as CustomEvent).detail;
            unsubscribe(EvamEvent.OSVersionSet, osVersionSetSubscription);
        };
        subscribe(EvamEvent.OSVersionSet, osVersionSetSubscription);
    };

    private static subscribeToAppVersionSet = () => {
        const appVersionSetSubscription = (e: Event) => {
            EvamApi.evamData.appVersion = (e as CustomEvent).detail as string;
            unsubscribe(EvamEvent.AppVersionSet, appVersionSetSubscription);
        };
        subscribe(EvamEvent.AppVersionSet, appVersionSetSubscription);
    };

    private static subscribeToVehicleServicesVersionSet = () => {
        const vehicleServicesVersionSetSubscription = (e: Event) => {
            EvamApi.evamData.vsVersion = (e as CustomEvent).detail as string;
            unsubscribe(EvamEvent.VehicleServicesVersionSet, vehicleServicesVersionSetSubscription);
        };
        subscribe(EvamEvent.VehicleServicesVersionSet, vehicleServicesVersionSetSubscription);
    };

    private static subscribeToDeviceIdSet = () => {
        const deviceIdSetSubscription = (e: Event) => {
            EvamApi.evamData.deviceId = (e as CustomEvent).detail as string;
            unsubscribe(EvamEvent.DeviceIdSet, deviceIdSetSubscription);
        };
        subscribe(EvamEvent.DeviceIdSet, deviceIdSetSubscription);
    };

}



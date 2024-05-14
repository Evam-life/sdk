/**
 * Main API
 * @module EvamApi
 */

import {
    Battery,
    DeviceRole,
    DisplayMode,
    EvamEvent,
    GRPC,
    InternetState,
    Location,
    Notification,
    Operation,
    TripLocationHistory,
    VehicleState, VehicleStatus, RakelState
} from "../domain";
import {publish, subscribe, unsubscribe} from "../util/EventHelpers";
import {_InternalVehicleServicesNotification} from "../domain/_InternalVehicleServicesNotification";
import {v4 as uuidV4} from "uuid";
import _ from "lodash";
import {androidNativeHelpers, isRunningInVehicleServices} from "./AndroidNativeHelpers";
import {LayerPointData, LayerShapeData} from "../domain/LayerData";
import {RawRakelAction} from "../domain/RawRakelAction";
import { PhoneCall } from "../domain/PhoneCall";

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
        public displayMode?: DisplayMode | undefined,
        public grpc?: GRPC | undefined,
        public appId?: string | undefined,
        public rakelState?: RakelState | undefined,
        public availableVehicleStatusList?: VehicleStatus[] | undefined,
        public rakelMessages?: string[] | undefined,
        public phoneCalls?: PhoneCall[] | undefined,
        public isMuted?: boolean | undefined,
    ) {

    }
}

const vsLog = (...args: Parameters<typeof console.log>) => {
    if (EvamApi.isRunningInVehicleServices) {
        console.log(args);
    }
};

type CallbackFunction<T1, T2 = void> = (t: T1) => T2
type CallbackFunctionArray = Array<CallbackFunction<Event>>;

/**
 * Evam API singleton that exposes methods to interact with the Evam platform.
 *
 * When using any method, pay attention to the permission they require, you will need to add them to your Evam manifest.
 * In general, try to limit how many permissions your certified app requires as more permissions may cause a longer review
 * process when deploying your certified app.
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
    public static isRunningInVehicleServices = isRunningInVehicleServices;

    constructor() {
        if (!EvamApi.singletonExists) {
            const appVersionSetSubscription = (e: Event) => {
                EvamApi.evamData.appVersion = (e as CustomEvent).detail as string;
                vsLog("appVersion set", (e as CustomEvent).detail);
                unsubscribe(EvamEvent.AppVersionSet, appVersionSetSubscription);
            };
            const osVersionSetSubscription = (e: Event) => {
                EvamApi.evamData.osVersion = (e as CustomEvent).detail;
                vsLog("osVersion set", (e as CustomEvent).detail);
                unsubscribe(EvamEvent.OSVersionSet, osVersionSetSubscription);
            };
            const vehicleServicesVersionSetSubscription = (e: Event) => {
                EvamApi.evamData.vsVersion = (e as CustomEvent).detail as string;
                vsLog("vsVersion set", (e as CustomEvent).detail);
                unsubscribe(EvamEvent.VehicleServicesVersionSet, vehicleServicesVersionSetSubscription);
            };

            const deviceIdSetSubscription = (e: Event) => {
                EvamApi.evamData.deviceId = (e as CustomEvent).detail as string;
                vsLog("deviceId set", (e as CustomEvent).detail);
                unsubscribe(EvamEvent.DeviceIdSet, deviceIdSetSubscription);
            };

            const appIdSetSubscription = (e: Event) => {

                const getAllItemsFromLocalStorage = (id: string) => {
                    for (const key in localStorage) {
                        //reg ex pattern
                        const pattern: RegExp = new RegExp(`^${id}.*`);
                        if (key.match(pattern)) {
                            const value = localStorage.getItem(key);
                            if (EvamApi.persistentStorageMap !== null) {
                                EvamApi.persistentStorageMap.set(key, value);
                            }
                        }
                    }
                };

                const appId = (e as CustomEvent).detail as string;
                EvamApi.evamData.appId = appId;
                vsLog("appId set", (e as CustomEvent).detail);
                getAllItemsFromLocalStorage(appId);
                unsubscribe(EvamEvent.AppIdSet, appIdSetSubscription);
            };

            subscribe(EvamEvent.VehicleServicesNotificationCallbackTriggered, (e) => {
                const {detail: callbackId} = (e as CustomEvent);
                if (typeof callbackId === "string") {
                    vsLog("triggerNotificationCallback", (e as CustomEvent).detail);
                    EvamApi.triggerNotificationCallback(callbackId);
                }
            });

            subscribe(EvamEvent.AppVersionSet, appVersionSetSubscription);
            subscribe(EvamEvent.OSVersionSet, osVersionSetSubscription);
            subscribe(EvamEvent.VehicleServicesVersionSet, vehicleServicesVersionSetSubscription);
            subscribe(EvamEvent.DeviceIdSet, deviceIdSetSubscription);
            subscribe(EvamEvent.AppIdSet, appIdSetSubscription);

            subscribe(EvamEvent.NewOrUpdatedOperation, (e) => {
                const {detail: op} = (e as CustomEvent);
                vsLog("NewOrUpdatedOperation", op);
                EvamApi.evamData.activeCase = op ? Operation.fromJSON(op) : undefined;
            });

            subscribe(EvamEvent.NewOrUpdatedSettings, (e) => {
                vsLog("NewOrUpdatedSettings", (e as CustomEvent).detail);
                EvamApi.evamData.settings = (e as CustomEvent).detail || undefined;
            });
            subscribe(EvamEvent.NewOrUpdatedInternetState, (e) => {
                const {detail: internetState} = (e as CustomEvent);
                vsLog("NewOrUpdatedInternetState", internetState);
                EvamApi.evamData.internetState = internetState ? internetState as InternetState : undefined;
            });
            subscribe(EvamEvent.NewOrUpdatedDeviceRoles, (e) => {
                const {detail: deviceRole} = (e as CustomEvent);
                vsLog("NewOrUpdatedDeviceRole", deviceRole);
                EvamApi.evamData.deviceRole = deviceRole ? deviceRole as DeviceRole : undefined;
            });
            subscribe(EvamEvent.NewOrUpdatedLocation, (e) => {
                const {detail: location} = (e as CustomEvent);
                vsLog("NewOrUpdatedLocation", location);
                EvamApi.evamData.location = location ? Location.fromJSON(location) : undefined;
            });
            subscribe(EvamEvent.NewOrUpdatedVehicleState, (e) => {
                const {detail: vehicleState} = (e as CustomEvent);
                vsLog("NewOrUpdatedVehicleState", vehicleState);
                EvamApi.evamData.vehicleState = vehicleState ? VehicleState.fromJSON(vehicleState) : undefined;
            });
            subscribe(EvamEvent.NewOrUpdatedTripLocationHistory, (e) => {
                const {detail: tlh} = (e as CustomEvent);
                vsLog("NewOrUpdatedTripLocationHistory", tlh);
                EvamApi.evamData.tripLocationHistory = tlh ? TripLocationHistory.fromJSON((e as CustomEvent).detail) : undefined;
            });
            subscribe(EvamEvent.NewOrUpdatedOperationList, (e) => {
                const list = (e as CustomEvent).detail;
                vsLog("NewOrUpdatedOperationList", list);
                if (Array.isArray(list)) {
                    EvamApi.evamData.operationList = list.map(Operation.fromJSON);
                }
            });
            subscribe(EvamEvent.NewOrUpdatedAvailableVehicleStatusList, (e) => {
                const list = (e as CustomEvent).detail;
                vsLog("NewOrUpdatedAvailableVehicleStatusList", list);
                if (Array.isArray(list)) {
                    EvamApi.evamData.availableVehicleStatusList = list.map(VehicleStatus.fromJSON);
                }
            });
            subscribe(EvamEvent.NewOrUpdatedBattery, (e) => {
                const {detail: battery} = (e as CustomEvent);
                vsLog("NewOrUpdatedBattery", battery);
                EvamApi.evamData.battery = battery ? Battery.fromJSON(battery) : undefined;
            });
            subscribe(EvamEvent.NewOrUpdatedDisplayMode, (e) => {
                const {detail: displayMode} = (e as CustomEvent);
                vsLog("NewOrUpdatedDisplayMode", displayMode);
                EvamApi.evamData.displayMode = displayMode ? displayMode as DisplayMode : undefined;
            });
            subscribe(EvamEvent.GRPCEstablished, (e) => {
                const {detail: grpc} = (e as CustomEvent);
                vsLog("GRPCEstablished", grpc);
                EvamApi.evamData.grpc = grpc || undefined;
            });
            subscribe(EvamEvent.NewOrUpdateRakelState, (e) => {
                const {detail: rakelState} = (e as CustomEvent);
                vsLog("RakelState", rakelState);
                EvamApi.evamData.rakelState = rakelState || undefined;
            });
            subscribe(EvamEvent.NewOrUpdatedRakelMessages, (e) => {
                const {detail: rakelMessages} = (e as CustomEvent);
                vsLog("RakelMessages", rakelMessages);
                EvamApi.evamData.rakelMessages = rakelMessages || undefined;
            });
            subscribe(EvamEvent.NewOrUpdatedCalls, (e) => {
                const {detail: phoneCalls} = (e as CustomEvent);
                vsLog("PhoneCalls", phoneCalls);
                EvamApi.evamData.phoneCalls = phoneCalls || undefined;
            });

            if (!EvamApi.isRunningInVehicleServices) EvamApi.persistentStorageMap = new Map([]);

            EvamApi.singletonExists = true;

            androidNativeHelpers(EvamApi.isRunningInVehicleServices).apiReady();
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
    private static newOrUpdatedOperationListCallbacks: CallbackFunctionArray = [];
    private static newOrUpdatedBatteryCallbacks: CallbackFunctionArray = [];
    private static newOrUpdatedDisplayModeCallbacks: CallbackFunctionArray = [];
    private static newOrUpdatedRakelStateCallbacks: CallbackFunctionArray = [];
    private static newOrUpdatedAvailableVehicleStatusList: CallbackFunctionArray = [];
    private static newOrUpdatedRakelMessages: CallbackFunctionArray = [];
    private static newOrUpdatedCalls: CallbackFunctionArray = [];
    private static newOrUpdatedMuteState: CallbackFunctionArray = [];


    private static notificationCallbacks: Map<string, CallbackFunction<void>> = new Map([]);

    /**
     * The persistentStorageMap object is only used for testing. It is null unless the isRunningInVehicleServices method
     * returns false.
     */
    private static persistentStorageMap: Map<string, any> | null = null;

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
        clearCallbacksAndArray(EvamApi.newOrUpdatedDeviceRoleCallbacks, EvamEvent.NewOrUpdatedDeviceRoles);
        clearCallbacksAndArray(EvamApi.newOrUpdatedInternetStateCallbacks, EvamEvent.NewOrUpdatedInternetState);
        clearCallbacksAndArray(EvamApi.newOrUpdatedVehicleStateCallbacks, EvamEvent.NewOrUpdatedVehicleState);
        clearCallbacksAndArray(EvamApi.newOrUpdatedTripLocationHistoryCallbacks, EvamEvent.NewOrUpdatedTripLocationHistory);
        clearCallbacksAndArray(EvamApi.newOrUpdatedBatteryCallbacks, EvamEvent.NewOrUpdatedBattery);
        clearCallbacksAndArray(EvamApi.newOrUpdatedDisplayModeCallbacks, EvamEvent.NewOrUpdatedDisplayMode);
        clearCallbacksAndArray(EvamApi.newOrUpdatedRakelStateCallbacks, EvamEvent.NewOrUpdateRakelState);
        clearCallbacksAndArray(EvamApi.newOrUpdatedAvailableVehicleStatusList, EvamEvent.NewOrUpdatedAvailableVehicleStatusList);
        clearCallbacksAndArray(EvamApi.newOrUpdatedRakelMessages, EvamEvent.NewOrUpdatedRakelMessages);
        clearCallbacksAndArray(EvamApi.newOrUpdatedCalls, EvamEvent.NewOrUpdatedCalls);
        clearCallbacksAndArray(EvamApi.newOrUpdatedMuteState, EvamEvent.NewOrUpdatedMuteState);


        EvamApi.notificationCallbacks.clear();

    };

    /**
     * Store used for persisting data within Vehicle Services. If you are in development and not running your application within vehicle services then this
     * will serve as a lightweight wrapper around localstorage. To avoid naming conflicts AppId must be set as it is used to identify application items.
     */
    store = {
        /**
         * Stores an item in Vehicle Services
         * @param key the identifying name of the item
         * @param value the value of the item
         */
        set: (key: string, value: string) => {
            if (EvamApi.isRunningInVehicleServices) {

                androidNativeHelpers(EvamApi.isRunningInVehicleServices).setItem(key, value);
            } else {
                if (EvamApi.persistentStorageMap !== null) {
                    EvamApi.persistentStorageMap.set(key, value);
                    if (this.getAppId() === undefined) {
                        console.warn("Using EvamApi localstorage functions will not persist until you set the app id. If you are not running in Vehicle Services then you need to call");
                        return;
                    }
                    localStorage.setItem(this.getAppId() + key, value);
                }
            }
        },
        /**
         * Retrieves an item from Vehicle Services
         * @param key the identifying name of the item
         */
        get: (key: string): string => {
            if (EvamApi.isRunningInVehicleServices) {
                return androidNativeHelpers(EvamApi.isRunningInVehicleServices).getItem(key);
            } else {
                if (EvamApi.persistentStorageMap !== null) {
                    if (this.getAppId() === undefined) {
                        return EvamApi.persistentStorageMap.get(key);
                    }
                    return localStorage.getItem(this.getAppId() + key);
                }
            }
        },
        /**
         * Deletes an item from Vehicle Services
         * @param key the identifying name of the item
         */
        delete: (key: string) => {
            if (EvamApi.isRunningInVehicleServices) {
                androidNativeHelpers(EvamApi.isRunningInVehicleServices).deleteItem(key);
            } else {
                if (EvamApi.persistentStorageMap !== null) {
                    EvamApi.persistentStorageMap.delete(key);
                    if (this.getAppId() === undefined) {
                        console.warn("Using EvamApi localstorage functions will not persist until you set the app id. If you are not running in Vehicle Services then you need to call");
                        return;
                    }
                    localStorage.removeItem(this.getAppId() + key);
                }
            }
        },
        /**
         * Deletes all item from Vehicle Services
         */
        clear: () => {
            if (EvamApi.isRunningInVehicleServices) {
                androidNativeHelpers(EvamApi.isRunningInVehicleServices).clearItems();
            } else {
                if (EvamApi.persistentStorageMap !== null) {
                    EvamApi.persistentStorageMap.clear();
                    if (this.getAppId() === undefined) {
                        console.warn("Using EvamApi localstorage functions will not persist until you set the app id. If you are not running in Vehicle Services then you need to call");
                        return;
                    }
                    localStorage.clear();
                }
            }
        }
    };

    /**
     * Sets the selected hospital id for the current active operation. The id must be present inside the available hospitals
     * @param id the id of the hospital to be set
     * @requires **Permissions** ACTIVE_OPERATION_WRITE
     * @category Operations
     * @requires **Version** Vehicle Services version 5.0.2 and above have full functionality. Other versions: function will throw an Error.
     */
    setHospital(id: number) {
        if (EvamApi.evamData.activeCase?.availableHospitalLocations === undefined || EvamApi.evamData.activeCase?.availableHospitalLocations.length === 0) {
            throw Error("Current Operation has no available hospitals.");
        }
        const hl = EvamApi.evamData.activeCase.availableHospitalLocations.find((loc) => {
            return loc.id === id;
        });
        if (hl) {
            if (!EvamApi.isRunningInVehicleServices) {
                const newActiveOperation = _.clone(EvamApi.evamData.activeCase);
                newActiveOperation.selectedHospital = hl.id;
                this.injectOperation(newActiveOperation);
            } else {
                androidNativeHelpers(EvamApi.isRunningInVehicleServices).setHospital(id);
            }
        } else {
            throw Error("Hospital id not located within available hospitals");
        }
    }

    /**
     * Sets the selected priority id for the current active operation. The id must be present inside the available priorities.
     * @param id of the priority to be set
     * @category Operations
     * @requires **Permissions** ACTIVE_OPERATION_WRITE
     * @requires **Version** Vehicle Services version 5.0.2 and above have full functionality. Other versions: function will trigger an error.
     */
    setPriority(id: number) {
        if (EvamApi.evamData.activeCase === undefined) {
            throw Error("Can't set priority when there is no active case.");
        } else {
            const p = EvamApi.evamData.activeCase.availablePriorities.find((p) => {
                return p.id === id;
            });
            if (p) {
                if (!EvamApi.isRunningInVehicleServices) {
                    const newActiveOperation = _.clone(EvamApi.evamData.activeCase);
                    newActiveOperation.selectedPriority = p.id;

                    this.injectOperation(newActiveOperation);
                } else {
                    androidNativeHelpers(EvamApi.isRunningInVehicleServices).setPriority(id);
                }
            } else {
                throw Error("Cant set priority when priority is not an available priority");
            }
        }
    }

    /**
     * Manually inject location to EvamApi (Only available in development.)
     * @param location the location to inject.
     * @category Testing and Development
     * @requires **Environment** Development (in web browser) only.
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
     * Manually inject the Available Vehicle Status list to EvamApi (Only available in development.)
     * @param vehicleStatusList the list of available Vehicle Statuses
     * @category Testing and Development
     * @requires **Environment** Development (in web browser) only.
     */
    injectAvailableVehicleStatusList(vehicleStatusList: VehicleStatus[]) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.availableVehicleStatusList = vehicleStatusList;
            publish(EvamEvent.NewOrUpdatedAvailableVehicleStatusList, vehicleStatusList);
        } else {
            throw Error("Injecting an AvailableVehicleStatusList is not allowed in the Vehicle Services environment.");
        }
    }

    /**
     * Manually inject the Rakel State to EvamApi (Only available in development.)
     * @param rakelState The Rakel State
     * @category Testing and Development
     * @requires **Environment** Development (in web browser) only.
     */
    injectRakelState(rakelState: RakelState) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.rakelState = rakelState;
            publish(EvamEvent.NewOrUpdateRakelState, rakelState);
        } else {
            throw Error("Injecting a RakelState is not allowed in the Vehicle Services environment.");
        }
    }

    /**
     * Manually inject vehicleState to EvamApi (Only available in development.)
     * @param vehicleState the vehicleState to inject.
     * @category Testing and Development
     * @requires **Environment** Development (in web browser) only.
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
     * @category Testing and Development
     * @requires **Environment** Development (in web browser) only.
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
     * @category Testing and Development
     * @requires **Environment** Development (in web browser) only.
     */
    injectDeviceRole(deviceRole: DeviceRole) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.deviceRole = deviceRole;
            publish(EvamEvent.NewOrUpdatedDeviceRoles, deviceRole);
        } else {
            throw Error("Injecting an DeviceRole is not allowed in the Vehicle Services environment.");
        }
    }

    /**
     * Manually inject internetState to EvamApi (Only available in development.)
     * @param internetState the internetState to inject.
     * @category Testing and Development
     * @requires **Environment** Development (in web browser) only.
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
     * @category Testing and Development
     * @requires **Environment** Development (in web browser) only.
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
     * @category Testing and Development
     * @requires **Environment** Development (in web browser) only.
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
     * @category Testing and Development
     * @requires **Environment** Development (in web browser) only.
     */
    injectDisplayMode(displayMode: DisplayMode) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.displayMode = displayMode;
            publish(EvamEvent.NewOrUpdatedDisplayMode, displayMode);
        } else {
            throw Error("Injecting display mode is not allowed in the Vehicle Services environment, use a web browser instead.");
        }
    }

    /**
     * Injects the app version manually.
     * This function is to be used for development only and will throw an error when used in Vehicle Services.
     * @param appVersion The app version to be injected for development purposes.
     * @category Testing and Development
     * @requires **Environment** Development (in web browser) only.
     */
    injectAppVersion(appVersion: string) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.appVersion = appVersion;
            publish(EvamEvent.AppVersionSet, appVersion);
        } else {
            throw Error("Injecting app version is not allowed in the Vehicle Services environment, use a web browser instead.");
        }
    }

    /**
     * Injects the OS version manually.
     * This function is to be used for development only and will throw an error when used in Vehicle Services.
     * @param osVersion The OS version to be injected for development purposes.
     * @category Testing and Development
     * @requires **Environment** Development (in web browser) only.
     */
    injectOSVersion(osVersion: string) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.osVersion = osVersion;
            publish(EvamEvent.OSVersionSet, osVersion);
        } else {
            throw Error("Injecting OS version is not allowed in the Vehicle Services environment, use a web browser instead.");
        }
    }

    /**
     * Injects the Vehicle Services platform version manually.
     * This function is to be used for development only and will throw an error when used in Vehicle Services.
     * @param vsVersion The Vehicle Services version to be injected for development purposes.
     * @category Testing and Development
     * @requires **Environment** Development (in web browser) only.
     */
    injectVSVersion(vsVersion: string) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.vsVersion = vsVersion;
            publish(EvamEvent.VehicleServicesVersionSet, vsVersion);
        } else {
            throw Error("Injecting VS version is not allowed in the Vehicle Services environment, use a web browser instead.");
        }
    }

    /**
     * Injects the certified app ID manually.
     * This function is to be used for development only and will throw an error when used in Vehicle Services.
     * @param appId The app ID to be injected for development purposes.
     * @category Testing and Development
     * @requires **Environment** Development (in web browser) only.
     */
    injectAppId(appId: string) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.appId = appId;
            publish(EvamEvent.AppIdSet, appId);
        } else {
            throw Error("Injecting app id is not allowed in the Vehicle Services environment, use a web browser instead.");
        }
    }

    /**
     * Injects the operation list manually. This will trigger onNewOrUpdatedOperationList(...)'s callback.
     * This function is to be used for development only and will throw an error when used in Vehicle Services.
     * @param operationList The operation list to be injected for development purposes.
     * @category Testing and Development
     * @requires **Environment** Development (in web browser) only.
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
     * @category Testing and Development
     * @requires **Environment** Development (in web browser) only.
     */
    injectBattery(battery: Battery) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.battery = battery;
            publish(EvamEvent.NewOrUpdatedBattery, battery);
        } else {
            throw Error("Injecting battery is not allowed in the Vehicle Services environment, use a web browser instead.");
        }
    }

    /**
     * Inject a list of raw Rakel messages as they would be received from the radio.
     * This function is to be used for development only and will throw an error when used in Vehicle Services.
     * @param rakelMessages list of raw Rakel messages.
     * @category Testing and Development
     * @requires **Environment** Development (in web browser) only.
     */
    injectRakelMessages(rakelMessages: string[]) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.rakelMessages = rakelMessages;
            publish(EvamEvent.NewOrUpdatedRakelMessages, rakelMessages);
        } else {
            throw Error("Injecting rakel messaged is not allowed in the VS environment, use a web browser instead");
        }
    }

    /**
     * Inject a list of {@link PhoneCall} as they are sent from Vehicle Services.
     * This function is to be used for development only and will throw an error when used in Vehicle Services.
     * @param calls the calls to be injected.
     * @category Testing and Development
     * @requires **Environment** Development (in web browser) only.
     */
    injectCalls(calls: PhoneCall[]) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.phoneCalls = calls;
            publish(EvamEvent.NewOrUpdatedCalls, calls);
        } else {
            throw Error("Injecting calls is not allowed in the VS environment, use a web browser instead");
        }
    }

    /**
     * Injects the mute state of the microphone.
     * This function is to be used for development only and will throw an error when used in Vehicle Services.
     * @param isMuted true if the microphone is muted.
     * @category Testing and Development
     * @requires **Environment** Development (in web browser) only.
     */
    injectMuteState(isMuted: boolean) {
        if (!EvamApi.isRunningInVehicleServices) {
            EvamApi.evamData.isMuted = isMuted;
            publish(EvamEvent.NewOrUpdatedMuteState, isMuted);
        } else {
            throw Error("Injecting mute state is not allowed in the VS environment, use a web browser instead");
        }
    }

    /**
     * Gets the address for the GRPC proxy
     */
    getGRPC = () => EvamApi.evamData.grpc;

    /**
     * Gets the device ID as defined in Android
     */
    getDeviceId = () => EvamApi.evamData.deviceId;

    /**
     * Gets the Evam App id as given by Vehicle Services
     */
    getAppId = () => EvamApi.evamData.appId;

    //These get*Version functions are different from the other ways of getting data from the SDK.
    //The software versions are set once and then not changed again, so it's fine to allow the developer to get these whenever they want.
    /**
     * Gets the Evam App version as defined in the evam.json manifest
     */
    getAppVersion = () => EvamApi.evamData.appVersion;

    /**
     * Gets the Android OS version
     */
    getOSVersion = () => EvamApi.evamData.osVersion;

    /**
     * Gets the Vehicle Services app version
     */
    getVehicleServicesVersion = () => EvamApi.evamData.vsVersion;


    /**
     * Registers a callback to be run upon a new Active Operation is available or the current Active
     * Operation is updated.
     * @category Operations
     * @requires **Permissions** ACTIVE_OPERATION_READ
     * @requires **Version** Vehicle Services version 5.0.0 and above have full functionality. Other versions: callback will never trigger.
     * @trigger The callback triggers every time the active Operation is updated, this can happen due to update by the dispatch (e.g. SOS), Evam Demo Tool or user edit (e.g. change of PRIO)
     * @param callback The callback to be executed
     */
    onNewOrUpdatedActiveOperation(callback: CallbackFunction<Operation | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                const op = (e as CustomEvent).detail;
                callback(op ? Operation.fromJSON(op) : undefined);
            };
            EvamApi.newOrUpdatedOperationCallbacks.push(c);
            c(new CustomEvent(EvamEvent.NewOrUpdatedOperation, {
                detail: EvamApi.evamData.activeCase
            }));
            subscribe(EvamEvent.NewOrUpdatedOperation, c);
        }
    }

    /**
     * Registers a callback to be run upon new application settings reception or settings update
     * @category Settings
     * @requires **Version** Vehicle Services version 5.0.0 and above have full functionality. Other versions: callback will never trigger.
     * @trigger The callback triggers every time the settings are updated for this certified app, and when the certified app starts. Vehicle Services synchronizes these settings with Evam Central Services once every few hours.
     * @param callback The callback to be executed.
     */
    onNewOrUpdatedSettings(callback: CallbackFunction<any | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                const settings = (e as CustomEvent).detail;
                callback(settings ? settings : undefined);
            };
            EvamApi.newOrUpdatedSettingsCallbacks.push(c);
            c(new CustomEvent(EvamEvent.NewOrUpdatedSettings, {
                detail: EvamApi.evamData.settings
            }));
            subscribe(EvamEvent.NewOrUpdatedSettings, c);
        }
    }

    /**
     * Registers a callback to be run upon new device role or device role update
     * @requires **Permissions** DEVICE_ROLE_READ
     * @category System
     * @requires **Version** Vehicle Services version 5.0.0 and above have full functionality. Other versions: callback will never trigger.
     * @trigger The callback triggers every time the device role is changed by the user through the Setup flow, and when the certified app starts.
     * @param callback The callback to be executed.
     */
    onNewOrUpdatedDeviceRole(callback: CallbackFunction<DeviceRole | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                const deviceRole = (e as CustomEvent).detail;
                callback(deviceRole ? deviceRole as DeviceRole : undefined);
            };
            EvamApi.newOrUpdatedDeviceRoleCallbacks.push(c);
            c(new CustomEvent(EvamEvent.NewOrUpdatedDeviceRoles, {
                detail: EvamApi.evamData.deviceRole
            }));
            subscribe(EvamEvent.NewOrUpdatedDeviceRoles, c);
        }
    }

    /**
     * Registers a callback to be run upon new location or location update
     * @category Navigation
     * @requires **Permissions** LOCATION_READ
     * @requires **Version** Vehicle Services version 5.0.0 and above have full functionality. Other versions: callback will never trigger.
     * @trigger The callback triggers every time the device location is updated through the GPS or Evam Demo Tool.
     * @param callback The callback to be executed.
     */
    onNewOrUpdatedLocation(callback: CallbackFunction<Location | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                const loc = (e as CustomEvent).detail;
                callback(loc ? Location.fromJSON(loc) : undefined);
            };
            EvamApi.newOrUpdatedLocationCallbacks.push(c);
            c(new CustomEvent(EvamEvent.NewOrUpdatedLocation, {
                detail: EvamApi.evamData.location
            }));
            subscribe(EvamEvent.NewOrUpdatedLocation, c);
        }
    }

    /**
     * Registers a callback to be run upon new internetState or internetState update
     * @category System
     * @requires **Permissions** CONNECTIVITY_READ
     * @requires **Version** Vehicle Services version 5.1.0 and above have full functionality. Other versions: callback will never trigger.
     * @trigger The callback triggers every time the state of the internet connectivity is updated, and when the certified app starts.
     * @param callback The callback to be executed.
     */
    onNewOrUpdatedInternetState(callback: CallbackFunction<InternetState | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                const internetState = (e as CustomEvent).detail;
                callback(internetState ? internetState as InternetState : undefined);
            };
            EvamApi.newOrUpdatedInternetStateCallbacks.push(c);
            c(new CustomEvent(EvamEvent.NewOrUpdatedInternetState, {
                detail: EvamApi.evamData.internetState
            }));
            subscribe(EvamEvent.NewOrUpdatedInternetState, c);
        }
    }

    /**
     * Used to assign a callback when the vehicle state is updated.
     * @category Operations
     * @requires **Permissions** VEHICLE_STATE_READ
     * @requires **Version** Vehicle Services version 5.0.0 and above have full functionality. Other versions: callback will never trigger.
     * @trigger The callback triggers every time any of the following is updated: device location, Operation ID, Vehicle Status.
     * @param callback The callback with (optional) argument vehicleState. Use this to access the vehicle state.
     */
    onNewOrUpdatedVehicleState(callback: CallbackFunction<VehicleState | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                const vehicleState = (e as CustomEvent).detail;
                callback(vehicleState ? VehicleState.fromJSON(vehicleState) : undefined);
            };
            EvamApi.newOrUpdatedVehicleStateCallbacks.push(c);
            c(new CustomEvent(EvamEvent.NewOrUpdatedVehicleState, {
                detail: EvamApi.evamData.vehicleState
            }));
            subscribe(EvamEvent.NewOrUpdatedVehicleState, c);
        }
    }


    /**
     * Used to assign a callback when the trip location history is updated.
     * @category Navigation
     * @requires **Permissions** TRIP_HISTORY_READ
     * @requires **Version** Vehicle Services version 5.1.0 and above have full functionality. Other versions: callback will never trigger.
     * @trigger The callback triggers every time any of the following is updated: device location, ETA to destination, distance to destination, navigation state.
     * @param callback The callback with (optional) argument tripLocationHistory. Use this to access the trip location history.
     */
    onNewOrUpdatedTripLocationHistory(callback: CallbackFunction<TripLocationHistory | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                const {detail} = (e as CustomEvent);
                callback(detail ? TripLocationHistory.fromJSON(detail) : undefined);
            };
            EvamApi.newOrUpdatedTripLocationHistoryCallbacks.push(c);
            c(new CustomEvent(EvamEvent.NewOrUpdatedTripLocationHistory, {
                detail: EvamApi.evamData.tripLocationHistory
            }));
            subscribe(EvamEvent.NewOrUpdatedTripLocationHistory, c);
        }
    }


    /**
     * Used to assign a callback when the operation list is updated.
     * @category Operations
     * @requires **Permissions** OPERATION_READ
     * @requires **Version** Vehicle Services version 5.1.0 and above have full functionality. Other versions: callback will never trigger.
     * @trigger The callback triggers every time any Operation is updated in the Evam platform, including the Active one.
     * @param callback The callback with (optional) argument operationList. Use this to access the operation list.
     */
    onNewOrUpdatedOperationList(callback: CallbackFunction<Operation[] | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                const ol = (e as CustomEvent).detail;
                if (Array.isArray(ol)) {
                    callback(ol.map<Operation>(Operation.fromJSON));
                } else if (ol === undefined) {
                    callback(undefined);
                }

            };
            EvamApi.newOrUpdatedOperationListCallbacks.push(c);
            c(new CustomEvent(EvamEvent.NewOrUpdatedOperationList, {
                detail: EvamApi.evamData.operationList
            }));
            subscribe(EvamEvent.NewOrUpdatedOperationList, c);
        }
    }

    /**
     * Used to assign a callback when the battery data is updated.
     * @category System
     * @requires **Permissions** BATTERY_READ
     * @requires **Version** Vehicle Services version 5.1.0 and above have full functionality. Other versions: callback will never trigger.
     * @trigger The callback triggers every time the battery state is updated: charge, health, plugged status, or capacity. And when the certified app starts.
     * @param callback The callback with (optional) argument battery. Use this to access the battery.
     */
    onNewOrUpdatedBattery(callback: CallbackFunction<Battery | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                const battery = (e as CustomEvent).detail;
                callback(battery ? battery as Battery : undefined);
            };
            EvamApi.newOrUpdatedBatteryCallbacks.push(c);
            c(new CustomEvent(EvamEvent.NewOrUpdatedBattery, {
                detail: EvamApi.evamData.battery
            }));
            subscribe(EvamEvent.NewOrUpdatedBattery, c);
        }
    }

    /**
     *
     * Used to assign a callback when the display mode is updated.
     * @category System
     * @requires **Permissions** DISPLAY_MODE_READ
     * @requires **Version** Vehicle Services version 5.2.0 and above have full functionality. Other versions: callback will never trigger.
     * @trigger The callback triggers every time the display mode is updated, either by the user or automatically based on the time of the day if the user chose to have to automatically updated.
     * @param callback The callback with (optional) argument display mode. Use this to access the display mode.
     */
    onNewOrUpdatedDisplayMode(callback: CallbackFunction<DisplayMode | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                const displayMode = (e as CustomEvent).detail;
                callback(displayMode ? displayMode as DisplayMode : undefined);
            };
            EvamApi.newOrUpdatedDisplayModeCallbacks.push(c);
            c(new CustomEvent(EvamEvent.NewOrUpdatedDisplayMode, {
                detail: EvamApi.evamData.displayMode
            }));
            subscribe(EvamEvent.NewOrUpdatedDisplayMode, c);
        }
    }

    /**
     * Used to assign a callback when the rakel state is created or updated
     * @category Radio
     * @requires **Permissions** RAKEL_STATE_READ
     * @requires **Version** Vehicle Services version 5.2.0 and above have full functionality. Other versions: callback will never trigger.
     * @trigger The callback triggers every time any of the following changes: GSSI, MSISDN, ISSI of the connected radio. Also, when the certified app starts.
     * @param callback The callback with (optional) argument Rakel state. Use this to access the Rakel state.
     */
    onNewOrUpdatedRakelState(callback: CallbackFunction<RakelState | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                const rakelState = (e as CustomEvent).detail;
                callback(rakelState ? rakelState as RakelState : undefined);
            };
            EvamApi.newOrUpdatedRakelStateCallbacks.push(c);
            c(new CustomEvent(EvamEvent.NewOrUpdateRakelState, {
                detail: EvamApi.evamData.rakelState
            }));
            subscribe(EvamEvent.NewOrUpdateRakelState, c);
        }
    }

    /**
     * Used to assign a callback when the list of available Vehicle Statuses is created or updated
     * @category Operations
     * @requires **Permissions** AVAILABLE_VEHICLE_STATUS_LIST_READ
     * @requires **Version** Vehicle Services version 5.1.0 and above have full functionality. Other versions: callback will never trigger.
     * @trigger The callback triggers every time the list of available Vehicle Statuses is updated for this vehicle, and also when the certified app starts.
     * @param callback The callback with (optional) argument available Vehicle Status list. Use this to access the available Vehicle Statuses.
     */
    onNewOrUpdatedAvailableVehicleStatusList(callback: CallbackFunction<VehicleStatus[] | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                const vl = (e as CustomEvent).detail;
                if (Array.isArray(vl)) {
                    callback(vl.map<VehicleStatus>(VehicleStatus.fromJSON));
                } else if (vl === undefined) {
                    callback(undefined);
                }

            };
            EvamApi.newOrUpdatedAvailableVehicleStatusList.push(c);
            c(new CustomEvent(EvamEvent.NewOrUpdatedAvailableVehicleStatusList, {
                detail: EvamApi.evamData.availableVehicleStatusList
            }));
            subscribe(EvamEvent.NewOrUpdatedAvailableVehicleStatusList, c);
        }
    }

    /**
     * Used to assign a callback when the incoming Rakel messages are updated.
     * The messages are piped though in the raw form as they are received from the radio.
     * @category Radio
     * @requires **Permissions** RAKEL_COMMUNICATION_READ
     * @requires **Version** Vehicle Services version 5.2.0 and above have full functionality. Other versions: callback will never trigger.
     * @trigger The callback triggers every time new messages are available from the connected Tetra terminal.
     * @param callback The callback with (optional) argument Rakel messages. Use this to access the incoming Rakel messages.
     */
    onNewOrUpdatedRakelMessages(callback: CallbackFunction<string[] | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                const messages = (e as CustomEvent).detail;
                if (Array.isArray(messages)) {
                    callback(messages);
                    //the reason we check for null here is that dispatching an undefined detail to an event becomes null
                    //this is silly legacy JS stuff
                } else if (messages === undefined || messages === null) {
                    callback(undefined);
                }
            };
            EvamApi.newOrUpdatedRakelMessages.push(c);
            c(new CustomEvent(EvamEvent.NewOrUpdatedRakelMessages, {
                detail: EvamApi.evamData.rakelMessages
            }));
            subscribe(EvamEvent.NewOrUpdatedRakelMessages, c);
        }
    }

     /**
     * Used to assign a callback when the phone calls are updated.
     * @category Telephony
     * @requires **Permissions** TELEPHONY
     * @requires **Version** Vehicle Services version 5.2.4 and above have full functionality. Other versions: callback will never trigger.
     * @trigger The callback triggers every time the state of incoming calls is updated: new incoming call, hangup etc.
     * @param callback The callback with (optional) argument array of {@link PhoneCall}. Use this to access the current phone calls.
     */
    onNewOrUpdatedCalls(callback: CallbackFunction<PhoneCall[] | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                const calls = (e as CustomEvent).detail;
                if (Array.isArray(calls)) {
                    callback(calls);
                } else if (calls === undefined || calls === null) {
                    callback(undefined);
                }
            };
            EvamApi.newOrUpdatedCalls.push(c);
            c(new CustomEvent(EvamEvent.NewOrUpdatedCalls, {
                detail: EvamApi.evamData.phoneCalls
            }));
            subscribe(EvamEvent.NewOrUpdatedCalls, c);
        }
    }

     /**
     * Used to assign a callback when the device's microphone mute state is updated.
     * @category Telephony
     * @requires **Permissions** TELEPHONY
     * @requires **Version** Vehicle Services version 5.2.4 and above have full functionality. Other versions: callback will never trigger.
     * @trigger The callback triggers every time the device's microphone mute state is updated.
     * @param callback The callback with (optional) argument boolean. Use this to access the current microphone mute state.
     */
    onNewOrUpdatedMuteState(callback: CallbackFunction<boolean | undefined>) {
        if (callback) {
            const c = (e: Event) => {
                const isMuted = (e as CustomEvent).detail;
                callback(isMuted);
            };
            EvamApi.newOrUpdatedMuteState.push(c);
            c(new CustomEvent(EvamEvent.NewOrUpdatedMuteState, {
                detail: EvamApi.evamData.isMuted
            }));
            subscribe(EvamEvent.NewOrUpdatedMuteState, c);
        }
    }

    /**
     * Send a notification to Vehicle Services.
     * @category Notifications
     * @requires **Permissions** SEND_NOTIFICATION
     * @requires **Version** Vehicle Services version 5.1.0 and above have full functionality. Other versions: function with throw an Error.
     * @param notification The notification to be sent
     * @requires **Environment** Evam device only
     */
    sendNotification(notification: Notification) {
        const {
            notificationId,
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
            } : undefined,
            notificationId
        };

        if (EvamApi.isRunningInVehicleServices) {
            androidNativeHelpers(EvamApi.isRunningInVehicleServices).sendNotification(vehicleServicesNotificationToSend);
        }

        publish(EvamEvent.VehicleServicesNotificationSent, vehicleServicesNotificationToSend);
    }

    private static triggerNotificationCallback = (uuid: string) => {
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

    /**
     * Adds/Update a layer by its ID. Reusing a layerID causes the data to be replaced. A certified app can only update a layer it has created.
     * This function adds a set of points on the map with text and icon at the specified lat and lon
     * @category Navigation
     * @param id the id of the layer (if the layer doesn't exist then one will be created)
     * @param layerData array of points to be shown with text and icon. Note that the icon of the first element will be used for all points.
     * @requires **Permissions** NAVIGATION_PRIVATE_LAYERS
     * @requires **Version** Vehicle Services version 5.0.2 and above have full functionality. Other versions: function will throw an Error.
     * @requires **Environment** Evam device only
     */
    setNavLayerPoint = (id: string, layerData: LayerPointData[]) => {
        publish(EvamEvent.NavLayerPointSet, {
            id,
            layerData
        });
        androidNativeHelpers(EvamApi.isRunningInVehicleServices).setNavLayerPoint(id, layerData);
    };

    /**
     * Adds/Update a layer by its ID. Reusing a layerID causes the data to be replaced. A certified app can only update a layer it has created.
     * This function adds a set of shapes on the map with the text in its center.
     * @category Navigation
     * @param id the id of the layer (if the layer doesn't exist then one will be created)
     * @param layerData array of shapes to be shown with text and shape color (format: "#AARRGGBB", just like the SC buttons)
     * @requires **Permissions** NAVIGATION_PRIVATE_LAYERS
     * @requires **Version** Vehicle Services version 5.0.2 and above have full functionality. Other versions: function will throw an Error.
     * @requires **Environment** Evam device only
     */
    setNavLayerShape = (id: string, layerData: LayerShapeData[]) => {
        publish(EvamEvent.NavLayerShapeSet, {
            id,
            layerData
        });
        androidNativeHelpers(EvamApi.isRunningInVehicleServices).setNavLayerShape(id, layerData);
    };

    /**
     * Deletes a layer by its ID. A certified app can only delete a layer it has created.
     * @category Navigation
     * @param id the id of the layer
     * @requires **Permissions** NAVIGATION_PRIVATE_LAYERS
     * @requires **Version** Vehicle Services version 5.0.2 and above have full functionality. Other versions: function will throw an Error.
     * @requires **Environment** Evam device only
     */
    deleteNavLayer = (id: string) => {
        publish(EvamEvent.NavLayerDeleted, id);
        androidNativeHelpers(EvamApi.isRunningInVehicleServices).deleteNavLayer(id);
    };


    /**
     * Sends a RawRakelAction to the Rakel radio.
     * @category Radio
     * @param rawRakelAction the RawRakelAction to be sent to the radio.
     * @requires **Permissions** RAKEL_RAW_COMMAND_SEND
     * @requires **Version** Vehicle Services version 5.1.0 and above have full functionality. Other versions: function will throw an Error.
     */
    sendRawRakelAction = (rawRakelAction: RawRakelAction) => {
        publish(EvamEvent.RawRakelActionSent, rawRakelAction);
        androidNativeHelpers(EvamApi.isRunningInVehicleServices).sendRawRakelAction(rawRakelAction);
    };

    /**
     * Opens the app in foreground in Vehicle Services.
     * @category System
     * @requires **Permissions** PUT_APP_IN_FOREGROUND
     * @requires **Version** Vehicle Services version 5.2.2 and above have full functionality. Other versions: function will throw an Error.
     * @requires **Environment** Evam device only
     */
    putAppInForeground = () => {
        androidNativeHelpers(EvamApi.isRunningInVehicleServices).putAppInForeground();
    }

    /**
     * Removes the notification by given id.
     * @category Notifications
     * @param notificationId The notification id
     * @requires **Permissions** SEND_NOTIFICATION
     * @requires **Version** Vehicle Services version 5.2.2 and above have full functionality. Other versions: function will throw an Error.
     * @requires **Environment** Evam device only
     */
    removeNotification = (notificationId: string) => {
        publish(EvamEvent.RemoveNotification, notificationId);
        androidNativeHelpers(EvamApi.isRunningInVehicleServices).removeNotification(notificationId);
    }


    /**
     * Initiates a new call to the given number.
     * @category Telephony
     * @param number the phone number to call
     * @requires **Permissions** TELEPHONY
     * @requires **Version** Vehicle Services version 5.2.4 and above have full functionality. Other versions: function will throw an Error.
     * @requires **Environment** Evam device only
     */
    makeCall = (number: string) => {
        publish(EvamEvent.MakeCall, number);
        androidNativeHelpers(EvamApi.isRunningInVehicleServices).makeCall(number);
    }

    /**
     * Answers a call that matches the given {@link PhoneCall.callId} provided as part of the calls from {@link newOrUpdatedCalls}.
     * @category Telephony
     * @param callId the id of the call to answer.
     * @requires **Permissions** TELEPHONY
     * @requires **Version** Vehicle Services version 5.2.4 and above have full functionality. Other versions: function will throw an Error.
     * @requires **Environment** Evam device only
     */
    answerCall = (callId: string) => {
        publish(EvamEvent.AnswerCall, callId);
        androidNativeHelpers(EvamApi.isRunningInVehicleServices).answerCall(callId);
    }

    /**
     * Hangs up or cancels a call that matches the given {@link PhoneCall.callId} provided as part of the calls from {@link newOrUpdatedCalls}.
     * @category Telephony
     * @param callId the id of the call to be canceled.
     * @requires **Permissions** TELEPHONY
     * @requires **Version** Vehicle Services version 5.2.4 and above have full functionality. Other versions: function will throw an Error.
     * @requires **Environment** Evam device only
     */
    hangUpCall = (callId: string) => {
        publish(EvamEvent.HangUpCall, callId);
        androidNativeHelpers(EvamApi.isRunningInVehicleServices).hangUpCall(callId);
    }

    /**
     * Puts a call on hold that matches the given {@link PhoneCall.callId} provided as part of the calls from {@link newOrUpdatedCalls}.
     * @category Telephony
     * @param callId the id of the call to hold.
     * @requires **Permissions** TELEPHONY
     * @requires **Version** Vehicle Services version 5.2.4 and above have full functionality. Other versions: function will throw an Error.
     * @requires **Environment** Evam device only
     */
    holdCall = (callId: string) => {
        publish(EvamEvent.HoldCall, callId);
        androidNativeHelpers(EvamApi.isRunningInVehicleServices).holdCall(callId);
    }

    /**
     * Resumes a call on hold that matches the given {@link PhoneCall.callId} provided as part of the calls from {@link newOrUpdatedCalls}.
     * @category Telephony
     * @param callId the id of the call to be resumed.
     * @requires **Permissions** TELEPHONY
     * @requires **Version** Vehicle Services version 5.2.4 and above have full functionality. Other versions: function will throw an Error.
     * @requires **Environment** Evam device only
     */
    unholdCall = (callId: string) => {
        publish(EvamEvent.UnholdCall, callId);
        androidNativeHelpers(EvamApi.isRunningInVehicleServices).unholdCall(callId);
    }

    /**
     * Mutes the microphone of the device.
     * @category Telephony
     * @requires **Permissions** TELEPHONY
     * @requires **Version** Vehicle Services version 5.2.4 and above have full functionality. Other versions: function will throw an Error.
     * @requires **Environment** Evam device only
     */
    muteMicrophone = () => {
        publish(EvamEvent.MuteMicrophone, undefined);
        androidNativeHelpers(EvamApi.isRunningInVehicleServices).muteMicrophone();
    }
    
    /**
     * Unmutes the microphone of the device.
     * @category Telephony
     * @requires **Permissions** TELEPHONY
     * @requires **Version** Vehicle Services version 5.2.4 and above have full functionality. Other versions: function will throw an Error.
     * @requires **Environment** Evam device only
     */
    unmuteMicrophone = () => {
        publish(EvamEvent.UnmuteMicrophone, undefined);
        androidNativeHelpers(EvamApi.isRunningInVehicleServices).unmuteMicrophone();
    }
}

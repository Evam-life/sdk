/**
 * Main API
 * @module EvamApi
 */
import * as EventHelpers from "../util/EventHelpers";
import {publish, unsubscribe} from "../util/EventHelpers";
import EvamEvents from "../domain/EvamEvents";
import {Operation} from "../domain/Operation";
import {InternetState} from "../domain/InternetState";
import {VehicleState} from "../domain/VehicleState";
import {TripLocationHistory} from "../domain/TripLocationHistory";


const getIsRunningInVehicleServices = (): boolean => {
    try {
        //@ts-ignore
        const android = Android;
        return (android !== undefined);
    } catch {
        return false;
    }
};


/**
 * @hidden
 */
export class EvamData {
    constructor(
        public activeCase?: Operation | undefined,
        public settings?: object | undefined,
        public internetState?: InternetState | undefined,
        public deviceRole?: DeviceRole | undefined,
        public location?: Location | undefined,
        public vehicleState?: VehicleState | undefined,
        public tripLocationHistory?: TripLocationHistory | undefined
    ) {

    }
}

/**
 * Evam API singleton that exposes methods to interact with the Evam platform.
 *
 * @example
 * ```ts
 * // Get singleton instance
 * const evamApi = EvamApi.getInstance();
 *
 * // Register a new callback on any operation update that simply logs it
 * evamApi.onNewOrUpdatedOperation((activeOperation) => console.log(activeOperation));
 *
 * // Register a new callback on any application settings update that simply logs them
 * evamApi.onNewOrUpdatedSettings((settings) => console.log(settings));
 * ```
 */
export class EvamApi {

    private static evamData: EvamData = new EvamData();
    private static newOrUpdatedOperationCallbacks: Array<(e: Event) => void> = new Array<(e: Event) => void>();
    private static newOrUpdatedSettingsCallbacks: Array<(e: Event) => void> = new Array<(e: Event) => void>();
    private static newOrUpdatedLocationCallbacks: Array<(e: Event) => void> = new Array<(e: Event) => void>();
    private static newOrUpdatedDeviceRoleCallbacks: Array<(e: Event) => void> = new Array<(e: Event) => void>();
    private static newOrUpdatedInternetStateCallbacks: Array<(e: Event) => void> = new Array<(e: Event) => void>();
    private static newOrUpdatedVehicleStateCallbacks: Array<(e: Event) => void> = new Array<(e: Event) => void>();
    private static newOrUpdatedTripLocationHistoryCallbacks: Array<(e: Event) => void> = new Array<(e: Event) => void>();

    /**
     * True if Vehicle Services environment is detected, False otherwise (for instance, a web
     * We have to ignore this because the Android item causes an error.
     */
        //@ts-ignore
    public static readonly isRunningInVehicleServices: boolean = getIsRunningInVehicleServices();

    unsubscribeFromAllCallbacks = () => {
        EvamApi.newOrUpdatedOperationCallbacks.forEach((callback) => {
            //@ts-ignore
            unsubscribe(EvamEvents.NewOrUpdatedOperation, callback);
        });

        EvamApi.newOrUpdatedSettingsCallbacks.forEach((callback) => {
            //@ts-ignore
            unsubscribe(EvamEvents.NewOrUpdatedSettings, callback);
        });

        EvamApi.newOrUpdatedLocationCallbacks.forEach((callback) => {
            //@ts-ignore
            unsubscribe(EvamEvents.NewOrUpdatedLocation, callback);
        });

        EvamApi.newOrUpdatedDeviceRoleCallbacks.forEach((callback) => {
            //@ts-ignore
            unsubscribe(EvamEvents.NewOrUpdatedDeviceRole, callback);
        });

        EvamApi.newOrUpdatedInternetStateCallbacks.forEach((callback) => {
            //@ts-ignore
            unsubscribe(EvamEvents.NewOrUpdatedInternetState, callback);
        });

        EvamApi.newOrUpdatedVehicleStateCallbacks.forEach((callback) => {
            //@ts-ignore
            unsubscribe(EvamEvents.NewOrUpdatedVehicleState, callback);
        });

        EvamApi.newOrUpdatedTripLocationHistoryCallbacks.forEach((callback) => {
            //@ts-ignore
            unsubscribe(EvamEvents.NewOrUpdatedTripLocationHistory, callback);
        });

        EvamApi.newOrUpdatedOperationCallbacks = [];
        EvamApi.newOrUpdatedSettingsCallbacks = [];
        EvamApi.newOrUpdatedLocationCallbacks = [];
        EvamApi.newOrUpdatedDeviceRoleCallbacks = [];
        EvamApi.newOrUpdatedInternetStateCallbacks = [];
        EvamApi.newOrUpdatedVehicleStateCallbacks = [];
        EvamApi.newOrUpdatedTripLocationHistoryCallbacks = [];


    };

    setHospital(id: number) {
        if (!EvamApi.isRunningInVehicleServices) {
            const hl = EvamApi.evamData.activeCase.availableHospitalLocations.find((loc) => {
                return loc.id === id;
            });
            if (hl) {
                const newActiveOperation = Operation.fromJSON({
                    selectedHospital: id,
                    ...EvamApi.evamData.activeCase
                });
                this.injectOperation(newActiveOperation);
            } else {
                throw Error("Hospital id not located within available hospitals");
            }
        } else {
            throw Error("Can not manually inject while running in vehicle services");
        }
    }

    setPrio(prio: string) {
        if (!EvamApi.isRunningInVehicleServices) {
            if (EvamApi.evamData.activeCase === undefined) {
                throw Error("Can't set prio when there is no active case.");
            } else {
                if (EvamApi.evamData.activeCase.availablePriorities.includes(prio)) {
                    const newActiveOperation = Operation.fromJSON({
                        prio,
                        ...EvamApi.evamData.activeCase
                    });
                    this.injectOperation(newActiveOperation);
                } else {
                    throw Error("Cant set prio when prio is not an available prio");
                }
            }
        } else {
            throw Error("");
        }
    }

    injectLocation(location: Location) {
        EvamApi.evamData.location = location;
        if (!EvamApi.isRunningInVehicleServices) {
            publish(EvamEvents.NewOrUpdatedLocation, location);
        } else {
            throw Error("");
        }
    }

    injectVehicleState(vehicleState: VehicleState) {
        EvamApi.evamData.vehicleState = vehicleState;
        if (!EvamApi.isRunningInVehicleServices) {
            publish(EvamEvents.NewOrUpdatedInternetState, vehicleState);
        } else {
            throw Error("");
        }
    }

    injectTrip(tripLocationHistory:TripLocationHistory) {
        EvamApi.evamData.tripLocationHistory = tripLocationHistory;
        if (!EvamApi.isRunningInVehicleServices) {

        } else {
            throw Error("");
        }
    }

    injectDeviceRole(deviceRole: DeviceRole) {
        EvamApi.evamData.deviceRole = deviceRole;
        if (!EvamApi.isRunningInVehicleServices) {
            publish(EvamEvents.NewOrUpdatedDeviceRole, deviceRole);
        } else {
            throw Error("");
        }
    }

    injectInternetState(internetState: InternetState) {
        EvamApi.evamData.internetState = internetState;
        if (!EvamApi.isRunningInVehicleServices) {
            publish(EvamEvents.NewOrUpdatedInternetState, internetState);
        } else {
            throw Error("");
        }
    }


    /**
     * Injects the Active Operation manually. This will trigger onNewOrUpdatedOperation(...)'s callback.
     * This function is to be used for development only and will throw an error when used in Vehicle Services.
     * @param activeCase The active case to be injected for development purposes.
     */
    injectOperation(activeCase: Operation | undefined) {
        EvamApi.evamData.activeCase = activeCase;
        if (!EvamApi.isRunningInVehicleServices) {
            publish(EvamEvents.NewOrUpdatedOperation, activeCase);
        } else {
            throw Error("Injecting an Operation is not allowed in the Vehicle Services environment, use the Vehicle Services Demo tool instead.");
        }
    }

    /**
     * Injects the settings manually. This will trigger onNewOrUpdatedSettings(...)'s callback.
     * This function is to be used for development only and will throw an error when used in Vehicle Services.
     * @param settings The settings to be injected for development purposes.
     */
    injectSettings(settings: object) {
        EvamApi.evamData.settings = settings;

        if (!EvamApi.isRunningInVehicleServices) {
            //EvamApi.proxy.settings = settings
            publish(EvamEvents.NewOrUpdatedSettings, settings);
        } else {
            throw Error("Injecting settings is not allowed in the Vehicle Services environment, use a web browser instead.");
        }
    }

    /**
     * Registers a callback to be run upon a new Active Operation is available or the current Active
     * Operation is updated.
     * @param callback The callback to be executed
     */
    onNewOrUpdatedOperation(callback: (activeOperation: Operation | undefined) => void) {
        if (callback) {
            const c = (e: Event) => {
                callback((<CustomEvent>e).detail as Operation);
            };
            EvamApi.newOrUpdatedOperationCallbacks.push(c);
            EventHelpers.subscribe(EvamEvents.NewOrUpdatedOperation, c);
        }
    }

    /**
     * Registers a callback to be run upon new application settings reception or settings update
     * @param callback The callback to be executed
     *
     */
    onNewOrUpdatedSettings(callback: (settings: object | undefined) => void) {
        if (callback) {
            const c = (e: Event) => {
                callback((<CustomEvent>e).detail as object);
            };
            EvamApi.newOrUpdatedSettingsCallbacks.push(c);
            EventHelpers.subscribe(EvamEvents.NewOrUpdatedSettings, c);
        }
    }

    onNewOrUpdatedDeviceRole(callback: (deviceRole: DeviceRole | undefined) => void) {
        if (callback) {
            const c = (e: Event) => {
                callback((<CustomEvent>e).detail as DeviceRole);
            };
            EvamApi.newOrUpdatedDeviceRoleCallbacks.push(c);
            EventHelpers.subscribe(EvamEvents.NewOrUpdatedDeviceRole, (e) => {
                callback((<CustomEvent>e).detail);
            });
        }
    }

    onNewOrUpdatedLocation(callback: (location: Location | undefined) => void) {
        if (callback) {
            const c = (e: Event) => {
                callback((<CustomEvent>e).detail as Location);
            };
            EvamApi.newOrUpdatedLocationCallbacks.push(c);
            EventHelpers.subscribe(EvamEvents.NewOrUpdatedLocation, (e) => {
                callback((<CustomEvent>e).detail);
            });
        }
    }

    onNewOrUpdatedInternetState(callback: (internetState: InternetState | undefined) => void) {
        if (callback) {
            const c = (e: Event) => {
                callback((<CustomEvent>e).detail as InternetState);
            };
            EvamApi.newOrUpdatedInternetStateCallbacks.push(c);
            EventHelpers.subscribe(EvamEvents.NewOrUpdatedInternetState, (e) => {
                callback((<CustomEvent>e).detail);
            });
        }
    }

    onNewOrUpdatedVehicleState(callback: (vehicleState: VehicleState | undefined) => void) {
        if (callback) {
            const c = (e: Event) => {
                callback((<CustomEvent>e).detail as VehicleState);
            };
            EvamApi.newOrUpdatedVehicleStateCallbacks.push(c);
            EventHelpers.subscribe(EvamEvents.NewOrUpdatedVehicleState, (e) => {
                callback((<CustomEvent>e).detail);
            });
        }
    }

    onNewOrUpdatedTripLocationHistory(callback: (tripLocationHistory: TripLocationHistory | undefined) => void) {
        if (callback) {
            const c = (e: Event) => {
                callback((<CustomEvent>e).detail as TripLocationHistory);
            };
            EvamApi.newOrUpdatedTripLocationHistoryCallbacks.push(c);
            EventHelpers.subscribe(EvamEvents.NewOrUpdatedTripLocationHistory, (e) => {
                callback((<CustomEvent>e).detail);
            });
        }
    }

}





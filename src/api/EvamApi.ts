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
import {Location} from "../domain/Location";
import _ from "lodash";
import {DeviceRole} from "../domain/DeviceRole";


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


    /**
     * EvamData instance for storing data regard Vehcile Services.
     * @private
     */
    private static evamData: EvamData = new EvamData();

    /**
     * These arrays store references to every callback subscribed to certain events. We use these references to later unsubscribe from DOM events.
     * @hidden
     */
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

    /**
     * Sets the selected hospital id for the current active operation. The id must be present inside the available hospitals
     * @param id the id of the hospital to be set
     */
    setHospital(id: number) {
        if (!EvamApi.isRunningInVehicleServices) {
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
            } else {
                throw Error("Hospital id not located within available hospitals");
            }
        } else {
            throw Error("Can not manually inject while running in vehicle services");
        }
    }

    /**
     * Sets the selected priority id for the current active operation. The id must be present inside the available priorities.
     * @param id of the prio to be set
     */
    setPrio(id: number) {
        if (!EvamApi.isRunningInVehicleServices) {
            if (EvamApi.evamData.activeCase === undefined) {
                throw Error("Can't set prio when there is no active case.");
            } else {
                const p = EvamApi.evamData.activeCase.availablePriorities.find((p) => {
                    return p.id === id;
                });
                if (p) {
                    const newActiveOperation = _.clone(EvamApi.evamData.activeCase);
                    newActiveOperation.selectedPriority = p.id;
                    this.injectOperation(newActiveOperation);
                } else {
                    throw Error("Cant set prio when prio is not an available prio");
                }
            }
        } else {
            throw Error("Setting a prio is not allowed in the Vehicle Services environment.");
        }
    }

    /**
     * Manually inject location to EvamApi (Only available in development.)
     * @param location the location to inject.
     */
    injectLocation(location: Location) {
        EvamApi.evamData.location = location;
        if (!EvamApi.isRunningInVehicleServices) {
            publish(EvamEvents.NewOrUpdatedLocation, location);
        } else {
            throw Error("Injecting an Location is not allowed in the Vehicle Services environment.");
        }
    }

    /**
     * Manually inject vehicleState to EvamApi (Only available in development.)
     * @param vehicleState the vehicleState to inject.
     */
    injectVehicleState(vehicleState: VehicleState) {
        EvamApi.evamData.vehicleState = vehicleState;
        if (!EvamApi.isRunningInVehicleServices) {
            publish(EvamEvents.NewOrUpdatedVehicleState, vehicleState);
        } else {
            throw Error("Injecting an VehicleState is not allowed in the Vehicle Services environment.");
        }
    }

    /**
     * Manually inject tripLocationHistory to EvamApi (Only available in development.)
     * @param tripLocationHistory the tripLocationHistory to inject.
     */
    injectTrip(tripLocationHistory: TripLocationHistory) {
        EvamApi.evamData.tripLocationHistory = tripLocationHistory;
        if (!EvamApi.isRunningInVehicleServices) {
            publish(EvamEvents.NewOrUpdatedTripLocationHistory, tripLocationHistory);
        } else {
            throw Error("Injecting an TripLocationHistory is not allowed in the Vehicle Services environment.");
        }
    }

    /**
     * Manually inject deviceRole to EvamApi (Only available in development.)
     * @param deviceRole the deviceRole to inject.
     */
    injectDeviceRole(deviceRole: DeviceRole) {
        EvamApi.evamData.deviceRole = deviceRole;
        if (!EvamApi.isRunningInVehicleServices) {
            publish(EvamEvents.NewOrUpdatedDeviceRole, deviceRole);
        } else {
            throw Error("Injecting an DeviceRole is not allowed in the Vehicle Services environment.");
        }
    }

    /**
     * Manually inject internetState to EvamApi (Only available in development.)
     * @param internetState the internetState to inject.
     */
    injectInternetState(internetState: InternetState) {
        EvamApi.evamData.internetState = internetState;
        if (!EvamApi.isRunningInVehicleServices) {
            publish(EvamEvents.NewOrUpdatedInternetState, internetState);
        } else {
            throw Error("Injecting an internetState is not allowed in the Vehicle Services environment.");
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
     * @param callback The callback to be executed.
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

    /**
     * Registers a callback to be run upon new device role or device role update
     * @param callback The callback to be executed.
     */
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

    /**
     * Registers a callback to be run upon new location or location update
     * @param callback The callback to be executed.
     */
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

    /**
     * Registers a callback to be run upon new internetState or internetState update
     * @param callback The callback to be executed.
     */
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

    /**
     * Used to assign a callback when the vehicle state is created or updated.
     * @param callback The callback with (optional) argument vehicleState. Use this to access the vehicle state.
     */
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





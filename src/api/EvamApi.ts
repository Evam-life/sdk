/**
 * Main API
 * @module EvamApi
 */
import * as EventHelpers from "../util/EventHelpers";
import {publish} from "../../sdk/api/EventHelpers";
import EvamEvents from "../types/EvamEvents";
import {Operation} from "../classes/Operation";
import {InternetState} from "../types/InternetState";

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

    private evamData: EvamData;

    private handleNewOrUpdatedOperation: ((operation: Operation | undefined) => void) | undefined;
    private handleNewOrUpdatedSettings: ((settings: Object | undefined) => void) | undefined;
    private handleNewOrUpdatedLocation: ((location: Location | undefined) => void) | undefined;
    private handleNewOrUpdatedDeviceRole: ((deviceRole: DeviceRole | undefined) => void) | undefined;
    private handleNewOrUpdatedInternetState: ((internetState: InternetState | undefined) => void) | undefined;

    constructor() {
        this.evamData = new EvamData();
        this.handleNewOrUpdatedOperation = undefined;
        this.handleNewOrUpdatedSettings = undefined;
        this.handleNewOrUpdatedLocation = undefined;
        this.handleNewOrUpdatedDeviceRole = undefined;
        this.handleNewOrUpdatedInternetState = undefined;
    }


    /**
     * True if Vehicle Services environment is detected, False otherwise (for instance, a web browser)
     */
    isRunningInVehicleServices = () => {
        try {
            // @ts-ignore
            let android = Android;
            return (android != undefined);
        } catch {
            return false;
        }
    };

    setHospital(id: number) {
        if (!this.isRunningInVehicleServices()) {
            const hl = this.evamData.activeCase.availableHospitalLocations.find((loc) => {
                return loc.id === id;
            });
            if (hl) {
                const newActiveOperation = Operation.fromJSON({
                    selectedHospital: id,
                    ...this.evamData.activeCase
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
        if (!this.isRunningInVehicleServices()) {
            if (this.evamData.activeCase === undefined) {
                throw Error("Can't set prio when there is no active case.");
            } else {
                if (this.evamData.activeCase.availablePriorities.includes(prio)) {
                    const newActiveOperation = Operation.fromJSON({
                        prio,
                        ...this.evamData.activeCase
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

    injectLocation() {
        if (!this.isRunningInVehicleServices()) {

        } else {
            throw Error("");
        }
    }

    injectVehicleState() {
        if (!this.isRunningInVehicleServices()) {
            if (this.evamData.activeCase === undefined) {
            } else {
            }
        } else {
            throw Error("");
        }
    }

    injectTrip() {
        if (!this.isRunningInVehicleServices()) {

        } else {
            throw Error("");
        }
    }

    injectDeviceRole(deviceRole: DeviceRole) {
        if (!this.isRunningInVehicleServices()) {
            this.evamData.deviceRole = deviceRole;
        } else {
            throw Error("");
        }
    }

    injectInternetState(internetState: InternetState) {
        if (!this.isRunningInVehicleServices()) {
            this.evamData.internetState = internetState;
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
        this.evamData.activeCase = activeCase;
        if (!this.isRunningInVehicleServices()) {
            //this.proxy.activeCase = activeCase
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
    injectSettings(settings: Object) {
        this.evamData.settings = settings;

        if (!this.isRunningInVehicleServices()) {
            //this.proxy.settings = settings
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
        if (this.handleNewOrUpdatedOperation) {
            // @ts-ignore
            EventHelpers.unsubscribe(EvamEvents.NewOrUpdatedOperation, this.handleNewOrUpdatedOperation);
        }
        this.handleNewOrUpdatedOperation = callback;
        EventHelpers.subscribe(EvamEvents.NewOrUpdatedOperation, (e) => {
            this.handleNewOrUpdatedOperation((<CustomEvent>e).detail as Operation);
        });
    }

    /**
     * Registers a callback to be run upon new application settings reception or settings update
     * @param callback The callback to be executed
     *
     */
    onNewOrUpdatedSettings(callback: (settings: Object | undefined) => void) {
        if (this.handleNewOrUpdatedSettings) {
            EventHelpers.unsubscribe(EvamEvents.NewOrUpdatedSettings, this.handleNewOrUpdatedSettings);
        }
        this.handleNewOrUpdatedSettings = callback;
        EventHelpers.subscribe(EvamEvents.NewOrUpdatedSettings, (e) => {
            this.handleNewOrUpdatedSettings((<CustomEvent>e).detail);
        });
    }

    onNewOrUpdatedDeviceRole(callback: (deviceRole: DeviceRole | undefined) => void) {
        if (this.handleNewOrUpdatedDeviceRole) {
            // @ts-ignore
            EventHelpers.unsubscribe(EvamEvents.NewOrUpdatedDeviceRole, this.handleNewOrUpdatedDeviceRole);
        }
        this.handleNewOrUpdatedDeviceRole = callback;
        EventHelpers.subscribe(EvamEvents.NewOrUpdatedDeviceRole, (e) => {
            this.handleNewOrUpdatedSettings((<CustomEvent>e).detail);
        });
    }

    onNewOrUpdatedLocation(callback: (location: Location | undefined) => void) {
        if (this.handleNewOrUpdatedLocation) {
            //@ts-ignore
            EventHelpers.unsubscribe(EvamEvents.NewOrUpdatedDeviceRole, this.handleNewOrUpdatedLocation);
        }
        this.handleNewOrUpdatedLocation = callback;
        EventHelpers.subscribe(EvamEvents.NewOrUpdatedLocation, (e) => {
            this.handleNewOrUpdatedLocation((<CustomEvent>e).detail);
        });
    }

    onNewOrUpdatedInternetState(callback: (internetState: InternetState | undefined) => void) {
        if (this.handleNewOrUpdatedLocation) {
            //@ts-ignore
            EventHelpers.unsubscribe(EvamEvents.NewOrUpdatedLocation, this.handleNewOrUpdatedInternetState);
        }
        this.handleNewOrUpdatedInternetState = callback;
        EventHelpers.subscribe(EvamEvents.NewOrUpdatedInternetState, (e) => {
            this.handleNewOrUpdatedInternetState((<CustomEvent>e).detail);
        });
    }

}

/**
 * @hidden
 */
export class EvamData {
    constructor(
        public activeCase?: Operation | undefined,
        public settings?: Object | undefined,
        public internetState?: InternetState | undefined,
        public deviceRole?: DeviceRole | undefined,
        public location?: Location | undefined
    ) {

    }
}





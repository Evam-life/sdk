/**
 * Main API
 * @module EvamApi
 */
import { timer } from 'rxjs';
import { Observables, observe } from 'rxjs-observe';

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
    /** @hidden */
    evamData: EvamData

    /** @hidden */
    observables: Observables<EvamData, object>

    /** @hidden */
    proxy: EvamData & object

    /**
     * True if Vehicle Services environment is detected, False otherwise (for instance, a web browser)
     */
    readonly isRunningInVehicleServices: Boolean

    // Singleton instance
    /** @hidden */
    private static instance: EvamApi

    /**
     * Gets the Evam API singleton instance
     * @returns The Evam API instance
     */
    public static getInstance(): EvamApi {
        if (!EvamApi.instance) {
            let evamData = new EvamData(undefined, undefined)
            const { observables, proxy } = observe(evamData)

            let android = undefined
            try {
                // @ts-ignore
                android = Android
            } catch (e){
                console.log("Running in development mode outside of Vehicle Services")
            }

            EvamApi.instance = new EvamApi(
                evamData, observables, proxy, android
            )
        }
        return EvamApi.instance
    }

    /**
     * Constructor, private because singleton
     * @hidden
     */
    protected constructor(evamData: EvamData,
                        observables: Observables<EvamData&object>,
                        proxy: EvamData&object, android: any) {
        this.evamData = evamData
        this.observables = observables
        this.proxy = proxy

        let previousCaseCache: Object = {}
        let previousSettingsCache: Object = {}

        this.isRunningInVehicleServices = (android != undefined)

        if (this.isRunningInVehicleServices) {
            const source = timer(1000, 2000)
            source.subscribe(
                (time) => {
                    // @ts-ignore
                    let rawCase = Android.operationGetActiveCase()
                    // @ts-ignore
                    let rawSettings = Android.webAppGetSettings()

                    let activeCase = JSON.parse(rawCase)
                    let settings = JSON.parse(rawSettings)
                    if (previousCaseCache === rawCase) {
                        // Do nothing
                    } else {
                        previousCaseCache = rawCase
                        let upCase = ActiveCase.fromJson(activeCase)
                        proxy.activeCase = upCase
                        console.log("Running thread to get case! " + JSON.stringify(ActiveCase.fromJson(activeCase)))
                    }
                    if (previousSettingsCache === settings){
                        // Do nothing
                    } else {
                        let out: any = {}
                        for (let setting of settings){
                            let value = setting.value["value"] ? setting.value["value"] : setting.value.default
                            out[setting.id] = value
                        }
                        previousSettingsCache = out
                        proxy.settings = out
                    }
                }
            )
        }
    }

    /**
     * Injects the Active Operation manually. This will trigger onNewOrUpdatedOperation(...)'s callback.
     * This function is to be used for development only and will throw an error when used in Vehicle Services.  
     * @param activeCase The active case to be injected for development purposes.
     */
    injectOperation(activeCase: ActiveCase|undefined) {
        if (!this.isRunningInVehicleServices) {
            this.proxy.activeCase = activeCase
        } else {
            throw Error("Injecting an Operation is not allowed in the Vehicle Services environment, use the Vehicle Services Demo tool instead.")
        }
    }

    /**
     * Injects the settings manually. This will trigger onNewOrUpdatedSettings(...)'s callback.
     * This function is to be used for development only and will throw an error when used in Vehicle Services.  
     * @param settings The settings to be injected for development purposes.
     */
    injectSettings(settings: Object) {
        if (!this.isRunningInVehicleServices) {
            this.proxy.settings = settings
        } else {
            throw Error("Injecting settings is not allowed in the Vehicle Services environment, use a web browser instead.")
        }
    }

    /**
     * Registers a callback to be run upon a new Active Operation is available or the current Active
     * Operation is updated.
     * @param callback The callback to be executed
     */
    onNewOrUpdatedOperation(callback: (activeCase: ActiveCase | undefined) => void) {
        this.observables.activeCase.subscribe((c) => callback(c as ActiveCase))
    }

    /**
     * Registers a callback to be run upon new application settings reception or settings update
     * @param callback The callback to be executed
     *
     */
    onNewOrUpdatedSettings(callback: (settings: Object | undefined) => void) {
        this.observables.settings.subscribe((c) => callback(c))
    }
}

/**
 * @hidden
 */
export class EvamData {
    activeCase: ActiveCase | undefined
    settings: Object | undefined

    constructor(
        activeCase: ActiveCase | undefined,
        settings: Object | undefined
    ) {
        this.activeCase = activeCase
        this.settings = settings
    }
}


/* istanbul ignore next */
export class ActiveCase {
    /**
     *
     * @param operationID The operation ID
     * @param name The operation name
     * @param sendTime The time at which the operation was sent
     * @param createdTime The time at which the operation was created
     * @param endTime The time at which the operation ended, `undefined` still ongoing
     * @param callCenterId The Call Center ID
     * @param caseFolderId The Case folder ID
     * @param transmitterCode The transmitter code
     * @param alarmCategory The alarm category
     * @param alarmEventCode The alarm event code
     * @param medicalCommander The medical commander of this operation
     * @param medicalIncidentOfficer The medical incident office of this operation
     * @param attachedCustomerObject The attached customer Object
     * @param alarmEventText The alarm event text
     * @param additionalInfo The additional information attached to this operation
     * @param keyNumber The key number
     * @param electronicKey The electronic key
     * @param radioGroupMain The main radio group associated with this operation
     * @param radioGroupSecondary The secondary radio group associated with this operation
     * @param additionalCoordinationInformation Additional coordination information
     * @param prio The priority of this operation
     * @param patientName The name of the patient if any
     * @param patientUID The personal number of the patient if any
     * @param vehicleStatus The current vehicle status in this operation
     * @param siteLocation The location of the destination site
     * @param breakpointLocation The location of the breakpoint if any
     * @param header1 The case index 2
     * @param header2 The case index 3
     * @param eventInfo The event description
     * @param caseInfo The case info comment
     */
    constructor(
        // Metadata
        public operationID: String,
        public name: String,
        public sendTime: Date,
        public createdTime: Date | undefined,
        public endTime: Date | undefined,

        // Rakel
        public callCenterId: String | undefined,
        public caseFolderId: String | undefined,
        // Misc
        public transmitterCode: String | undefined,
        public alarmCategory: String | undefined,
        public alarmEventCode: String | undefined,
        public medicalCommander: String | undefined, // incidentCommander
        public medicalIncidentOfficer: String | undefined,

        public attachedCustomerObject: String | undefined,
        public alarmEventText: String | undefined,
        public additionalInfo: String | undefined,
        public keyNumber: String | undefined,
        public electronicKey: String | undefined,

        // Radio groups
        public radioGroupMain: String | undefined,
        public radioGroupSecondary: String | undefined,

        // Extra
        public additionalCoordinationInformation: String | undefined,

        // PRIO
        public prio: String | undefined,

        // Patient
        public patientName: String | undefined,
        public patientUID: String | undefined,

        // status, destinations
        public vehicleStatus: VehicleStatus | undefined,
        public siteLocation: DestinationSiteLocation | undefined,
        public breakpointLocation: DestinationControlPointLocation | undefined,

        // Case index 2, 3, event description, comment
        public header1: String | undefined,
        public header2: String | undefined,
        public eventInfo: String | undefined,
        public caseInfo: String | undefined
    ) { }

    /**
     * Gets the full operation ID, e.g. '1:18:6546', composed by 'callCenterId:caseFolderId:operationID'.
     * @returns The full operation ID
     */
    getFullId(){
        return `${this.callCenterId}:${this.caseFolderId}:${this.operationID}`
    }

    /**
     * Creates a new operation from JSON object
     * @param op The JSON object
     */
    static fromJson(op: any): ActiveCase | undefined {
        if (!op) return undefined

        return new ActiveCase(
            op.operationID,
            op.name,
            new Date(parseInt(op.sendTime) * 1000),
            new Date(parseInt(op.createdTime) * 1000),
            op.endTime ? new Date(parseInt(op.endTime) * 1000) : undefined,
            op.callCenterId,
            op.caseFolderId,
            op.transmitterCode,
            op.alarmCategory,
            op.alarmEventCode,
            op.medicalCommander,
            op.medicalIncidentOfficer,
            op.attachedCustomerObject,
            op.alarmEventText,
            op.additionalInfo,
            op.keyNumber,
            op.electronicKey,
            op.radioGroupMain,
            op.radioGroupSecondary,
            op.additionalCoordinationInformation,
            op.prio,
            op.patientName,
            op.patientUID,
            op.vehicleStatus ? VehicleStatus.fromJson(op.vehicleStatus) : undefined,
            op.destinationSiteLocation ? DestinationSiteLocation.fromJson(op.destinationSiteLocation) : undefined,
            op.destinationControlPointLocation ? DestinationControlPointLocation.fromJson(op.destinationControlPointLocation) : undefined,
            op.header1,
            op.header2,
            op.eventInfo,
            op.caseInfo
        )
    }
}

/* istanbul ignore next */
export class VehicleStatus {
    /**
     * Vehicle status
     * @param name The name of the vehicle status
     * @param event The event associated to this status, if any
     * @param successorName The name of a typical successor to this status based on vehicle configuration
     * @param isStartStatus true if this status is engaged at the start of a new operation
     * @param isEndStatus true of this status closes the current operation
     * @param categoryType Type of status: 'mission' or 'other'
     * @param categoryName The name of the category as defined by the vehicle user
     */
    constructor(
        public name: String,
        public event: String | undefined,
        public successorName: String | undefined,
        public isStartStatus: Boolean,
        public isEndStatus: Boolean,
        public categoryType: String,
        public categoryName: String
    ) { }

    /**
     * Creates from JSON
     * @param status JSON object
     */
    static fromJson(status: any): VehicleStatus {
        return new VehicleStatus(
            status.name,
            status.event,
            status.successorName,
            status.isStartStatus,
            status.isEndStatus,
            status.categoryType,
            status.categoryName
        )
    }
}

/* istanbul ignore next */
export class DestinationSiteLocation {
    /**
     * Location of a destination site
     * @param latitude Latitude in decimal degrees
     * @param longitude Longitude in decimal degrees
     * @param street The street name if available
     * @param locality The locality name if available
     * @param municipality The municipality name if available
     * @param routeDirections The route directions text if available
     * @param pickupTime The pickup time text if available
     */
    constructor(
        public latitude: Number,
        public longitude: Number,
        public street: String | undefined,
        public locality: String | undefined,
        public municipality: String | undefined,
        public routeDirections: String | undefined,
        public pickupTime: String | undefined
    ) { }

    /**
     * Create from JSON
     * @param loc JSON object
     */
    static fromJson(loc: any): DestinationSiteLocation {
        return new DestinationSiteLocation(
            loc.latitude,
            loc.longitude,
            loc.street,
            loc.locality,
            loc.municipality,
            loc.routeDirections,
            loc.pickupTime
        )
    }
}

/* istanbul ignore next */
export class DestinationControlPointLocation {
    /**
     * Location of a breakpoint
     * @param latitude Latitude in decimal degrees
     * @param longitude Longitude in decimal degrees
     * @param name Breakpoint name if available
     * @param additionalInfo Additional information if available
     */
    constructor(
        public latitude: Number,
        public longitude: Number,
        public name: String | undefined,
        public additionalInfo: String | undefined
    ) { }

    /**
     * Create from JSON
     * @param loc JSON object
     */
    static fromJson(loc: any): DestinationControlPointLocation {
        return new DestinationControlPointLocation(
            loc.latitude,
            loc.longitude,
            loc.name,
            loc.additionalInfo
        )
    }
}
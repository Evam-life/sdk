import { timer } from 'rxjs';
import { Observables, observe } from 'rxjs-observe';

export class EvamApi {
    evamData: EvamData
    observables: Observables<EvamData, object>
    proxy: EvamData & object

    /**
     * True if Vehicle Services environment is detected, False otherwise (for instance, a web browser)
     */
    readonly isRunningInVehicleServices: Boolean

    // Singleton instance
    private static instance: EvamApi

    /**
     * Gets the EvamLib instance
     * @returns The EvamLib instance
     */
    public static getInstance(): EvamApi {
        if (!EvamApi.instance) {
            EvamApi.instance = new EvamApi()
        }
        return EvamApi.instance
    }

    /**
     * Constructor, private because singleton
     */
    private constructor() {
        this.evamData = new EvamData(undefined, undefined)
        const { observables, proxy } = observe(this.evamData)
        this.observables = observables
        this.proxy = proxy

        let previousCaseCache: Object = {}
        let previousSettingsCache: Object = {}

        try {
            // @ts-ignore
            let and = Android
            this.isRunningInVehicleServices = true
        } catch (e) {
            console.log("Running in development mode outside of Vehicle Services")
            this.isRunningInVehicleServices = false
        }

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

    onNewOrUpdatedSettings(callback: (settings: Object | undefined) => void) {
        this.observables.settings.subscribe((c) => callback(c))
    }
}

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

export class ActiveCase {
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
     * Gets the full operation ID, e.g. '1:18:6546'
     * @returns The full operation ID
     */
    getFullId(){
        return `${this.callCenterId}:${this.caseFolderId}:${this.operationID}`
    }

    static fromJson(op: any): ActiveCase | undefined {
        if (!op) return undefined

        console.log(`Using op=${JSON.stringify(op)}`)
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

export class VehicleStatus {
    constructor(
        public name: String,
        public event: String | undefined,
        public successorName: String | undefined,
        public isStartStatus: Boolean,
        public isEndStatus: Boolean,
        public categoryType: String,
        public categoryName: String
    ) { }

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

export class DestinationSiteLocation {
    constructor(
        public latitude: Number,
        public longitude: Number,
        public street: String | undefined,
        public locality: String | undefined,
        public municipality: String | undefined,
        public routeDirections: String | undefined,
        public pickupTime: String | undefined
    ) { }

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

export class DestinationControlPointLocation {
    constructor(
        public latitude: Number,
        public longitude: Number,
        public name: String | undefined,
        public additionalInfo: String | undefined
    ) { }

    static fromJson(loc: any): DestinationControlPointLocation {
        return new DestinationControlPointLocation(
            loc.latitude,
            loc.longitude,
            loc.name,
            loc.additionalInfo
        )
    }
}
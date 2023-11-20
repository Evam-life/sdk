import {VehicleStatus} from "./VehicleStatus";
import {DestinationSiteLocation} from "./DestinationSiteLocation";
import {DestinationControlPointLocation} from "./DestinationControlPointLocation";
import {HospitalLocation} from "./HospitalLocation";
import {OperationPriority} from "./OperationPriority";
import {OperationState} from "./OperationState";
import {LeavePatientLocation} from "./LeavePatientLocation";

class Operation {

    /**
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
     * @param availablePriorities The list of available priorities to select from
     * @param patientName The name of the patient if any
     * @param patientUID The personal number of the patient if any
     * @param vehicleStatus The current vehicle status in this operation
     * @param destinationSiteLocation The location of the destination
     * @param breakpointLocation The location of the breakpoint if any
     * @param availableHospitalLocations The list of available hospitals to select from
     * @param header1 The case index 2
     * @param header2 The case index 3
     * @param eventInfo The event description
     * @param caseInfo The case info comment
     * @param selectedHospital The id of the selected hospital [inside available hospitals]
     * @param selectedPriority The id of the selected priority [inside available priority]
     * @param operationState the current state of the operation (ACTIVE, AVAILABLE, COMPLETE)
     */
    constructor(
        // Metadata
        public operationID: string,
        public name: string,
        public sendTime: Date | undefined,
        public createdTime: Date | undefined,
        public endTime: Date | undefined,
        // Rakel
        public callCenterId: string | undefined,
        public caseFolderId: string | undefined,
        // Misc
        public transmitterCode: string | undefined,
        public alarmCategory: string | undefined,
        public alarmEventCode: string | undefined,
        public medicalCommander: string | undefined, // incidentCommander
        public medicalIncidentOfficer: string | undefined,
        public attachedCustomerObject: string | undefined,
        public alarmEventText: string | undefined,
        public additionalInfo: string | undefined,
        public keyNumber: string | undefined,
        public electronicKey: string | undefined,
        // Radio groups
        public radioGroupMain: string | undefined,
        public radioGroupSecondary: string | undefined,
        // Extra
        public additionalCoordinationInformation: string | undefined,
        // Priority
        public availablePriorities: Array<OperationPriority> | undefined,
        // Patient
        public patientName: string | undefined,
        public patientUID: string | undefined,
        // status, destinations
        public vehicleStatus: VehicleStatus | undefined,
        public destinationSiteLocation: DestinationSiteLocation | undefined,
        public breakpointLocation: DestinationControlPointLocation | undefined,
        public availableHospitalLocations: Array<HospitalLocation> | undefined,
        // Case index 2, 3, event description, comment
        public header1: string | undefined,
        public header2: string | undefined,
        public eventInfo: string | undefined,
        public caseInfo: string | undefined,
        public selectedHospital: number | undefined,
        public selectedPriority: number | undefined,
        public operationState: OperationState,
        public leavePatientLocation: LeavePatientLocation | undefined
    ) {
    }

    /**
     * Gets the full operation ID, e.g. '1:18:6546', composed by 'callCenterId:caseFolderId:operationID'.
     * @returns id The full operation ID
     */
    getFullId() {
        return `${this.callCenterId}:${this.caseFolderId}:${this.operationID}`;
    }

    /**
     * Create from JSON
     * @param data JSON object
     */
    static fromJSON(data: any) {
        if (data.operationID === undefined || data.name === undefined || data.operationState === undefined) {
            throw Error("Operation Id, Operation Name and Operation State must be specified for Operation");
        }
        return new Operation(
            data.operationID,
            data.name,
            data.sendTime !== undefined ? new Date(data.sendTime) : undefined,
            data.createdTime !== undefined ? new Date(data.createdTime) : undefined,
            data.endTime !== undefined ? new Date(data.endTime) : undefined,
            data.callCenterId,
            data.caseFolderId,
            data.transmitterCode,
            data.alarmCategory,
            data.alarmEventCode,
            data.medicalCommander,
            data.medicalIncidentOfficer,
            data.attachedCustomerObject,
            data.alarmEventText,
            data.additionalInfo,
            data.keyNumber,
            data.electronicKey,
            data.radioGroupMain,
            data.radioGroupSecondary,
            data.additionalCoordinationInformation,
            (data.availablePriorities !== undefined && Array.isArray(data.availablePriorities)) ? data.availablePriorities.map((ap: object) => (OperationPriority.fromJSON(ap))) : undefined,
            data.patientName,
            data.patientUID,
            data.vehicleStatus !== undefined ? VehicleStatus.fromJSON(data.vehicleStatus) : undefined,
            data.destinationSiteLocation !== undefined ? DestinationSiteLocation.fromJSON(data.destinationSiteLocation) : undefined,
            data.destinationControlPointLocation !== undefined ? DestinationControlPointLocation.fromJSON(data.destinationControlPointLocation) : undefined,
            (data.availableHospitalLocations !== undefined && Array.isArray(data.availableHospitalLocations)) ? data.availableHospitalLocations.map((hl: object) => HospitalLocation.fromJSON(hl)) : undefined,
            data.header1,
            data.header2,
            data.eventInfo,
            data.caseInfo,
            (data.selectedHospital !== undefined && Array.isArray(data.availableHospitalLocations)) ? data.availableHospitalLocations.find((ahl: any) => {
                return (ahl === data.selectedHospital);
            }) : undefined,
            (data.selectedPriority !== undefined && Array.isArray(data.availablePriorities)) ? data.availablePriorities.find((priority: any) => {
                return (priority.id === data.selectedPriority);
            }) : undefined,
            data.operationState,
            data.leavePatientLocation !== undefined ? LeavePatientLocation.fromJSON(data.leavePatientLocation) : undefined);
    }

}

export {Operation};
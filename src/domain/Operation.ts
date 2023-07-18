import {VehicleStatus} from "./VehicleStatus";
import {DestinationSiteLocation} from "./DestinationSiteLocation";
import {DestinationControlPointLocation} from "./DestinationControlPointLocation";
import {HospitalLocation} from "./HospitalLocation";
import {OperationPriority} from "./OperationPriority";

class Operation {
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
        // PRIO
        public availablePriorities: Array<string> | undefined,
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
    ) {
    }

    static fromJSON(data: any) {
        if(data.operationID === undefined || data.name === undefined){
            throw Error('Operation Id and Operation Name must be specified for Operation')
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
            data.availablePriorities,
            data.patientName,
            data.patientUID,
            data.vehicleStatus !== undefined ? VehicleStatus.fromJSON(data.vehicleStatus) : undefined,
            data.destinationSiteLocation !== undefined ? DestinationSiteLocation.fromJSON(data.destinationSiteLocation) : undefined,
            data.destinationControlPointLocation !== undefined ? DestinationControlPointLocation.fromJSON(data.destinationControlPointLocation) : undefined,
            data.availableHospitalLocations !== undefined ? data.map((hl: HospitalLocation) => HospitalLocation.fromJSON(hl)) : undefined,
            data.header1,
            data.header2,
            data.eventInfo,
            data.caseInfo,
            data.selectedHospital,
            (data.selectedPriority !== undefined && data.availablePriorities !== undefined) ? data.availablePriorities.find((prio: OperationPriority) => {
                return(prio.id === data.selectedPriority)
            }) : undefined);
    }

}

export {Operation};
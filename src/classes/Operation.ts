import {VehicleStatus} from "./VehicleStatus";
import {DestinationSiteLocation} from "./DestinationSiteLocation";
import {DestinationControlPointLocation} from "./DestinationControlPointLocation";
import {HospitalLocation} from "./HospitalLocation";

class Operation {
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
        public availablePriorities: Array<string> | undefined,
        // Patient
        public patientName: String | undefined,
        public patientUID: String | undefined,
        // status, destinations
        public vehicleStatus: VehicleStatus | undefined,
        public siteLocation: DestinationSiteLocation | undefined,
        public breakpointLocation: DestinationControlPointLocation | undefined,
        public availableHospitalLocations: Array<HospitalLocation> | undefined,
        // Case index 2, 3, event description, comment
        public header1: String | undefined,
        public header2: String | undefined,
        public eventInfo: String | undefined,
        public caseInfo: String | undefined,
        public selectedHospital: number | undefined,
        public selectedPriority: number | undefined,
    ) {
    }

    static fromJSON(data: any) {
        return new Operation(
            data.operationID,
            data.name,
            new Date(data.sendTime),
            new Date(data.createdTime),
            new Date(data.endTime),
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
            data.prio,
            data.patientName,
            data.patientUID,
            data.vehicleStatus ? VehicleStatus.fromJSON(data.vehicleStatus) : undefined,
            data.destinationSiteLocation ? DestinationSiteLocation.fromJSON(data.destinationSiteLocation) : undefined,
            data.destinationControlPointLocation ? DestinationControlPointLocation.fromJSON(data.destinationControlPointLocation) : undefined,
            data.availableHospitalLocations ? data.map((hl: HospitalLocation) => HospitalLocation.fromJSON(hl)) : undefined,
            data.header1,
            data.header2,
            data.eventInfo,
            data.caseInfo,
            data.selectedHospital,
            data.selectedPriority);
    }

}

export {Operation};
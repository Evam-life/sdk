import * as z from "zod";
import vehicleStatusParser from "@/data/parsers/vehicle-services/vehicleStatusParser";
import destinationSiteLocationParser from "@/data/parsers/vehicle-services/destinationSiteLocationParser";
import destinationControlPointLocationParser from "@/data/parsers/vehicle-services/destinationControlPointLocationParser";
import availableHospitalLocationsParser from "@/data/parsers/vehicle-services/availableHospitalLocationsParser";
import leavePatientLocationParser from "@/data/parsers/vehicle-services/leavePatientLocationParser";
import operationPriorityParser from "@/data/parsers/vehicle-services/operationPriorityParser";
import operationStateParser from "@/data/parsers/vehicle-services/operationStateParser";
import vehicleServicesDatePayloadParser from "@/utils/common-parsers/vehicleServicesDatePayloadParser";
import operationUnitParser from "@/data/parsers/vehicle-services/operationUnitParser";

const generateFullOperationId = (
  callCenterId: string | undefined,
  caseFolderId: string | undefined,
  operationID: string | undefined,
) => `${callCenterId || ""}:${caseFolderId || ""}:${operationID || ""}`;

const operationParser = z
  .object({
    //metadata
    operationID: z.string(),
    name: z.string(),
    sendTime: vehicleServicesDatePayloadParser.optional(),
    createdTime: vehicleServicesDatePayloadParser.optional(),
    endTime: vehicleServicesDatePayloadParser.optional(),
    acceptedTime: vehicleServicesDatePayloadParser.optional(),
    //rakel
    callCenterId: z.string().optional(),
    caseFolderId: z.string().optional(),
    //misc
    transmitterCode: z.string().optional(),
    alarmCategory: z.string().optional(),
    alarmEventCode: z.string().optional(),
    medicalCommander: z.string().optional(),
    medicalIncidentOfficer: z.string().optional(),
    attachedCustomerObject: z.string().optional(),
    alarmEventText: z.string().optional(),
    additionalInfo: z.string().optional(),
    keyNumber: z.string().optional(),
    electronicKey: z.string().optional(),
    //radio groups
    radioGroupMain: z.string().optional(),
    radioGroupSecondary: z.string().optional(),
    additionalCoordinationInformation: z.string().optional(),
    //prio
    availablePriorities: z.array(operationPriorityParser).optional(),
    //patient
    patientName: z.string().optional(),
    patientUID: z.string().optional(),
    //status, destinations
    vehicleStatus: vehicleStatusParser.optional(),
    destinationSiteLocation: destinationSiteLocationParser.optional(),
    breakpointLocation: destinationControlPointLocationParser.optional(),
    availableHospitalLocations: availableHospitalLocationsParser.optional(),
    // Case index 2, 3, event description, comment
    header1: z.string().optional(),
    header2: z.string().optional(),
    eventInfo: z.string().optional(),
    caseInfo: z.string().optional(),
    selectedHospital: z.number().optional(),
    selectedPriority: z.number().optional(),
    operationState: operationStateParser,
    leavePatientLocation: leavePatientLocationParser.optional(),
    assignedResourceMissionNo: z.string().optional(),
    operationUnits: z.array(operationUnitParser).optional(),
  })
  .transform(operation => ({
    operationFullId: generateFullOperationId(
      operation.callCenterId,
      operation.caseFolderId,
      operation.operationID,
    ),
    ...operation,
  }));
export default operationParser;

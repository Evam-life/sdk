import * as z from "zod";
import { operationParser } from "@/data/parsers";

/**
 * An operation currently stored in the Operation List.
 * @property operationID The operation ID
 * @property name The operation name
 * @property sendTime The time at which the operation was sent
 * @property createdTime The time at which the operation was created
 * @property acceptedTime The time at which the operation was accepted (PREVIEW)
 * @property endTime The time at which the operation ended, `undefined` still ongoing
 * @property callCenterId The Call Center ID
 * @property caseFolderId The Case folder ID
 * @property transmitterCode The transmitter code
 * @property alarmCategory The alarm category
 * @property alarmEventCode The alarm event code
 * @property medicalCommander The medical commander of this operation
 * @property medicalIncidentOfficer The medical incident office of this operation
 * @property attachedCustomerObject The attached customer Object
 * @property alarmEventText The alarm event text
 * @property additionalInfo The additional information attached to this operation
 * @property keyNumber The key number
 * @property electronicKey The electronic key
 * @property radioGroupMain The main radio group associated with this operation
 * @property radioGroupSecondary The secondary radio group associated with this operation
 * @property additionalCoordinationInformation Additional coordination information
 * @property availablePriorities The list of available priorities to select from
 * @property patientName The name of the patient if any
 * @property patientUID The personal number of the patient if any
 * @property vehicleStatus The current vehicle status in this operation
 * @property destinationSiteLocation The location of the destination
 * @property breakpointLocation The location of the breakpoint if any
 * @property availableHospitalLocations The list of available hospitals to select from
 * @property header1 The case index 2
 * @property header2 The case index 3
 * @property eventInfo The event description
 * @property caseInfo The case info comment
 * @property selectedHospital The id of the selected hospital [inside available hospitals]
 * @property selectedPriority The id of the selected priority [inside available priority]
 * @property operationState the current state of the operation (ACTIVE, AVAILABLE, COMPLETE)
 * @property leavePatientLocation The location of the leave-patient ('toCity', etc)
 */
type Operation = z.infer<typeof operationParser>;

export type { Operation };

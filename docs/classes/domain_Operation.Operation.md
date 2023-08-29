# Class: Operation

[domain/Operation](../modules/domain_Operation.md).Operation

## Constructors

### constructor

**new Operation**(`operationID`, `name`, `sendTime`, `createdTime`, `endTime`, `callCenterId`, `caseFolderId`, `transmitterCode`, `alarmCategory`, `alarmEventCode`, `medicalCommander`, `medicalIncidentOfficer`, `attachedCustomerObject`, `alarmEventText`, `additionalInfo`, `keyNumber`, `electronicKey`, `radioGroupMain`, `radioGroupSecondary`, `additionalCoordinationInformation`, `availablePriorities`, `patientName`, `patientUID`, `vehicleStatus`, `destinationSiteLocation`, `breakpointLocation`, `availableHospitalLocations`, `header1`, `header2`, `eventInfo`, `caseInfo`, `selectedHospital`, `selectedPriority`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operationID` | `string` | The operation ID |
| `name` | `string` | The operation name |
| `sendTime` | `Date` | The time at which the operation was sent |
| `createdTime` | `Date` | The time at which the operation was created |
| `endTime` | `Date` | The time at which the operation ended, `undefined` still ongoing |
| `callCenterId` | `string` | The Call Center ID |
| `caseFolderId` | `string` | The Case folder ID |
| `transmitterCode` | `string` | The transmitter code |
| `alarmCategory` | `string` | The alarm category |
| `alarmEventCode` | `string` | The alarm event code |
| `medicalCommander` | `string` | The medical commander of this operation |
| `medicalIncidentOfficer` | `string` | The medical incident office of this operation |
| `attachedCustomerObject` | `string` | The attached customer Object |
| `alarmEventText` | `string` | The alarm event text |
| `additionalInfo` | `string` | The additional information attached to this operation |
| `keyNumber` | `string` | The key number |
| `electronicKey` | `string` | The electronic key |
| `radioGroupMain` | `string` | The main radio group associated with this operation |
| `radioGroupSecondary` | `string` | The secondary radio group associated with this operation |
| `additionalCoordinationInformation` | `string` | Additional coordination information |
| `availablePriorities` | [`OperationPriority`](domain_OperationPriority.OperationPriority.md)[] | The list of available priorities to select from |
| `patientName` | `string` | The name of the patient if any |
| `patientUID` | `string` | The personal number of the patient if any |
| `vehicleStatus` | [`VehicleStatus`](domain_VehicleStatus.VehicleStatus.md) | The current vehicle status in this operation |
| `destinationSiteLocation` | [`DestinationSiteLocation`](domain_DestinationSiteLocation.DestinationSiteLocation.md) | The location of the destination |
| `breakpointLocation` | [`DestinationControlPointLocation`](domain_DestinationControlPointLocation.DestinationControlPointLocation.md) | The location of the breakpoint if any |
| `availableHospitalLocations` | [`HospitalLocation`](domain_HospitalLocation.HospitalLocation.md)[] | The list of available hospitals to select from |
| `header1` | `string` | The case index 2 |
| `header2` | `string` | The case index 3 |
| `eventInfo` | `string` | The event description |
| `caseInfo` | `string` | The case info comment |
| `selectedHospital` | `number` | The id of the selected hospital [inside available hospitals] |
| `selectedPriority` | `number` | The id of the selected priority [inside available priority] |

## Properties

### additionalCoordinationInformation

 **additionalCoordinationInformation**: `string`

___

### additionalInfo

 **additionalInfo**: `string`

___

### alarmCategory

 **alarmCategory**: `string`

___

### alarmEventCode

 **alarmEventCode**: `string`

___

### alarmEventText

 **alarmEventText**: `string`

___

### attachedCustomerObject

 **attachedCustomerObject**: `string`

___

### availableHospitalLocations

 **availableHospitalLocations**: [`HospitalLocation`](domain_HospitalLocation.HospitalLocation.md)[]

___

### availablePriorities

 **availablePriorities**: [`OperationPriority`](domain_OperationPriority.OperationPriority.md)[]

___

### breakpointLocation

 **breakpointLocation**: [`DestinationControlPointLocation`](domain_DestinationControlPointLocation.DestinationControlPointLocation.md)

___

### callCenterId

 **callCenterId**: `string`

___

### caseFolderId

 **caseFolderId**: `string`

___

### caseInfo

 **caseInfo**: `string`

___

### createdTime

 **createdTime**: `Date`

___

### destinationSiteLocation

 **destinationSiteLocation**: [`DestinationSiteLocation`](domain_DestinationSiteLocation.DestinationSiteLocation.md)

___

### electronicKey

 **electronicKey**: `string`

___

### endTime

 **endTime**: `Date`

___

### eventInfo

 **eventInfo**: `string`

___

### header1

 **header1**: `string`

___

### header2

 **header2**: `string`

___

### keyNumber

 **keyNumber**: `string`

___

### medicalCommander

 **medicalCommander**: `string`

___

### medicalIncidentOfficer

 **medicalIncidentOfficer**: `string`

___

### name

 **name**: `string`

___

### operationID

 **operationID**: `string`

___

### patientName

 **patientName**: `string`

___

### patientUID

 **patientUID**: `string`

___

### radioGroupMain

 **radioGroupMain**: `string`

___

### radioGroupSecondary

 **radioGroupSecondary**: `string`

___

### selectedHospital

 **selectedHospital**: `number`

___

### selectedPriority

 **selectedPriority**: `number`

___

### sendTime

 **sendTime**: `Date`

___

### transmitterCode

 **transmitterCode**: `string`

___

### vehicleStatus

 **vehicleStatus**: [`VehicleStatus`](domain_VehicleStatus.VehicleStatus.md)

## Methods

### fromJSON

`Static` **fromJSON**(`data`): [`Operation`](domain_Operation.Operation.md)

Create from JSON

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `any` | JSON object |

#### Returns

[`Operation`](domain_Operation.Operation.md)

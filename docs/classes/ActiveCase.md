# Class: ActiveCase

## Constructors

### constructor

**new ActiveCase**(`operationID`, `name`, `sendTime`, `createdTime`, `endTime`, `callCenterId`, `caseFolderId`, `transmitterCode`, `alarmCategory`, `alarmEventCode`, `medicalCommander`, `medicalIncidentOfficer`, `attachedCustomerObject`, `alarmEventText`, `additionalInfo`, `keyNumber`, `electronicKey`, `radioGroupMain`, `radioGroupSecondary`, `additionalCoordinationInformation`, `prio`, `patientName`, `patientUID`, `vehicleStatus`, `siteLocation`, `breakpointLocation`, `header1`, `header2`, `eventInfo`, `caseInfo`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operationID` | `String` | The operation ID |
| `name` | `String` | The operation name |
| `sendTime` | `Date` | The time at which the operation was sent |
| `createdTime` | `Date` | The time at which the operation was created |
| `endTime` | `Date` | The time at which the operation ended, `undefined` still ongoing |
| `callCenterId` | `String` | The Call Center ID |
| `caseFolderId` | `String` | The Case folder ID |
| `transmitterCode` | `String` | The transmitter code |
| `alarmCategory` | `String` | The alarm category |
| `alarmEventCode` | `String` | The alarm event code |
| `medicalCommander` | `String` | The medical commander of this operation |
| `medicalIncidentOfficer` | `String` | The medical incident office of this operation |
| `attachedCustomerObject` | `String` | The attached customer Object |
| `alarmEventText` | `String` | The alarm event text |
| `additionalInfo` | `String` | The additional information attached to this operation |
| `keyNumber` | `String` | The key number |
| `electronicKey` | `String` | The electronic key |
| `radioGroupMain` | `String` | The main radio group associated with this operation |
| `radioGroupSecondary` | `String` | The secondary radio group associated with this operation |
| `additionalCoordinationInformation` | `String` | Additional coordination information |
| `prio` | `String` | The priority of this operation |
| `patientName` | `String` | The name of the patient if any |
| `patientUID` | `String` | The personal number of the patient if any |
| `vehicleStatus` | [`VehicleStatus`](VehicleStatus.md) | The current vehicle status in this operation |
| `siteLocation` | [`DestinationSiteLocation`](DestinationSiteLocation.md) | The location of the destination site |
| `breakpointLocation` | [`DestinationControlPointLocation`](DestinationControlPointLocation.md) | The location of the breakpoint if any |
| `header1` | `String` | The case index 2 |
| `header2` | `String` | The case index 3 |
| `eventInfo` | `String` | The event description |
| `caseInfo` | `String` | The case info comment |

## Properties

### additionalCoordinationInformation

 **additionalCoordinationInformation**: `String`

___

### additionalInfo

 **additionalInfo**: `String`

___

### alarmCategory

 **alarmCategory**: `String`

___

### alarmEventCode

 **alarmEventCode**: `String`

___

### alarmEventText

 **alarmEventText**: `String`

___

### attachedCustomerObject

 **attachedCustomerObject**: `String`

___

### breakpointLocation

 **breakpointLocation**: [`DestinationControlPointLocation`](DestinationControlPointLocation.md)

___

### callCenterId

 **callCenterId**: `String`

___

### caseFolderId

 **caseFolderId**: `String`

___

### caseInfo

 **caseInfo**: `String`

___

### createdTime

 **createdTime**: `Date`

___

### electronicKey

 **electronicKey**: `String`

___

### endTime

 **endTime**: `Date`

___

### eventInfo

 **eventInfo**: `String`

___

### header1

 **header1**: `String`

___

### header2

 **header2**: `String`

___

### keyNumber

 **keyNumber**: `String`

___

### medicalCommander

 **medicalCommander**: `String`

___

### medicalIncidentOfficer

 **medicalIncidentOfficer**: `String`

___

### name

 **name**: `String`

___

### operationID

 **operationID**: `String`

___

### patientName

 **patientName**: `String`

___

### patientUID

 **patientUID**: `String`

___

### prio

 **prio**: `String`

___

### radioGroupMain

 **radioGroupMain**: `String`

___

### radioGroupSecondary

 **radioGroupSecondary**: `String`

___

### sendTime

 **sendTime**: `Date`

___

### siteLocation

 **siteLocation**: [`DestinationSiteLocation`](DestinationSiteLocation.md)

___

### transmitterCode

 **transmitterCode**: `String`

___

### vehicleStatus

 **vehicleStatus**: [`VehicleStatus`](VehicleStatus.md)

## Methods

### getFullId

**getFullId**(): `string`

Gets the full operation ID, e.g. '1:18:6546', composed by 'callCenterId:caseFolderId:operationID'.

#### Returns

`string`

The full operation ID

___

### fromJson

`Static` **fromJson**(`op`): [`ActiveCase`](ActiveCase.md)

Creates a new operation from JSON object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | `any` | The JSON object |

#### Returns

[`ActiveCase`](ActiveCase.md)

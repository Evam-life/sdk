# Class: VehicleState

[domain/VehicleState](../modules/domain_VehicleState.md).VehicleState

## Constructors

### constructor

**new VehicleState**(`timestamp`, `vehicleStatus`, `activeCaseFullId`, `vehicleLocation`)

State of the vehicle, location, status, id

**`See`**

VehicleStatus

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timestamp` | `Date` | timestamp of when state received |
| `vehicleStatus` | [`VehicleStatus`](domain_VehicleStatus.VehicleStatus.md) | status of the vehicle |
| `activeCaseFullId` | `string` | id of the current active operation |
| `vehicleLocation` | [`Location`](domain_Location.Location.md) | current vehicle location |

## Properties

### activeCaseFullId

 **activeCaseFullId**: `string`

___

### timestamp

 **timestamp**: `Date`

___

### vehicleLocation

 **vehicleLocation**: [`Location`](domain_Location.Location.md)

___

### vehicleStatus

 **vehicleStatus**: [`VehicleStatus`](domain_VehicleStatus.VehicleStatus.md)

## Methods

### fromJSON

`Static` **fromJSON**(`vehicleState`): [`VehicleState`](domain_VehicleState.VehicleState.md)

Create from JSON

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vehicleState` | `any` | JSON object |

#### Returns

[`VehicleState`](domain_VehicleState.VehicleState.md)

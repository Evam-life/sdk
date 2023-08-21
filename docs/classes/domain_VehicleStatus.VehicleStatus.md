# Class: VehicleStatus

[domain/VehicleStatus](../modules/domain_VehicleStatus.md).VehicleStatus

## Constructors

### constructor

**new VehicleStatus**(`name`, `event`, `successorName`, `isStartStatus`, `isEndStatus`, `categoryType`, `categoryName`)

Vehicle status

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the vehicle status |
| `event` | `string` | The event associated to this status, if any |
| `successorName` | `string` | The name of a typical successor to this status based on vehicle configuration |
| `isStartStatus` | `boolean` | true if this status is engaged at the start of a new operation |
| `isEndStatus` | `boolean` | true if this status closes the current operation |
| `categoryType` | `string` | Type if status: 'mission' or 'other' |
| `categoryName` | `string` | The name of the category as defined by the vehicle user |

## Properties

### categoryName

 **categoryName**: `string`

___

### categoryType

 **categoryType**: `string`

___

### event

 **event**: `string`

___

### isEndStatus

 **isEndStatus**: `boolean`

___

### isStartStatus

 **isStartStatus**: `boolean`

___

### name

 **name**: `string`

___

### successorName

 **successorName**: `string`

## Methods

### fromJSON

`Static` **fromJSON**(`status`): [`VehicleStatus`](domain_VehicleStatus.VehicleStatus.md)

Creates from JSON

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `status` | `any` | JSON object |

#### Returns

[`VehicleStatus`](domain_VehicleStatus.VehicleStatus.md)

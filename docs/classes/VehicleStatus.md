# Class: VehicleStatus

## Constructors

### constructor

**new VehicleStatus**(`name`, `event`, `successorName`, `isStartStatus`, `isEndStatus`, `categoryType`, `categoryName`)

Vehicle status

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `String` | The name of the vehicle status |
| `event` | `String` | The event associated to this status, if any |
| `successorName` | `String` | The name of a typical successor to this status based on vehicle configuration |
| `isStartStatus` | `Boolean` | true if this status is engaged at the start of a new operation |
| `isEndStatus` | `Boolean` | true of this status closes the current operation |
| `categoryType` | `String` | Type of status: 'mission' or 'other' |
| `categoryName` | `String` | The name of the category as defined by the vehicle user |

## Properties

### categoryName

 **categoryName**: `String`

___

### categoryType

 **categoryType**: `String`

___

### event

 **event**: `String`

___

### isEndStatus

 **isEndStatus**: `Boolean`

___

### isStartStatus

 **isStartStatus**: `Boolean`

___

### name

 **name**: `String`

___

### successorName

 **successorName**: `String`

## Methods

### fromJson

`Static` **fromJson**(`status`): [`VehicleStatus`](VehicleStatus.md)

Creates from JSON

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `status` | `any` | JSON object |

#### Returns

[`VehicleStatus`](VehicleStatus.md)

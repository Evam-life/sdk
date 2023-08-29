# Class: Location

[domain/Location](../modules/domain_Location.md).Location

## Constructors

### constructor

**new Location**(`latitude`, `longitude`, `timestamp`)

Location on a map

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `latitude` | `number` | latitude coordinate of the location |
| `longitude` | `number` | longitude coordinate of the location |
| `timestamp` | `Date` | time the location was provided |

## Properties

### latitude

 **latitude**: `number`

___

### longitude

 **longitude**: `number`

___

### timestamp

 **timestamp**: `Date`

## Methods

### fromJSON

`Static` **fromJSON**(`loc`): [`Location`](domain_Location.Location.md)

Create from JSON

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `loc` | `any` | JSON object |

#### Returns

[`Location`](domain_Location.Location.md)

# Class: DestinationControlPointLocation

## Constructors

### constructor

**new DestinationControlPointLocation**(`latitude`, `longitude`, `name`, `additionalInfo`)

Location of a breakpoint

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `latitude` | `Number` | Latitude in decimal degrees |
| `longitude` | `Number` | Longitude in decimal degrees |
| `name` | `String` | Breakpoint name if available |
| `additionalInfo` | `String` | Additional information if available |

## Properties

### additionalInfo

 **additionalInfo**: `String`

___

### latitude

 **latitude**: `Number`

___

### longitude

 **longitude**: `Number`

___

### name

 **name**: `String`

## Methods

### fromJson

`Static` **fromJson**(`loc`): [`DestinationControlPointLocation`](DestinationControlPointLocation.md)

Create from JSON

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `loc` | `any` | JSON object |

#### Returns

[`DestinationControlPointLocation`](DestinationControlPointLocation.md)

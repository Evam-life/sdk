# Class: DestinationControlPointLocation

[domain/DestinationControlPointLocation](../modules/domain_DestinationControlPointLocation.md).DestinationControlPointLocation

## Constructors

### constructor

**new DestinationControlPointLocation**(`latitude`, `longitude`, `name`, `additionalInfo`)

Location of a breakpoint

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `latitude` | `number` | Latitude in decimal degrees |
| `longitude` | `number` | Longitude in decimal degrees |
| `name` | `string` | Breakpoint name if available |
| `additionalInfo` | `string` | Additional information if available |

## Properties

### additionalInfo

 **additionalInfo**: `string`

___

### latitude

 **latitude**: `number`

___

### longitude

 **longitude**: `number`

___

### name

 **name**: `string`

## Methods

### fromJSON

`Static` **fromJSON**(`loc`): [`DestinationControlPointLocation`](domain_DestinationControlPointLocation.DestinationControlPointLocation.md)

Create from JSON

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `loc` | `any` | JSON object |

#### Returns

[`DestinationControlPointLocation`](domain_DestinationControlPointLocation.DestinationControlPointLocation.md)

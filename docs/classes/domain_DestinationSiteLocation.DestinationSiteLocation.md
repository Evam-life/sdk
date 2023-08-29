# Class: DestinationSiteLocation

[domain/DestinationSiteLocation](../modules/domain_DestinationSiteLocation.md).DestinationSiteLocation

## Constructors

### constructor

**new DestinationSiteLocation**(`latitude`, `longitude`, `street`, `locality`, `municipality`, `routeDirections`, `pickupTime`)

Location of a destination site

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `latitude` | `number` | Latitude in decimal degrees |
| `longitude` | `number` | Longitude in decimal degrees |
| `street` | `string` | The street name if available |
| `locality` | `string` | The locality name if available |
| `municipality` | `string` | The municipality name if available |
| `routeDirections` | `string` | The route directions text if available |
| `pickupTime` | `string` | The pickup time text if available |

## Properties

### latitude

 **latitude**: `number`

___

### locality

 **locality**: `string`

___

### longitude

 **longitude**: `number`

___

### municipality

 **municipality**: `string`

___

### pickupTime

 **pickupTime**: `string`

___

### routeDirections

 **routeDirections**: `string`

___

### street

 **street**: `string`

## Methods

### fromJSON

`Static` **fromJSON**(`loc`): [`DestinationSiteLocation`](domain_DestinationSiteLocation.DestinationSiteLocation.md)

Create from JSON

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `loc` | `any` | JSON object |

#### Returns

[`DestinationSiteLocation`](domain_DestinationSiteLocation.DestinationSiteLocation.md)

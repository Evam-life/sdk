# Class: DestinationSiteLocation

## Constructors

### constructor

**new DestinationSiteLocation**(`latitude`, `longitude`, `street`, `locality`, `municipality`, `routeDirections`, `pickupTime`)

Location of a destination site

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `latitude` | `Number` | Latitude in decimal degrees |
| `longitude` | `Number` | Longitude in decimal degrees |
| `street` | `String` | The street name if available |
| `locality` | `String` | The locality name if available |
| `municipality` | `String` | The municipality name if available |
| `routeDirections` | `String` | The route directions text if available |
| `pickupTime` | `String` | The pickup time text if available |

## Properties

### latitude

 **latitude**: `Number`

___

### locality

 **locality**: `String`

___

### longitude

 **longitude**: `Number`

___

### municipality

 **municipality**: `String`

___

### pickupTime

 **pickupTime**: `String`

___

### routeDirections

 **routeDirections**: `String`

___

### street

 **street**: `String`

## Methods

### fromJson

`Static` **fromJson**(`loc`): [`DestinationSiteLocation`](DestinationSiteLocation.md)

Create from JSON

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `loc` | `any` | JSON object |

#### Returns

[`DestinationSiteLocation`](DestinationSiteLocation.md)

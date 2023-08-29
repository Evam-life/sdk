# Class: TripLocationHistory

[domain/TripLocationHistory](../modules/domain_TripLocationHistory.md).TripLocationHistory

## Constructors

### constructor

**new TripLocationHistory**(`locationHistory`, `etaSeconds`)

An array of locations represents the history of the trip

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locationHistory` | [`Location`](domain_Location.Location.md)[] | location array |
| `etaSeconds` | `number` | 'estimated time of arrival' in seconds |

## Properties

### etaSeconds

 **etaSeconds**: `number`

___

### locationHistory

 **locationHistory**: [`Location`](domain_Location.Location.md)[]

## Methods

### fromJSON

`Static` **fromJSON**(`tripLocationHistory`): [`TripLocationHistory`](domain_TripLocationHistory.TripLocationHistory.md)

Create from JSON

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tripLocationHistory` | `any` | JSON object |

#### Returns

[`TripLocationHistory`](domain_TripLocationHistory.TripLocationHistory.md)

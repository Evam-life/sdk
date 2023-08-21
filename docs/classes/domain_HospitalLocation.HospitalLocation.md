# Class: HospitalLocation

[domain/HospitalLocation](../modules/domain_HospitalLocation.md).HospitalLocation

## Constructors

### constructor

**new HospitalLocation**(`id`, `latitude`, `longitude`, `name`, `street1`, `city`, `region`, `postalCode`)

Location of a hospital

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `number` | Hospital unique ID |
| `latitude` | `number` | Latitude of hospital location |
| `longitude` | `number` | Longitude of hospital location |
| `name` | `string` | Name of hospital |
| `street1` | `string` | street address of hospital |
| `city` | `string` | city in which hospital is located |
| `region` | `string` | region in which hospital is located |
| `postalCode` | `string` | postal code of hospital |

## Properties

### city

 **city**: `string`

___

### id

 **id**: `number`

___

### latitude

 **latitude**: `number`

___

### longitude

 **longitude**: `number`

___

### name

 **name**: `string`

___

### postalCode

 **postalCode**: `string`

___

### region

 **region**: `string`

___

### street1

 **street1**: `string`

## Methods

### fromJSON

`Static` **fromJSON**(`hospitalLocation`): [`HospitalLocation`](domain_HospitalLocation.HospitalLocation.md)

Create from JSON

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hospitalLocation` | `any` | JSON object |

#### Returns

[`HospitalLocation`](domain_HospitalLocation.HospitalLocation.md)

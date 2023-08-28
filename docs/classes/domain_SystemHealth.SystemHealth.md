# Class: SystemHealth

[domain/SystemHealth](../modules/domain_SystemHealth.md).SystemHealth

## Constructors

### constructor

**new SystemHealth**(`isHealthy`, `message`, `timestamp`)

Health status of system

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `isHealthy` | `boolean` | boolean value represents whether system is healthy or not |
| `message` | `string` | information message |
| `timestamp` | `Date` | time of information received |

## Properties

### isHealthy

 **isHealthy**: `boolean`

___

### message

 **message**: `string`

___

### timestamp

 **timestamp**: `Date`

## Methods

### fromJSON

`Static` **fromJSON**(`systemHealth`): [`SystemHealth`](domain_SystemHealth.SystemHealth.md)

Create from JSON

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `systemHealth` | `any` | JSON object |

#### Returns

[`SystemHealth`](domain_SystemHealth.SystemHealth.md)

# Class: Patient

[domain/Patient](../modules/domain_Patient.md).Patient

## Constructors

### constructor

**new Patient**(`name`, `uid`)

A patient

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of the patient |
| `uid` | `string` | unique identifier of the patient |

## Properties

### name

 **name**: `string`

___

### uid

 **uid**: `string`

## Methods

### fromJSON

`Static` **fromJSON**(`patient`): [`Patient`](domain_Patient.Patient.md)

Create from JSON

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `patient` | `any` | JSON object |

#### Returns

[`Patient`](domain_Patient.Patient.md)

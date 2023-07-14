-# Class: EvamApi

Evam API singleton that exposes methods to interact with the Evam platform.

**`Example`**

```ts
// Get singleton instance
const evamApi = EvamApi.getInstance();

// Register a new callback on any operation update that simply logs it
evamApi.onNewOrUpdatedOperation((activeOperation) => console.log(activeOperation));

// Register a new callback on any application settings update that simply logs them
evamApi.onNewOrUpdatedSettings((settings) => console.log(settings));
```

## Properties

### isRunningInVehicleServices

 `Readonly` **isRunningInVehicleServices**: `Boolean`

True if Vehicle Services environment is detected, False otherwise (for instance, a web browser)

## Methods

### injectOperation

**injectOperation**(`activeCase`): `void`

Injects the Active Operation manually. This will trigger onNewOrUpdatedOperation(...)'s callback.
This function is to be used for development only and will throw an error when used in Vehicle Services.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `activeCase` | [`ActiveCase`](ActiveCase.md) | The active case to be injected for development purposes. |

#### Returns

`void`

___

### injectSettings

**injectSettings**(`settings`): `void`

Injects the settings manually. This will trigger onNewOrUpdatedSettings(...)'s callback.
This function is to be used for development only and will throw an error when used in Vehicle Services.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `settings` | `Object` | The settings to be injected for development purposes. |

#### Returns

`void`

___

### onNewOrUpdatedOperation

**onNewOrUpdatedOperation**(`callback`): `void`

Registers a callback to be run upon a new Active Operation is available or the current Active
Operation is updated.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`activeCase`: [`ActiveCase`](ActiveCase.md)) => `void` | The callback to be executed |

#### Returns

`void`

___

### onNewOrUpdatedSettings

**onNewOrUpdatedSettings**(`callback`): `void`

Registers a callback to be run upon new application settings reception or settings update

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`settings`: `Object`) => `void` | The callback to be executed |

#### Returns

`void`

___

### getInstance

`Static` **getInstance**(): [`EvamApi`](EvamApi.md)

Gets the Evam API singleton instance

#### Returns

[`EvamApi`](EvamApi.md)

The Evam API instance

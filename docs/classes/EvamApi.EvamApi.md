# Class: EvamApi

[EvamApi](../modules/EvamApi.md).EvamApi

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

## Constructors

### constructor

**new EvamApi**()

## Properties

### evamData

 `Static` `Private` **evamData**: `EvamData`

EvamData instance for storing data regard Vehcile Services.

___

### isRunningInVehicleServices

 `Static` `Readonly` **isRunningInVehicleServices**: `boolean`

True if Vehicle Services environment is detected, False otherwise (for instance, a web
We have to ignore this because the Android item causes an error.

___

### newOrUpdatedDeviceRoleCallbacks

 `Static` `Private` **newOrUpdatedDeviceRoleCallbacks**: (`e`: `Event`) => `void`[]

___

### newOrUpdatedInternetStateCallbacks

 `Static` `Private` **newOrUpdatedInternetStateCallbacks**: (`e`: `Event`) => `void`[]

___

### newOrUpdatedLocationCallbacks

 `Static` `Private` **newOrUpdatedLocationCallbacks**: (`e`: `Event`) => `void`[]

___

### newOrUpdatedSettingsCallbacks

 `Static` `Private` **newOrUpdatedSettingsCallbacks**: (`e`: `Event`) => `void`[]

___

### newOrUpdatedTripLocationHistoryCallbacks

 `Static` `Private` **newOrUpdatedTripLocationHistoryCallbacks**: (`e`: `Event`) => `void`[]

___

### newOrUpdatedVehicleStateCallbacks

 `Static` `Private` **newOrUpdatedVehicleStateCallbacks**: (`e`: `Event`) => `void`[]

## Methods

### injectDeviceRole

**injectDeviceRole**(`deviceRole`): `void`

Manually inject deviceRole to EvamApi (Only available in development.)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deviceRole` | [`DeviceRole`](../enums/domain_DeviceRole.DeviceRole.md) | the deviceRole to inject. |

#### Returns

`void`

___

### injectInternetState

**injectInternetState**(`internetState`): `void`

Manually inject internetState to EvamApi (Only available in development.)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `internetState` | [`InternetState`](../enums/domain_InternetState.InternetState.md) | the internetState to inject. |

#### Returns

`void`

___

### injectLocation

**injectLocation**(`location`): `void`

Manually inject location to EvamApi (Only available in development.)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `location` | [`Location`](domain_Location.Location.md) | the location to inject. |

#### Returns

`void`

___

### injectOperation

**injectOperation**(`activeCase`): `void`

Injects the Active Operation manually. This will trigger onNewOrUpdatedOperation(...)'s callback.
This function is to be used for development only and will throw an error when used in Vehicle Services.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `activeCase` | [`Operation`](domain_Operation.Operation.md) | The active case to be injected for development purposes. |

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
| `settings` | `object` | The settings to be injected for development purposes. |

#### Returns

`void`

___

### injectTrip

**injectTrip**(`tripLocationHistory`): `void`

Manually inject tripLocationHistory to EvamApi (Only available in development.)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tripLocationHistory` | [`TripLocationHistory`](domain_TripLocationHistory.TripLocationHistory.md) | the tripLocationHistory to inject. |

#### Returns

`void`

___

### injectVehicleState

**injectVehicleState**(`vehicleState`): `void`

Manually inject vehicleState to EvamApi (Only available in development.)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vehicleState` | [`VehicleState`](domain_VehicleState.VehicleState.md) | the vehicleState to inject. |

#### Returns

`void`

___

### onNewOrUpdatedDeviceRole

**onNewOrUpdatedDeviceRole**(`callback`): `void`

Registers a callback to be run upon new device role or device role update

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`deviceRole`: [`DeviceRole`](../enums/domain_DeviceRole.DeviceRole.md)) => `void` | The callback to be executed. |

#### Returns

`void`

___

### onNewOrUpdatedInternetState

**onNewOrUpdatedInternetState**(`callback`): `void`

Registers a callback to be run upon new internetState or internetState update

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`internetState`: [`InternetState`](../enums/domain_InternetState.InternetState.md)) => `void` | The callback to be executed. |

#### Returns

`void`

___

### onNewOrUpdatedLocation

**onNewOrUpdatedLocation**(`callback`): `void`

Registers a callback to be run upon new location or location update

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`location`: [`Location`](domain_Location.Location.md)) => `void` | The callback to be executed. |

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
| `callback` | (`activeOperation`: [`Operation`](domain_Operation.Operation.md)) => `void` | The callback to be executed |

#### Returns

`void`

___

### onNewOrUpdatedSettings

**onNewOrUpdatedSettings**(`callback`): `void`

Registers a callback to be run upon new application settings reception or settings update

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`settings`: `object`) => `void` | The callback to be executed. |

#### Returns

`void`

___

### onNewOrUpdatedTripLocationHistory

**onNewOrUpdatedTripLocationHistory**(`callback`): `void`

Used to assign a callback when the trip location history is created or updated.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`tripLocationHistory`: [`TripLocationHistory`](domain_TripLocationHistory.TripLocationHistory.md)) => `void` | The callback with (optional) argument tripLocationHistory. Use this to access the trip location history. |

#### Returns

`void`

___

### onNewOrUpdatedVehicleState

**onNewOrUpdatedVehicleState**(`callback`): `void`

Used to assign a callback when the vehicle state is created or updated.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`vehicleState`: [`VehicleState`](domain_VehicleState.VehicleState.md)) => `void` | The callback with (optional) argument vehicleState. Use this to access the vehicle state. |

#### Returns

`void`

___

### setHospital

**setHospital**(`id`): `void`

Sets the selected hospital id for the current active operation. The id must be present inside the available hospitals

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `number` | the id of the hospital to be set |

#### Returns

`void`

___

### setPrio

**setPrio**(`id`): `void`

Sets the selected priority id for the current active operation. The id must be present inside the available priorities.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `number` | of the prio to be set |

#### Returns

`void`

___

### unsubscribeFromAllCallbacks

**unsubscribeFromAllCallbacks**(): `void`

Unsubscribes all registered callbacks from Vehicle Service events.

#### Returns

`void`

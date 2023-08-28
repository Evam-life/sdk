# Module: util/EventHelpers

## Functions

### publish

**publish**(`eventName`, `data`): `void`

Low level method wrapper around document.dispatchEvent specifically for handling EvamEvents

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | [`default`](../enums/domain_EvamEvents.default.md) | EvamEvent |
| `data` | `any` | data to be passed to the callback |

#### Returns

`void`

___

### subscribe

**subscribe**(`eventName`, `listener`): `void`

Low level method wrapper around document.addEventListener specifically for handling EvamEvents

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | [`default`](../enums/domain_EvamEvents.default.md) | EvamEvent |
| `listener` | `EventListenerOrEventListenerObject` | callback |

#### Returns

`void`

___

### unsubscribe

**unsubscribe**(`eventName`, `listener`): `void`

Low level method wrapper around document.removeEventListener specifically for handling EvamEvents

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | [`default`](../enums/domain_EvamEvents.default.md) | EvamEvent |
| `listener` | `EventListenerOrEventListenerObject` | callback |

#### Returns

`void`

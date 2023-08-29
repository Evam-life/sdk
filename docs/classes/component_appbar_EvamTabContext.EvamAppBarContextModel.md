# Class: EvamAppBarContextModel

[component/appbar/EvamTabContext](../modules/component_appbar_EvamTabContext.md).EvamAppBarContextModel

Context data model for the Evam App bar component

## Constructors

### constructor

**new EvamAppBarContextModel**(`activeTabId`, `previousActiveTabId`, `subTabId`, `setActiveTabId`, `setPreviousActiveTabId`, `setSubTabId`, `specialComponent`, `setSpecialComponent`, `isMenuOpen`, `setIsMenuOpen`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `activeTabId` | `number` |
| `previousActiveTabId` | `number` |
| `subTabId` | `number` |
| `setActiveTabId` | (`_`: `number`) => `void` |
| `setPreviousActiveTabId` | (`_`: `number`) => `void` |
| `setSubTabId` | (`_`: `number`) => `void` |
| `specialComponent` | `ReactNode` |
| `setSpecialComponent` | (`_`: `ReactNode`) => `void` |
| `isMenuOpen` | `boolean` |
| `setIsMenuOpen` | (`_`: `boolean`) => `void` |

## Properties

### activeTabId

 **activeTabId**: `number`

___

### isMenuOpen

 **isMenuOpen**: `boolean`

___

### previousActiveTabId

 **previousActiveTabId**: `number`

___

### setIsMenuOpen

 **setIsMenuOpen**: (`_`: `boolean`) => `void`

#### Type declaration

(`_`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `_` | `boolean` |

##### Returns

`void`

___

### setSpecialComponent

 **setSpecialComponent**: (`_`: `ReactNode`) => `void`

#### Type declaration

(`_`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `_` | `ReactNode` |

##### Returns

`void`

___

### specialComponent

 **specialComponent**: `ReactNode`

___

### subTabId

 **subTabId**: `number`

## Methods

### handleChange

**handleChange**(`event`, `newValue`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `SyntheticEvent`<`Element`, `Event`\> |
| `newValue` | `number` |

#### Returns

`void`

___

### setActiveTab

**setActiveTab**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

`void`

___

### setDelay

`Private` **setDelay**(`ms`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ms` | `number` |

#### Returns

`Promise`<`void`\>

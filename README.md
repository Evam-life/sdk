# Evam SDK

![Evam](https://uploads-ssl.webflow.com/617bfe6eee00c8179b464cd6/617bfe6eee00c8209d464cec_evam_full-logo.svg)

This package contains the Evam SDK TS/JS modules for Evam app development.

The full documentation is available at: [Evam SDK documentation](https://evam-life.github.io).

## Quick start

To use this SDK, instantiate `EvamApi()` and access its observer functions.

```typescript
import {EvamApi} from "@evam-life/sdk";

const evamApi = new EvamApi();

// Register observer for active operation
evamApi.onNewOrUpdatedActiveOperation((activeCase) => {
    // Handle updated case
})

// Register observer for device location
evamApi.onNewOrUpdatedLocation((deviceLocation) => {
    // Handle updated device location
})

// Add as many observers as required, see documentation for more
```

It is recommended you set up all needed observers `onNew...` as soon as your application
starts. The typical pattern is to handle each update from `EvamApi` by passing
the observed data in your preferred application data store, such as Redux.

## Compatibility

The SDK is written in Typescript and types are exported within the
package, no need to install them separately. Javascript is fully
compatible with the SDK.

The use of React is recommended, but other libraries/frameworks
should also work. A set of turnkey React components is provided to get
you started quickly, see [Use the built-in components](https://evam-life.github.io/tech/using_the_sdk.html#use-the-built-in-ui-components).
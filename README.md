# Evam SDK 🚑

The Evam SDK provides functionality for communicating to and from Evam's Vehicle Services, serving as a module for the
development of Certified Applications on the Evam platform.

**Official Documentation**  
https://www.documentation.evam.life/

**Evam**  
https://www.evam.life/

## Quick Start

To utilize the SDK, create an instance of the EvamApi class. Feel free to generate multiple instances without
hesitation, as they are merely lightweight references to a shared data container.

### Subscribing To An Event

To subscribe to an event, use the EvamApi 'on' method by providing the event name as the first argument and the callback
as the second.

```typescript
import { EvamApi, Operation } from "@evam-life/sdk";

const handleNewOrUpdatedOperation = (operation?: Operation) => {
  //do something
};

//either pass in a method with a valid signature
EvamApi.event.on("newOrUpdatedOperation", handleNewOrUpdatedOperation);

//or write the callback inline
EvamApi.event.on("newOrUpdatedLocation", location => {
  //do something else
});
```

For a list of all events consult the [documentation](https://www.documentation.evam.life/).

### Unsubscribing From An Event

To unsubscribe from an event use the EvamApi 'off' method.

```typescript
import {EvamApi} from "@evam-life/sdk";

//unsubscribe a specific callback from a specific event
EvamApi.off("newOrUpdatedOperation", handleNewOrUpdatedOperation);

//unsubscribe every callback from a specific event
EvamApi.off("newOrUpdatedLocation");

//unsubscribe every callback from every event
EvamApi.off();
```

## Features

### Notifications

Send notifications to Vehicle Services

```typescript
import { EvamApi, VehicleServicesNotification } from "@evam-life/sdk";

const notification: VehicleServicesNotification = {
  heading: "Notification heading",
  description: "Notification description",
  type: "ACTION_HUN",
  primaryButton: {
    label: "Notification primary button",
    callback: () => {
      //do something
    },
  },
};

EvamApi.notification.send(notification);
```

### Operation

Set properties for the current operation

```typescript
import { EvamApi } from "@evam-life/sdk";

//currently supported setters
EvamApi.operation.setPriority(/*priority id*/);
EvamApi.operation.setHospital(/*hosptial location id*/);
```

### Map

Interact with the Vehicle Services map.

#### Drawing Nav Layer Data

##### Shapes

```typescript
import { EvamApi, LayerShapeDatum } from "@evam-life/sdk";

const id = "layerShapeDataId";
//shapes
const navLayerShapeData: Array<LayerShapeDatum> = [
  {
    points: [
      {
        latitude: 0,
        longitude: 0,
      },
    ],
    text: "Lorem Ipsum",
    color: "#FF0000",
  },
];

EvamApi.map.setNavLayerShape(id, navLayerShapeData);
```

##### Points

```typescript
import { EvamApi, LayerPointDatum } from "@evam-life/sdk";

const id = "layerPointDataId";
//shapes
const navLayerPointData: Array<LayerPointDatum> = [
  {
    point: {
      latitude: 0,
      longitude: 0,
    },
    test: "Lorem Ipsum",
    icon: "fire_truck", //relating to Material Design icons
  },
];

EvamApi.map.setNavLayerPoint(id, navLayerPointData);
```

##### Deletion

You can delete a nav layer by passing the id to the deleteNavLayer method. Developers will need to generate and manage
their own ids for their layers.

```typescript
import { EvamApi } from "@evam-life/sdk";

EvamApi.map.deleteNavLayer(/*id here*/);
```

The 'store' property will utilise localStorage if running outside of Vehicle Services.

### Testing Utilities

The EvamApi class provides a set of utilities for testing your app inside
different testing environments such as Jest and Cypress.

Be aware that even though it's possible to call the testing utilities within the application itself
many of these testing utilities will not run inside the Vehicle Services environment.

The test utilities can be accessed via the "test-utils" property of the EvamApi class.

```typescript
import { EvamApi } from "@evam-life/sdk";

//notice the square bracket notation
EvamApi["test-utils"];
```

#### inject / uncheckedInject

Use "inject" to simulate a Vehicle Services event.

```typescript
import { EvamApi } from "@evam-life/sdk";

EvamApi.inject("newOrUpdatedDisplayMode", "LIGHT");
```

Use "uncheckedInject" to simulate a Vehicle Services event without any typechecking on the payload.

```typescript
//invalid payloads that can not parse to their relevent event payload type will be ignore
EvamApi.uncheckedInject("newOrUpdatedDisplayMode", 0);
```

#### setDocument

If using an E2E framework such as Cypress you may need to pass a 'Document' instance
to the EvamApi class.

```typescript
import { EvamApi } from "@evam-life/sdk";

//this example is using Cypress
cy.document().then(doc => {
  EvamApi["test-utils"].setDocument(doc);
});
```

Note this method will reset all event listeners.

#### initLog

This method can be used to initialise a log of every Vehicle Services event. This
test utility will still run in Vehicle Services and is meant for debugging.

By default, the "initLog" method will log to the console, but anything can be passed to its "targets".

```typescript
import { EvamApi } from "@evam-life/sdk";

//log to console
EvamApi["test-utils"].initLog();

//log to a custom "target"
EvamApi["test-utils"].initLog(
  (event, payload) => {
    //target
  },
  (event, payload, errors) => {
    //error target
    //if a payload fails to parse it will be logged here
  },
);
```

#### Notification

##### triggerCallback

Will trigger a primary or secondary callback sent with a notification.

```typescript
import { EvamApi, VehicleServicesNotification } from "@evam-life/sdk";

const notification: VehicleServicesNotification = {
  heading: "Notification heading",
  description: "Notification description",
  type: "ACTION_HUN",
  primaryButton: {
    label: "Notification primary button",
    callback: () => {
      //do something
    },
  },
};

const uuid = EvamApi.notification.send(notification);
//the notification callback will trigger
EvamApi["test-utils"].notification.triggerCallback(uuid, "primary");
```

## Compatibility

The EvamSDK is designed to be used in TypeScript/JavaScript environments. The EvamSDK supports both CJS and ESM.

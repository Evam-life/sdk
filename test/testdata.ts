import _ from "lodash";
import {
    DestinationControlPointLocation,
    DestinationSiteLocation,
    HospitalLocation,
    Location,
    Notification,
    NotificationType,
    Operation,
    OperationPriority,
    Patient,
    SystemHealth,
    TripLocationHistory,
    VehicleState,
    VehicleStatus
} from "../src";
import OperationState from "../src/domain/OperationState";
import {Battery, BatteryHealth, BatteryPlugged, BatteryStatus, DisplayMode} from "../src/domain";

export const vehicleStatus = {
    name: 59.3538975,
    event: 17.9721877,
    successorName: "test",
    isStartStatus: true,
    isEndStatus: true,
    categoryType: "test",
    categoryName: "test",
};

export const operation = {
    operationID: "56",
    patientName: "Test Testkort",
    operationState: OperationState.ACTIVE,
    patientUID: "900608-2381",
    callCenterId: "18",
    caseFolderId: "1",
    prio: "PRIO 1",
    vehicleStatus,
    destinationSiteLocation: {
        latitude: 59.35393,
        longitude: 17.973795,
        street: "Vretenvägen 13"
    },
    name: "Brand i bilen",
    sendTime: (new Date()).getTime() / 1000,
    createdTime: (new Date()).getTime() / 1000
};

export const operation2 = {
    operationID: "561",
    patientName: "Test",
    operationState: OperationState.AVAILABLE,
    patientUID: "900608",
    callCenterId: "18",
    caseFolderId: "1",
    prio: "PRIO 2",
    vehicleStatus,
    destinationSiteLocation: {
        latitude: 59.35393,
        longitude: 17.973795,
        street: "Vretenvägen 13"
    },
    name: "Trafikolyka",
    sendTime: (new Date()).getTime() / 1000,
    createdTime: (new Date()).getTime() / 1000,
};

export const operationList = [
    operation,
    operation2
];

export const hospitalLocation = {
    latitude: 59.3538975,
    longitude: 17.9721877,
    id: 0,
    name: "test",
    street1: "test",
    city: "test",
    region: "test",
    postalCode: "test"
};
export const operationPriority = {
    name: "test",
    id: 44,
};
export const operationWithAvailablePriorities = {
    ..._.clone(operation),
    availablePriorities: [operationPriority]
};
export const operationWithAvailableHospitals = {
    ..._.clone(operation),
    availableHospitalLocations: [hospitalLocation]
};

export const operationWithAvailableAndSelectedHospitalsAndPrios = {
    ..._.clone(operation),
    availablePriorities: [
        { id: 1, name: "PRIO 1" },
        { id: 2, name: "PRIO 2" },
        { id: 3, name: "PRIO 3" },
    ],
    selectedPriority: 1,
    availableHospitalLocations: [
        {
            id: 1,
            name: "Karolinska Universitetssjukhuset",
            latitude: 59.352602,
            longitude: 18.033239,
        },
        {
            id: 2,
            name: "Capio Sankt Görans Sjukhus",
            latitude: 59.334129,
            longitude: 18.020126,
        },
    ],
    selectedHospital: 1
}

export const destinationControlPointLocation = {
    latitude: 59.3538975,
    longitude: 17.9721877,
    name: "dpcl",
    additionalInfo: "test"
};

export const destinationSiteLocation = {
    latitude: 59.3538975,
    longitude: 17.9721877,
    street: "test",
    locality: "test",
    municipality: "test",
    routeDirections: "test",
    pickupTime: "test"
};


export const location = {
    latitude: 59.3538975,
    longitude: 17.9721877,
    timestamp: new Date(0).getTime()
};

export const tripLocationHistory = {
    locationHistory: [
        location
    ],
    etaSeconds: 0
};

export const patient = {
    name: "test",
    uid: "test",
};

export const systemHealth = {
    isHealthy: true,
    message: "test",
    timestamp: new Date(0).getTime(),
};

export const vehicleLocation = {
    latitude: 59.3538975,
    longitude: 17.9721877,
    timestamp: new Date(0).getTime()
};

export const vehicleState = {
    timestamp: new Date(0).getTime(),
    vehicleStatus,
    activeCaseFullId: "test",
    vehicleLocation,
};

export const notification: Notification = {
    heading: "test notification",
    description: "this is a test notification",
    notificationType: NotificationType.ACTION_HUN,
    primaryButton: {
        label: "Primary Button",
        callback: () => {
            console.log("Primary Button clicked on test notification");
        }
    },
    secondaryButton: {
        label: "Secondary Button",
        callback: () => {
            console.log("Secondary Button clicked on test notification");
        }
    }
};

export const settings = {test: "test"};


export const displayMode = DisplayMode.LIGHT;

export const battery = {
    health: BatteryHealth.GOOD,
    status: BatteryStatus.CHARGING,
    plugged: BatteryPlugged.AC
}

export const convertedOperation = Operation.fromJSON(operation);
export const convertedOperationList = [Operation.fromJSON(operation), Operation.fromJSON(operation2)];
export const convertedBattery = Battery.fromJSON(battery);
export const convertedVehicleState = VehicleState.fromJSON(vehicleState);
export const convertedPatient = Patient.fromJSON(patient);
export const convertedTripLocationHistory = TripLocationHistory.fromJSON(tripLocationHistory);
export const convertedLocation = Location.fromJSON(location);
export const convertedHospitalLocation = HospitalLocation.fromJSON(hospitalLocation);
export const convertedSiteLocation = DestinationSiteLocation.fromJSON(destinationSiteLocation);
export const convertedVehicleStatus = VehicleStatus.fromJSON(vehicleStatus);
export const convertedOperationPriority = OperationPriority.fromJSON(operationPriority);
export const convertedDestinationControlPointLocation = DestinationControlPointLocation.fromJSON(destinationControlPointLocation);
export const convertedOperationWithAvailablePriorities = Operation.fromJSON(operationWithAvailablePriorities);
export const convertedOperationWithAvailableHospitals = Operation.fromJSON(operationWithAvailableHospitals);
export const convertedOperationWithAvailableAndSelectedHospitalsAndPrios = Operation.fromJSON(operationWithAvailableAndSelectedHospitalsAndPrios)
export const convertedSystemHealth = SystemHealth.fromJSON(systemHealth);
export const convertedNotification = Notification.fromJSON(notification);
import _ from "lodash";
import {Operation} from "../src/domain/Operation";
import {VehicleState} from "../src/domain/VehicleState";
import {Patient} from "../src/domain/Patient";
import {TripLocationHistory} from "../src/domain/TripLocationHistory";
import {Location} from "../src/domain/Location";
import {HospitalLocation} from "../src/domain/HospitalLocation";
import {DestinationSiteLocation} from "../src/domain/DestinationSiteLocation";
import {VehicleStatus} from "../src/domain/VehicleStatus";
import {OperationPriority} from "../src/domain/OperationPriority";
import {DestinationControlPointLocation} from "../src/domain/DestinationControlPointLocation";
import {SystemHealth} from "../src/domain/SystemHealth";
import NotificationType from "../src/domain/NotificationType";
import Notification from "../src/domain/Notification";

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
    createdTime: (new Date()).getTime() / 1000,
};
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

export const notification = {
    heading: "test notification",
    description: "this is a test notification",
    notificationType: NotificationType.ACTION_HUN,
    primaryButton: {
        label: "Primary Button",
        callback: () => {
            console.log('Primary Button clicked on test notification');
        }
    },
    secondaryButton: {
        label: "Secondary Button",
        callback: () => {
            console.log('Secondary Button clicked on test notification');
        }
    }
};

export const convertedOperation = Operation.fromJSON(operation);
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
export const convertedSystemHealth = SystemHealth.fromJSON(systemHealth);
export const convertedNotification = Notification.fromJSON(notification);
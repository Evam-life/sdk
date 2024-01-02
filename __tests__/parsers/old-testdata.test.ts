import * as _ from "lodash";
import {
    batteryParser,
    destinationControlPointLocationParser,
    destinationSiteLocationParser,
    displayModeParser,
    locationParser,
    operationListParser,
    operationParser,
    tripLocationHistoryParser,
    vehicleStateParser,
    vehicleStatusParser
} from "@/data/parsers";
import {generate_InternalNotification} from "@/utils";

/**
 * The name and event types got changed because they were the wrong types in the old tests
 */
const _oldTestData_vehicleStatus = {
    name: "59.3538975",
    event: "17.9721877",
    successorName: "test",
    isStartStatus: true,
    isEndStatus: true,
    categoryType: "test",
    categoryName: "test",
};

const _oldTestData_operation = {
    operationID: "56",
    patientName: "Test Testkort",
    operationState: "ACTIVE",
    patientUID: "900608-2381",
    callCenterId: "18",
    caseFolderId: "1",
    prio: "PRIO 1",
    _oldTestData_vehicleStatus,
    destinationSiteLocation: {
        latitude: 59.35393,
        longitude: 17.973795,
        street: "Vretenvägen 13"
    },
    name: "Brand i bilen",
    sendTime: (new Date()).getTime() / 1000,
    createdTime: (new Date()).getTime() / 1000
};

const _oldTestData_operation2 = {
    operationID: "561",
    patientName: "Test",
    operationState: "AVAILABLE",
    patientUID: "900608",
    callCenterId: "18",
    caseFolderId: "1",
    prio: "PRIO 2",
    _oldTestData_vehicleStatus,
    destinationSiteLocation: {
        latitude: 59.35393,
        longitude: 17.973795,
        street: "Vretenvägen 13"
    },
    name: "Trafikolyka",
    sendTime: (new Date()).getTime() / 1000,
    createdTime: (new Date()).getTime() / 1000,
};

const _oldTestData_operationList = [
    _oldTestData_operation,
    _oldTestData_operation2
];

const _oldTestData_hospitalLocation = {
    latitude: 59.3538975,
    longitude: 17.9721877,
    id: 0,
    name: "test",
    street1: "test",
    city: "test",
    region: "test",
    postalCode: "test"
};
const _oldTestData_operationPriority = {
    name: "test",
    id: 44,
};
const _oldTestData_operationWithAvailablePriorities = {
    ..._oldTestData_operation,
    availablePriorities: [_oldTestData_operationPriority]
};
const _oldTestData_operationWithAvailableHospitals = {
    ..._.clone(_oldTestData_operation),
    availableHospitalLocations: [_oldTestData_hospitalLocation]
};

const _oldTestData_operationWithAvailableAndSelectedHospitalsAndPrios = {
    ..._.clone(_oldTestData_operation),
    availablePriorities: [
        {id: 1, name: "PRIO 1"},
        {id: 2, name: "PRIO 2"},
        {id: 3, name: "PRIO 3"},
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
};

const _oldTestData_destinationControlPointLocation = {
    latitude: 59.3538975,
    longitude: 17.9721877,
    name: "dpcl",
    additionalInfo: "test"
};

const _oldTestData_destinationSiteLocation = {
    latitude: 59.3538975,
    longitude: 17.9721877,
    street: "test",
    locality: "test",
    municipality: "test",
    routeDirections: "test",
    pickupTime: "test"
};


const _oldTestData_location = {
    latitude: 59.3538975,
    longitude: 17.9721877,
    timestamp: new Date(0).getTime()
};

const _oldTestData_tripLocationHistory = {
    locationHistory: [
        _oldTestData_location
    ],
    etaSeconds: 0
};


/**
 * These types never actually got used in the old SDK
 */
const _oldTestData_patient = {
    name: "test",
    uid: "test",
};

const _oldTestData_systemHealth = {
    isHealthy: true,
    message: "test",
    timestamp: new Date(0).getTime(),
};

const _oldTestData_vehicleLocation = {
    latitude: 59.3538975,
    longitude: 17.9721877,
    timestamp: new Date(0).getTime()
};

const _oldTestData_vehicleState = {
    timestamp: new Date(0).getTime(),
    _oldTestData_vehicleStatus,
    activeCaseFullId: "test",
    _oldTestData_vehicleLocation,
};

const _oldTestData_notification = {
    heading: "test notification",
    description: "this is a test notification",
    notificationType: "ACTION_HUN",
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
} as const;

//this is invalid now
const _oldTestData_settings = {test: "test"};


const _oldTestData_displayMode = "LIGHT";

const _oldTestData_battery = {
    health: "GOOD",
    status: "CHARGING",
    plugged: "AC"
};

describe("old test data (from old SDK tests)", () => {
    it("should still parser with the new zod parsers", () => {
        expect(() => {
            vehicleStatusParser.parse(_oldTestData_vehicleStatus);
        }).not.toThrow();
        expect(() => {
            operationParser.parse(_oldTestData_operation);
        }).not.toThrow();
        expect(() => {
            operationListParser.parse(_oldTestData_operationList);
        }).not.toThrow();
        expect(() => {
            operationParser.parse(_oldTestData_operationWithAvailablePriorities);
        }).not.toThrow();
        expect(() => {
            operationParser.parse(_oldTestData_operationWithAvailableHospitals);
        }).not.toThrow();
        expect(() => {
            operationParser.parse(_oldTestData_operationWithAvailableAndSelectedHospitalsAndPrios);
        }).not.toThrow();
        expect(() => {
            destinationControlPointLocationParser.parse(_oldTestData_destinationControlPointLocation);
        }).not.toThrow();
        expect(() => {
            destinationSiteLocationParser.parse(_oldTestData_destinationSiteLocation);
        }).not.toThrow();
        expect(() => {
            locationParser.parse(_oldTestData_location);
        }).not.toThrow();
        expect(() => {
            tripLocationHistoryParser.parse(_oldTestData_tripLocationHistory);
        }).not.toThrow();
        expect(() => {
            locationParser.parse(_oldTestData_vehicleLocation);
        }).not.toThrow();
        expect(() => {
            vehicleStateParser.parse(_oldTestData_vehicleState);
        }).not.toThrow();
        expect(() => {
            generate_InternalNotification(_oldTestData_notification);
        }).not.toThrow();
        expect(() => {
            displayModeParser.parse(_oldTestData_displayMode);
        }).not.toThrow();
        expect(() => {
            batteryParser.parse(_oldTestData_battery);
        }).not.toThrow();
    });
});
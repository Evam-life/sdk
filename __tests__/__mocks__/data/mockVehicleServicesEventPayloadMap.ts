import {VehicleServicesEventPayloadInterface} from "@/types/interfaces";
import {mockLocationPayload, mockOperationPayload} from "@/tests/__mocks__/data/index";

const mockVehicleServicesEventPayloadMap: VehicleServicesEventPayloadInterface = {
    newOrUpdatedRakelMessages: [],
    newOrUpdatedDisplayMode: "DARK",
    newOrUpdatedOperation: mockOperationPayload,
    newOrUpdatedLocation: mockLocationPayload,
    appIdSet: "",
    appVersionSet: "",
    deviceIdSet: "",
    gRPCEstablished: "",
    newOrUpdatedAvailableVehicleStatusList: [],
    newOrUpdatedBattery: {
        capacity: 0,
        health: "GOOD"
    },
    newOrUpdatedDeviceRole: "MAIN_DEVICE",
    newOrUpdatedInternetState: "NO_INTERNET",
    newOrUpdatedOperationList: [mockOperationPayload],
    newOrUpdateRakelState: {
        gssi: "",
        isHealthy: true
    },
    newOrUpdatedSettings: {},
    newOrUpdatedTripLocationHistory: {
        locationHistory: [mockLocationPayload]
    },
    newOrUpdatedVehicleState: {
        //@ts-expect-error this isn't a date when dispatced
        timestamp: 0
    },
    osVersionSet: "",
    vehicleServicesVersionSet: ""
};

export default mockVehicleServicesEventPayloadMap;
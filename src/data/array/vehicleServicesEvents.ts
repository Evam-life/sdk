import { VehicleServicesEvent } from "@/types";
import { VehicleServicesEventPayloadInterface } from "@/types/interfaces";

/**
 * The reason we declare this object like this is that now we will get
 * compile-time errors when a VehicleServiceEvent is missing from the
 * 'vehicleServicesEvents' array
 */
const obj: VehicleServicesEventPayloadInterface = {
  newOrUpdatedLocation: undefined,
  newOrUpdatedOperation: undefined,
  newOrUpdatedSettings: undefined,
  newOrUpdatedInternetState: undefined,
  newOrUpdatedDeviceRole: undefined,
  newOrUpdatedVehicleState: undefined,
  newOrUpdatedTripLocationHistory: undefined,
  newOrUpdateRakelState: undefined,
  newOrUpdatedRakelMessages: undefined,
  newOrUpdatedAvailableVehicleStatusList: undefined,
  newOrUpdatedOperationList: undefined,
  newOrUpdatedBattery: undefined,
  newOrUpdatedDisplayMode: undefined,
  vehicleServicesVersionSet: undefined,
  osVersionSet: undefined,
  appVersionSet: undefined,
  deviceIdSet: undefined,
  appIdSet: undefined,
  gRPCEstablished: undefined,
};

/**
 * An array containing all vehicle services [external] events
 */
const vehicleServicesEvents: ReadonlyArray<VehicleServicesEvent> = Object.keys(
  obj,
) as Array<VehicleServicesEvent>;

export default vehicleServicesEvents;

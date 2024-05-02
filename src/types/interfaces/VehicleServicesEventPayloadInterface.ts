import { AppId } from "@/types/vehicle-services/AppId";
import { AppSettings } from "@/types/vehicle-services/AppSettings";
import { AppVersion } from "@/types/vehicle-services/AppVersion";
import { Battery } from "@/types/vehicle-services/Battery";
import { DeviceId } from "@/types/vehicle-services/DeviceId";
import { DeviceRole } from "@/types/vehicle-services/DeviceRole";
import { DisplayMode } from "@/types/vehicle-services/DisplayMode";
import { GrpcAddress } from "@/types/vehicle-services/GrpcAddress";
import { InternetState } from "@/types/vehicle-services/InternetState";
import { Operation } from "@/types/vehicle-services/Operation";
import { OperationList } from "@/types/vehicle-services/OperationList";
import { OSVersion } from "@/types/vehicle-services/OSVersion";
import { RakelState } from "@/types/vehicle-services/RakelState";
import { TripLocationHistory } from "@/types/vehicle-services/TripLocationHistory";
import { VehicleServicesVersion } from "@/types/vehicle-services/VehicleServicesVersion";
import { VehicleState } from "@/types/vehicle-services/VehicleState";
import { VehicleStatusList } from "@/types/vehicle-services/VehicleStatusList";
import { Location } from "@/types/vehicle-services/Location";
import { RakelMessages } from "@/types/vehicle-services/RakelMessages";
import { PhoneCall } from "@/types/vehicle-services/PhoneCall";
import { MuteState } from "@/types/vehicle-services/MuteState";

/**
 * An interface which maps a VehicleServicesEvent to its payload parser.
 * This is for compile-time typechecking.
 */
export interface VehicleServicesEventPayloadInterface {
  /**
   * Event which will often trigger with the current location of the vehicle.
   * @see Location
   */
  newOrUpdatedLocation: Location | undefined;
  /**
   * Event which will trigger when the state of the operation changes.
   * @example the operation closes
   * @example the case info updates
   * @example the active operation is 50506closed and this payload will be undefined
   * @see Operation
   */
  newOrUpdatedOperation: Operation | undefined;
  /**
   * Event which will trigger passing the settings fetched from the backend.
   */
  newOrUpdatedSettings: AppSettings | undefined;
  /**
   * Event which will trigger when the internet connection state changes.
   * @example connection to Wi-Fi
   * @example loss of connection
   * @see InternetState
   */
  newOrUpdatedInternetState: InternetState | undefined;
  /**
   * Event which will trigger with the device's role as the payload.
   * @example SINGLE_DEVICE, RECEIVING_DEVICE
   * @see DeviceRole
   */
  newOrUpdatedDeviceRoles: DeviceRole | undefined;
  /**
   * The "VehicleState" will update with new information regarding the status of the vehicle as well as the current location and the current active case Id.
   * @see VehicleStatus
   */
  newOrUpdatedVehicleState: VehicleState | undefined;
  /**
   * Event which triggers when the state of the trip location history updates.
   * @example when the current location updates
   */
  newOrUpdatedTripLocationHistory: TripLocationHistory | undefined;
  /**
   * Event which triggers when the state of the Rakel system changes.
   * @example the tablet is disconnected from the radio.
   */
  newOrUpdateRakelState: RakelState | undefined;
  /**
   * Event which triggers when new rakel messages are received from the radio.
   */
  newOrUpdatedRakelMessages: RakelMessages | undefined;
  /**
   * Event which triggers initially
   */
  newOrUpdatedAvailableVehicleStatusList: VehicleStatusList | undefined;
  /**
   * Event which triggers when the state of the list of operations change.
   * @example when a case closes or a new case appear.
   */
  newOrUpdatedOperationList: OperationList | undefined;
  /**
   * Event which triggers when the state of the battery is updated.
   * @example when the battery's level depletes.
   */
  newOrUpdatedBattery: Battery | undefined;
  /**
   * Event which triggers when the display mode in the app updates.
   * This will occur when the user manually changes the display mode OR
   * when Vehicle Services display mode is set to 'auto' from the system.
   */
  newOrUpdatedDisplayMode: DisplayMode | undefined;
  /**
   * Event which triggers once with the Vehicle Services version
   */
  vehicleServicesVersionSet: VehicleServicesVersion | undefined;
  /**
   * Event which triggers once with the Android OS version
   */
  osVersionSet: OSVersion | undefined;
  /**
   * Event which triggers once with the version of your certified application.
   */
  appVersionSet: AppVersion | undefined;
  /**
   * Event which triggers once with the ID of the device
   */
  deviceIdSet: DeviceId | undefined;
  /**
   * Event which triggers once with the ID of the application
   */
  appIdSet: AppId | undefined;
  /**
   * Event which wil trigger with the gRPC address when the gRPC server has been established.
   */
  gRPCEstablished: GrpcAddress | undefined;
  /**
   * Used to assign a callback when the phone calls are updated.
   * @requires Permissions TELEPHONY
   * @preview This function is currently available in the Development Environment only.
   * @param callback The callback with (optional) argument array of {@link PhoneCall}. Use this to access the current phone calls.
   */
  newOrUpdatedCalls: Array<PhoneCall> | undefined;
  /**
   * Used to assign a callback when the device's microphone mute state is updated.
   * @requires Permissions TELEPHONY
   * @preview This function is currently available in the Development Environment only.
   * @param callback The callback with (optional) argument boolean. Use this to access the current microphone mute state.
   */
  newOrUpdatedMuteState: MuteState | undefined;
}

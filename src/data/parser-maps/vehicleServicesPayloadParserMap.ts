import { ZodSchema } from "zod";
import { VehicleServicesEvent } from "@/types";

import {
  appIdParser,
  appSettingsParser,
  appVersionParser,
  batteryParser,
  deviceIdParser,
  deviceRoleParser,
  displayModeParser,
  grpcAddressParser,
  internetStateParser,
  locationParser,
  operationListParser,
  operationParser,
  osVersionParser,
  rakelMessagesParser,
  rakelStateParser,
  tripLocationHistoryParser,
  vehicleServicesVersionParser,
  vehicleStateParser,
  vehicleStatusListParser,
} from "@/data/parsers";

/**
 * An object which maps a VehicleServicesEvent to its payload parser.
 * This is for runtime data validation.
 */
const vehicleServicesPayloadParserMap = new Map<
  VehicleServicesEvent,
  ZodSchema
>([
  ["newOrUpdatedRakelMessages", rakelMessagesParser.optional()],
  ["newOrUpdatedLocation", locationParser.optional()],
  ["newOrUpdatedOperation", operationParser.optional()],
  ["newOrUpdatedSettings", appSettingsParser.optional()],
  ["newOrUpdatedInternetState", internetStateParser.optional()],
  ["newOrUpdatedDeviceRole", deviceRoleParser.optional()],
  ["newOrUpdatedVehicleState", vehicleStateParser.optional()],
  ["newOrUpdatedTripLocationHistory", tripLocationHistoryParser.optional()],
  ["newOrUpdateRakelState", rakelStateParser.optional()],
  [
    "newOrUpdatedAvailableVehicleStatusList",
    vehicleStatusListParser.optional(),
  ],
  ["newOrUpdatedOperationList", operationListParser.optional()],
  ["newOrUpdatedBattery", batteryParser.optional()],
  ["newOrUpdatedDisplayMode", displayModeParser.optional()],
  ["vehicleServicesVersionSet", vehicleServicesVersionParser.optional()],
  ["osVersionSet", osVersionParser.optional()],
  ["appVersionSet", appVersionParser.optional()],
  ["deviceIdSet", deviceIdParser.optional()],
  ["appIdSet", appIdParser.optional()],
  ["gRPCEstablished", grpcAddressParser.optional()],
]);

export default vehicleServicesPayloadParserMap;

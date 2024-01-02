import { z } from "zod";
import { VehicleServicesCallbackIdSuffix } from "@/types";

const isValidNotificationCallbackSuffix = (
  suffix: string,
): suffix is VehicleServicesCallbackIdSuffix =>
  z.literal("-p").or(z.literal("-s")).safeParse(suffix).success;

export default isValidNotificationCallbackSuffix;

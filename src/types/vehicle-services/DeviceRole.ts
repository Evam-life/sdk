import { z } from "zod";
import deviceRoleParser from "@/data/parsers/vehicle-services/deviceRoleParser";

/**
 * Role of the Vehicle Services application.
 */
export type DeviceRole = z.infer<typeof deviceRoleParser>;

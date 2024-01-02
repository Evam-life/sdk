import * as z from "zod";
import deviceRoles from "@/data/parsers/vehicle-services/deviceRoles";

const deviceRoleParser = z.enum(deviceRoles);

export default deviceRoleParser;

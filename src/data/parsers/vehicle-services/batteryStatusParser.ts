import * as z from "zod";
import { batteryStatuses } from "@/data/enum";

const batteryStatusParser = z.enum(batteryStatuses);
export default batteryStatusParser;

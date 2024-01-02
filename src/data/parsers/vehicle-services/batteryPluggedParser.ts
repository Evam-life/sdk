import * as z from "zod";
import { batteryPluggedStates } from "@/data/enum";

const batteryPluggedParser = z.enum(batteryPluggedStates);
export default batteryPluggedParser;

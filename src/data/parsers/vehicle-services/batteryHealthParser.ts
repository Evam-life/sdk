import * as z from "zod";
import batteryHealths from "@/data/enum/batteryHealths";

const batteryHealthParser = z.enum(batteryHealths);

export default batteryHealthParser;

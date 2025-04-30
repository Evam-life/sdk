import callSignParser from "@/data/parsers/vehicle-services/callSignParser";
import { z } from "zod";

export type CallSign = z.infer<typeof callSignParser>;

import { z } from "zod";
import { callStates, disconnectCauses } from "@/data/enum";

const phoneCallParser = z.object({
  callId: z.string(),
  callNumber: z.string(),
  callState: z.enum(callStates).default("UNKNOWN"),
  disconnectCause: z.enum(disconnectCauses).default("UNKNOWN"),
});
export default phoneCallParser;

import { z } from "zod";
import { phoneCallStates, disconnectCauses } from "@/data/enum";

const phoneCallParser = z.object({
  callId: z.string(),
  callNumber: z.string(),
  callState: z.enum(phoneCallStates).default("UNKNOWN"),
  disconnectCause: z.enum(disconnectCauses).default("UNKNOWN"),
});
export default phoneCallParser;

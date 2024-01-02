import * as z from "zod";
import { rakelMessagesParser } from "@/data/parsers";

/**
 * Messages from the connected Rakel radio
 */
type RakelMessages = z.infer<typeof rakelMessagesParser>;

export type { RakelMessages };

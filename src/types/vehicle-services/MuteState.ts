import { z } from "zod";
import { muteStateParser } from "@/data/parsers";

export type MuteState = z.infer<typeof muteStateParser>;

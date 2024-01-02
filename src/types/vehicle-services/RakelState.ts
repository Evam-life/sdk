import * as z from "zod";
import { rakelStateParser } from "@/data/parsers";

/**
 * General information about the current Rakel radio state
 * @property issi The radio ISSI
 * @property msisdn The radio MSISDN
 * @property gssi The radio GSSI
 */
type RakelState = z.infer<typeof rakelStateParser>;

export type { RakelState };

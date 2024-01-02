import { z } from "zod";
import { displayModeParser } from "@/data/parsers";

/**
 * The display mode (either light or dark).
 */
type DisplayMode = z.infer<typeof displayModeParser>;

export type { DisplayMode };

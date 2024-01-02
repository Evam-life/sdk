import { internetStates } from "@/data/enum";
import { z } from "zod";

const internetStateParser = z.enum(internetStates);

/**
 * Represent the state of the internet connection
 */
type InternetState = z.infer<typeof internetStateParser>;

export type { InternetState };

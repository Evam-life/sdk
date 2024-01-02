import { z } from "zod";
import { operationStateParser } from "@/data/parsers";

/**
 * Represents the current state of an Operation.
 */
export type OperationState = z.infer<typeof operationStateParser>;

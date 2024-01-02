import { z } from "zod";
import { operationPriorityParser } from "@/data/parsers";

/**
 * Selectable operation priority
 * @property id id of the priority
 * @property name name of the priority
 */
export type OperationPriority = z.infer<typeof operationPriorityParser>;

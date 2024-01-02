import type { Operation } from "@/types/vehicle-services/Operation";

/**
 * The Operation List represents all the currently stored operations in Vehicle Services.
 * The Operation List may contain operations which are "ACTIVE", "AVAILABLE", "COMPLETE".
 */
export type OperationList = Array<Operation>;

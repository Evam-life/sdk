import { z } from "zod";
import { operationUnitParser } from "@/data/parsers";

export type OperationUnit = z.infer<typeof operationUnitParser>;

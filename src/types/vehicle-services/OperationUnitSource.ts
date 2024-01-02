import { z } from "zod";
import { operationUnitSourceParser } from "@/data/parsers";

export type OperationUnitSource = z.infer<typeof operationUnitSourceParser>;

import { z } from "zod";
import { operationStates } from "@/data/enum";

const operationStateParser = z.enum(operationStates);
export default operationStateParser;

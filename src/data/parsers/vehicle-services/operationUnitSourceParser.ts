import { z } from "zod";
import operationUnitSources from "@/data/enum/operationUnitSources";

const operationUnitSourceParser = z.enum(operationUnitSources);
export default operationUnitSourceParser;

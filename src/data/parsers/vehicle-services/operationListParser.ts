import * as z from "zod";
import operationParser from "@/data/parsers/vehicle-services/operationParser";

const operationListParser = z.array(operationParser);

export default operationListParser;

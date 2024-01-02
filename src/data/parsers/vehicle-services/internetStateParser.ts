import * as z from "zod";
import { internetStates } from "@/data/enum";

const internetStateParser = z.enum(internetStates);

export default internetStateParser;

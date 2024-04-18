import {z} from "zod";
import phoneCallParser from "./phoneCallParser";

const phoneCallListParser = z.array(phoneCallParser)
export default phoneCallListParser
import * as z from "zod";
import { displayModes } from "@/data/enum";

const displayModeParser = z.enum(displayModes);

export default displayModeParser;

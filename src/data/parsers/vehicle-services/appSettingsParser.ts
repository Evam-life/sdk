import { z } from "zod";

const appSettingsParser = z.record(z.string(), z.unknown());
export default appSettingsParser;

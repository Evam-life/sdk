import {z} from "zod";
import {phoneCallParser} from "@/data/parsers";

export type PhoneCall = z.infer<typeof phoneCallParser>
import * as z from "zod";
import { hospitalLocationParser } from "@/data/parsers";

/**
 * Location of a hospital
 * @property {number} id Hospital unique ID
 * @property {number} latitude the latitude of hospital location
 * @property {number} longitude the longitude of hospital location
 * @property {string | undefined} name the name of hospital
 * @property {string | undefined} street1 the street address of hospital
 * @property {string | undefined} city the city in which hospital is located
 * @property {string | undefined} region the region in which hospital is located
 * @property {string | undefined} postalCode the postal code of hospital
 */
export type HospitalLocation = z.infer<typeof hospitalLocationParser>;

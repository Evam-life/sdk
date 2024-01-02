import * as z from "zod";
import { locationParser } from "@/data/parsers";

/**
 * Represents a location on the map at a specific point in time.
 * @typedef {Object} Location
 * @property {number} latitude - The latitude coordinate.
 * @property {number} longitude - The longitude coordinate.
 * @property {Date | undefined} timestamp - The timestamp the given location was received.
 */

export type Location = z.infer<typeof locationParser>;

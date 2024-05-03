import * as z from "zod";
import { locationParser } from "@/data/parsers";

/**
 * Represents a location on the map at a specific point in time.
 * @typedef {Object} Location
 * @property {number} latitude - The latitude coordinate.
 * @property {number} longitude - The longitude coordinate.
 * @property {number} bearing - The bearing at the time of this location in degrees.
 * @property {number} speed - The speed at the time of this location in meters per second
 * @property {Date | undefined} timestamp - The timestamp the given location was received.
 */

export type Location = z.infer<typeof locationParser>;

import * as z from "zod";
import { tripLocationHistoryParser } from "@/data/parsers";

/**
 * The history of locations for a given operation.
 * @property {Array<Location>} locationHistory an array of locations representing the trip
 * @property {number | undefined} etaSeconds the estimated time of arrival in the operation destination
 * @property {number | undefined} distanceToDestinationMeters the distance from the operation destination.
 */
type TripLocationHistory = z.infer<typeof tripLocationHistoryParser>;

export type { TripLocationHistory };

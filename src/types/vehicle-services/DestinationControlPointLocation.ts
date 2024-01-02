import * as z from "zod";
import { destinationControlPointLocationParser } from "@/data/parsers";

/**
 * Location of a breakpoint
 * @param latitude Latitude in decimal degrees
 * @param longitude Longitude in decimal degrees
 * @param name Breakpoint name if available
 * @param additionalInfo Additional information if available
 */
export type DestinationControlPointLocation = z.infer<
  typeof destinationControlPointLocationParser
>;

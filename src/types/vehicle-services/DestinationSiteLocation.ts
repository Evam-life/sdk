import { z } from "zod";
import destinationSiteLocationParser from "@/data/parsers/vehicle-services/destinationSiteLocationParser";

/**
 * Location of a destination site
 * @param latitude Latitude in decimal degrees
 * @param longitude Longitude in decimal degrees
 * @param street The street name if available
 * @param locality The locality name if available
 * @param municipality The municipality name if available
 * @param routeDirections The route directions text if available
 * @param pickupTime The pickup time text if available
 */
export type DestinationSiteLocation = z.infer<
  typeof destinationSiteLocationParser
>;

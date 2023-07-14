/* istanbul ignore next */
class DestinationSiteLocation {
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
    constructor(
        public latitude: Number,
        public longitude: Number,
        public street: String | undefined,
        public locality: String | undefined,
        public municipality: String | undefined,
        public routeDirections: String | undefined,
        public pickupTime: String | undefined
    ) { }

    /**
     * Create from JSON
     * @param loc JSON object
     */
    static fromJSON(loc: any): DestinationSiteLocation {
        return new DestinationSiteLocation(
            loc.latitude,
            loc.longitude,
            loc.street,
            loc.locality,
            loc.municipality,
            loc.routeDirections,
            loc.pickupTime
        )
    }
}

export {DestinationSiteLocation}
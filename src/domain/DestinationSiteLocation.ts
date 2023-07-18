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
        public latitude: number,
        public longitude: number,
        public street: string | undefined,
        public locality: string | undefined,
        public municipality: string | undefined,
        public routeDirections: string | undefined,
        public pickupTime: string | undefined
    ) { }

    /**
     * Create from JSON
     * @param loc JSON object
     */
    static fromJSON(loc: any): DestinationSiteLocation {
        if (loc.latitude === undefined || loc.longitude === undefined){
            throw Error('latitude and longitude must be defined for DestinationSiteLocation')
        }
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
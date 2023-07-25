
class Location {
    /**
     * Location on a map
     * @param latitude latitude coordinate of the location
     * @param longitude longitude coordinate of the location
     * @param timestamp time the location was provided
     */
    constructor(
        public latitude: number,
        public longitude: number,
        public timestamp: Date | undefined
    ) {
    }

    /**
     * Create from JSON
     * @param loc JSON object
     */
    static fromJSON(loc: any) {
        if (loc.latitude === undefined || loc.longitude === undefined) {
            throw Error("Longitude and latitude must be declared for Location object.");
        }
        return new Location(
            loc.latitude,
            loc.longitude,
            loc.timestamp !== undefined ? new Date(loc.timestamp) : undefined
        );
    }
}



export {Location};
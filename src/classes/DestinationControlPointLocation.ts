class DestinationControlPointLocation {
    /**
     * Location of a breakpoint
     * @param latitude Latitude in decimal degrees
     * @param longitude Longitude in decimal degrees
     * @param name Breakpoint name if available
     * @param additionalInfo Additional information if available
     */
    constructor(
        public latitude: Number,
        public longitude: Number,
        public name: String | undefined,
        public additionalInfo: String | undefined
    ) {
    }

    /**
     * Create from JSON
     * @param loc JSON object
     */
    static fromJSON(loc: any): DestinationControlPointLocation {
        return new DestinationControlPointLocation(
            loc.latitude,
            loc.longitude,
            loc.name,
            loc.additionalInfo
        )
    }
}

export {DestinationControlPointLocation}
class DestinationControlPointLocation {
    /**
     * Location of a breakpoint
     * @param latitude Latitude in decimal degrees
     * @param longitude Longitude in decimal degrees
     * @param name Breakpoint name if available
     * @param additionalInfo Additional information if available
     */
    constructor(
        public latitude: number,
        public longitude: number,
        public name: string | undefined,
        public additionalInfo: string | undefined
    ) {
    }

    /**
     * Create from JSON
     * @param loc JSON object
     */
    static fromJSON(loc: any): DestinationControlPointLocation {
        if (loc.latitude === undefined || loc.longitude === undefined){
            throw Error('latitude and longitude must be defined for DestinationControlPointLocation')
        }
        return new DestinationControlPointLocation(
            loc.latitude,
            loc.longitude,
            loc.name,
            loc.additionalInfo
        )
    }
}

export {DestinationControlPointLocation}
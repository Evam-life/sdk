/**
 * data class LeavePatientLocation(
 *     override val locationType: LocationType = LocationType.LeavePatientSite,
 *     override val locationId: String,
 *     override val latitude: Double,
 *     override val longitude: Double,
 *     override val street: String?,
 *     override val locality: String?,
 *     override val municipality: String?,
 *     override val routeDirections: String?,
 *     val leaveTime: LocalDateTime?,
 * )
 */

/* istanbul ignore next */
class LeavePatientLocation {
    /**
     * Location of a leave patient location
     * @param locationId the identifier that the given location is represented by
     * @param latitude Latitude in decimal degrees
     * @param longitude Longitude in decimal degrees
     * @param street The street name if available
     * @param locality The locality name if available
     * @param municipality The municipality name if available
     * @param routeDirections The route directions text if available
     * @param pickupTime The pickup time text if available
     * @param leaveTime the leave time of the patient
     */
    constructor(
        public locationId: string,
        public latitude: number,
        public longitude: number,
        public street: string | undefined,
        public locality: string | undefined,
        public municipality: string | undefined,
        public routeDirections: string | undefined,
        public pickupTime: string | undefined,
        public leaveTime: string | undefined
    ) {
    }

    /**
     * Create from JSON
     * @param loc JSON object
     */
    static fromJSON(loc: any): LeavePatientLocation {
        if (loc.latitude === undefined || loc.longitude === undefined || loc.locationId === undefined) {
            throw Error("latitude, longitude, locationId must be defined for DestinationSiteLocation");
        }
        return new LeavePatientLocation(
            loc.locationId,
            loc.latitude,
            loc.longitude,
            loc.street,
            loc.locality,
            loc.municipality,
            loc.routeDirections,
            loc.pickupTime,
            loc.leaveTime
        );
    }
}

export {LeavePatientLocation};
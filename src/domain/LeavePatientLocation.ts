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
     * @param latitude Latitude in decimal degrees
     * @param longitude Longitude in decimal degrees
     * @param street The street name if available
     * @param locality The locality name if available
     * @param municipality The municipality name if available
     * @param routeDirections The route directions text if available
     * @param leaveTime the leave time of the patient
     */
    constructor(
        public latitude: number,
        public longitude: number,
        public street: string | undefined,
        public locality: string | undefined,
        public municipality: string | undefined,
        public routeDirections: string | undefined,
        public leaveTime: string | undefined
    ) {
    }

    /**
     * Create from JSON
     * @param loc JSON object
     */
    static fromJSON(loc: any): LeavePatientLocation {
        if (loc.latitude === undefined || loc.longitude === undefined) {
            throw Error("latitude, longitude must be defined for DestinationSiteLocation");
        }
        return new LeavePatientLocation(
            loc.latitude,
            loc.longitude,
            loc.street,
            loc.locality,
            loc.municipality,
            loc.routeDirections,
            loc.leaveTime
        );
    }
}

export {LeavePatientLocation};
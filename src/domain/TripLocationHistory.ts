import {Location} from "./Location";


class TripLocationHistory {
    /**
     * An array of locations represents the history of the trip
     * @param locationHistory location array
     * @param etaSeconds 'estimated time of arrival' in seconds
     * @param distanceToDestinationMeters Remaining driving distance until destination in meters (PREVIEW)
     */
    constructor(
        public locationHistory: Array<Location>,
        public etaSeconds: number | undefined,
        public distanceToDestinationMeters: number | undefined
    ) {
    }


    /**
     * Create from JSON
     * @param tripLocationHistory JSON object
     */
    static fromJSON(tripLocationHistory: any) {
        if (tripLocationHistory.locationHistory === undefined) {
            throw Error("TripLocationHistory must define locationHistory");
        }
        const {locationHistory} = tripLocationHistory;
        if (Array.isArray(locationHistory)) {
            const locationHistoryMapped: Array<Location> = locationHistory.map<Location>(Location.fromJSON);
            return new TripLocationHistory(
                locationHistoryMapped,
                tripLocationHistory.etaSeconds,
                tripLocationHistory.distanceToDestinationMeters
            );
        } else {
            throw Error("TripLocationHistory.locationHistory must be an array");
        }
    }
}

export {TripLocationHistory};
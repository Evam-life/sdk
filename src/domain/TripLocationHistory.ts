import {Location} from "./Location";


class TripLocationHistory {
    /**
     * An array of locations represents the history of the trip
     * @param locationHistory location array
     * @param etaSeconds 'estimated time of arrival' in seconds
     */
    constructor(
        public locationHistory: Array<Location>,
        public etaSeconds: number | undefined
    ) {
    }


    /**
     * Create from JSON
     * @param tripLocationHistory JSON object
     */
    static fromJSON(tripLocationHistory: any) {
        if (tripLocationHistory.locationHistory === undefined) {
            throw Error('TripLocationHistory must define locationHistory')
        }
        return new TripLocationHistory(
            tripLocationHistory.locationHistory,
            tripLocationHistory.etaSeconds
        );
    }
}

export {TripLocationHistory}
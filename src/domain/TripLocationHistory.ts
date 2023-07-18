import {Location} from "./Location";

class TripLocationHistory {
    constructor(
        public locationHistory: Array<Location>,
        public etaSeconds: number | undefined
    ) {
    }

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
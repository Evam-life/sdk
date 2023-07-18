import {timestamp} from "rxjs";

class Location {
    constructor(
        public latitude: number,
        public longitude: number,
        public timestamp: Date | undefined
    ) {
    }

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

export {Location, TripLocationHistory};
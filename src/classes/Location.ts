
class Location {
    constructor(
        public latitude: Number,
        public longitude: Number,
        public timestamp: Date | undefined
    ) {
    }

    static fromJSON(loc:any){
        return new Location(
            loc.latitude,
            loc.longitude,
            loc.timestamp
        )
    }
    }

class TripLocationHistory {
    constructor(
        public locationHistory: Array<Location>,
        public etaSeconds: number | undefined
    ) {
    }

    static fromJSON(tripLocationHistory:any){
        return new TripLocationHistory(
            tripLocationHistory.locationHistory,
            tripLocationHistory.etaSeconds
        )
    }
}

export {Location, TripLocationHistory};
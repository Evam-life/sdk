import {Location} from "@/types";
import {tripLocationHistoryParser} from "@/data/parsers";

describe("tripLocationHistoryParser", () => {
    const validTripLocationHistoryObject1 = {
        locationHistory: []
    };

    const loc: Location = {
        latitude: 0,
        longitude: 0
    };
    const validTripLocationHistoryObject2 = {
        locationHistory: [loc]
    };

    it("should only require a locationHistory array", () => {
        expect(() => tripLocationHistoryParser.parse(validTripLocationHistoryObject1)).not.toThrow();
        expect(() => tripLocationHistoryParser.parse(validTripLocationHistoryObject2)).not.toThrow();
    });

    it("should parse when given a value for etaSeconds and/or distanceToDestinationMeters", () => {
        const locationWithEtaSeconds = {
            etaSeconds: 0,
            ...validTripLocationHistoryObject1
        };
        const locationWithDistanceToDestinationMeters = {
            distanceToDestinationMeters: 0,
            ...validTripLocationHistoryObject1
        };
        const locationWithBothEtaSecondsAndDistanceToMeters = {
            ...locationWithEtaSeconds,
            ...locationWithDistanceToDestinationMeters
        };
        expect(() => {
            tripLocationHistoryParser.parse(locationWithEtaSeconds);
        }).not.toThrow();
        expect(() => {
            tripLocationHistoryParser.parse(locationWithDistanceToDestinationMeters);
        }).not.toThrow();
        expect(() => {
            tripLocationHistoryParser.parse(locationWithBothEtaSecondsAndDistanceToMeters);
        }).not.toThrow();
    });
});
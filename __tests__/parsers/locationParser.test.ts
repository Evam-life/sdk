import {faker} from "@faker-js/faker";
import {locationParser} from "@/data/parsers";

describe("locationParser", () => {

    const erroneousLocation1 = {
        latitude: 0
    };

    const erroneousLocation2 = {
        longitude: 0
    };

    const validLocation1 = {
        latitude: 0,
        longitude: 0
    };

    const validLocation2 = {
        latitude: 0,
        longitude: 0,
        timestamp: 0
    };

    it("should throw an error if latitude or longitude is missing", () => {
        expect(() => {
            locationParser.parse(erroneousLocation1);
        }).toThrow();
        expect(() => {
            locationParser.parse(erroneousLocation2);
        }).toThrow();
    });

    it("should parse without error if latitude and longitude are present", () => {
        expect(() => {
            locationParser.parse(validLocation1);
        }).not.toThrow();
    });

    it("should convert timestamp to a date from string", () => {
        const parse = locationParser.parse(validLocation2);
        expect(parse.timestamp).toEqual(new Date(validLocation2.timestamp));
    });


});
import {hospitalLocationParser} from "@/data/parsers";

describe("hospitalLocationParserTest", () => {

    const validHospitalLocation = {
        id: 0,
        latitude: 0,
        longitude: 0
    } as const;

    it("should parse an object with \"id\", \"latitude\" and \"longitude\" defined", () => {
        expect(() => {
            hospitalLocationParser.parse(validHospitalLocation);
        }).not.toThrowError();
    });

    it("should throw an error if 'id' is missing", () => {
        const locationWithoutId = {...validHospitalLocation, id: undefined};
        expect(() => {
            hospitalLocationParser.parse(locationWithoutId);
        }).toThrowError("id");
    });

    it("should throw an error if 'latitude' is missing", () => {
        const locationWithoutLatitude = {...validHospitalLocation, latitude: undefined};
        expect(() => {
            hospitalLocationParser.parse(locationWithoutLatitude);
        }).toThrowError("latitude");
    });

    it("should throw an error if 'longitude' is missing", () => {
        const locationWithoutLongitude = {...validHospitalLocation, longitude: undefined};
        expect(() => {
            hospitalLocationParser.parse(locationWithoutLongitude);
        }).toThrowError("longitude");
    });


    it("should throw an error if 'id' has an invalid type", () => {
        const invalidHospitalLocation = {
            ...validHospitalLocation,
            id: "invalidType",
        };
        expect(() => {
            hospitalLocationParser.parse(invalidHospitalLocation);
        }).toThrowError("id");
    });
});
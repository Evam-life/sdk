import {vehicleServicesEvents} from "@/data/array";
import {mockVehicleServicesEventPayloadMap} from "@/tests/__mocks__/data";
import vehicleServicesPayloadParserMap from "@/data/parser-maps/vehicleServicesPayloadParserMap";

describe("all parsers", () => {

    //this tests that we can use the test-utils "inject"
    it("should be able to parse already parsed data", () => {
        expect(vehicleServicesEvents.length).toEqual(Object.keys(mockVehicleServicesEventPayloadMap).length);
        expect(() => {
            vehicleServicesEvents.forEach(evt => {
                const payload = mockVehicleServicesEventPayloadMap[evt];
                expect(payload).not.toBeUndefined();
                const parser = vehicleServicesPayloadParserMap.get(evt);
                expect(parser).not.toBeUndefined();

                // @ts-expect-error the expect enough covers undefined checking
                const parseResult1 = parser.parse(payload);
                // @ts-expect-error the expect enough covers undefined checking
                parser.parse(parseResult1);
            });
        }).not.toThrow();
    });
});
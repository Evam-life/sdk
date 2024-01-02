import {vehicleServicesParserMap} from "@/data/parser-maps";
import {vehicleServicesEvents} from "@/data/array";

describe("vehicleServicesEvents array", () => {
    it("should be equal length to the vehicleServicesParserMap", () => {
        //note this doesn't mean we've added all vehicle services events to the map
        //this test should be combined with linting making sure the object passed to Object.keys (which produces the vehicleServicesEvents array)
        //doesn't throw an error at compile time
        expect(vehicleServicesParserMap.size).toEqual(vehicleServicesEvents.length);
        vehicleServicesEvents.forEach(evt => {
            expect(vehicleServicesParserMap.get(evt)).not.toBeUndefined();
        });
    });
});
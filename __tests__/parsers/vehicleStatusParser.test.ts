import {VehicleStatus} from "@/types";
import {omit} from "lodash";
import {vehicleStatusListParser, vehicleStatusParser} from "@/data/parsers";

describe("vehicleStatusParser", () => {

    const validVehicleStatus1 = {
        name: "",
        event: undefined,
        successorName: undefined,
        isStartStatus: false,
        isEndStatus: false,
        categoryType: "",
        categoryName: ""
    };

    it("should parse fine if \"event\" and \"successorName\" are undefined but not \"name\", \"isStartStatus\", \"isEndStatus\", \"categoryType\" and \"categoryName\"", () => {
        expect(() => {
            vehicleStatusParser.parse(validVehicleStatus1);
        }).not.toThrow();
    });

    it("should throw error if \"name\", \"isStartStatus\", \"isEndStatus\", \"categoryType\" or \"categoryName\" are not present", () => {
        const keysToEmit: Array<keyof VehicleStatus> = ["name", "isStartStatus", "categoryName", "categoryName", "isEndStatus"];
        keysToEmit.forEach((key) => {
            expect(() => {
                vehicleStatusListParser.parse(omit(validVehicleStatus1, key));
            }).toThrow();
        });
    });

});

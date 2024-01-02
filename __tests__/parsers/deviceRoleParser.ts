import {deviceRoleParser, deviceRoles} from "@/data/parsers";

describe("deviceRoleParser", () => {
    it("should parse device roles", () => {
        expect(() => {
            deviceRoles.forEach(deviceRole => {
                deviceRoleParser.parse(deviceRole);
            });
        }).not.toThrow();
    });
});
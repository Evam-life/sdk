import {rakelStateParser} from "@/data/parsers";

describe("rakelStateParser", () => {

    it("should parse with any combination of present keys", () => {
        const allCombinations = [
            {msisdn: ""},
            {issi: ""},
            {gssi: ""},
            {msisdn: "", issi: ""},
            {msisdn: "", gssi: ""},
            {issi: "", gssi: ""},
            {msisdn: "", issi: "", gssi: ""},
        ];
        allCombinations.forEach((combination) => {
            expect(() => {
                rakelStateParser.parse({
                    ...combination,
                    isHealthy: true
                });
            }).not.toThrow();
        });
    });
});
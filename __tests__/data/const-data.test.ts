import {IS_RUNNING_IN_VS} from "@/data/const";

describe("IS_RUNNING_IN_VS", () => {
    it("should be false inside jest env", () => {
        expect(IS_RUNNING_IN_VS).toEqual(false);
    });
});
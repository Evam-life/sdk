import {EvamApi} from "@/api";
import AndroidHandler from "@/api/AndroidHandler";

describe("AndroidHandler", () => {
    it("should call 'nonVsEnvironmentCallback' callback when not inside Vehicle Services", () => {
        expect(EvamApi.isRunningInVehicleServices).toBe(false);
        const fn = jest.fn();
        expect(fn).not.toHaveBeenCalled();
        AndroidHandler.call("apiReady", [], {
            nonVsEnvironmentCallback: fn
        });
        expect(fn).toHaveBeenCalled();
    });
});
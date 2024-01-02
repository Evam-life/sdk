import mockVehicleServicesNotification from "@/tests/__mocks__/data/mockVehicleServicesNotification";
import {generate_InternalNotification, splitCallbackIdSuffix} from "@/utils";

describe("generate_InternalNotification", () => {

    it("should parse a regular notification", () => {
        expect(() => {
            generate_InternalNotification(mockVehicleServicesNotification);
        }).not.toThrow();
    });

    it("should share a common id prefix for primary and secondary notifications", () => {
        const {_internalNotification, id} = generate_InternalNotification(mockVehicleServicesNotification);
        const [sharedId0] = splitCallbackIdSuffix(_internalNotification.primaryButton.callback);
        expect(_internalNotification.secondaryButton).not.toBeUndefined();
        const [sharedId1] = splitCallbackIdSuffix(_internalNotification.secondaryButton!.callback);
        expect(id).toEqual(sharedId0);
        expect(id).toEqual(sharedId1);
    });
});

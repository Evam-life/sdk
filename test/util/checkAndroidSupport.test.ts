import checkAndroidSupport from "../../src/util/checkAndroidSupport";

// jsdom provides `window` but no native `Android` bridge, so each test polyfills
// (or omits) window.Android to mock the host Vehicle Services environment.
type WindowWithAndroid = Window & typeof globalThis & { Android?: unknown };

const androidWindow = window as WindowWithAndroid;

describe("checkAndroidSupport", () => {

    afterEach(() => {
        delete androidWindow.Android;
    });

    it("should return true for broadcastPost when the Android bridge exposes it", () => {
        androidWindow.Android = {broadcastPost: jest.fn()};
        expect(checkAndroidSupport("broadcastPost")).toBe(true);
    });

    it("should return false for broadcastPost when the Android bridge is absent", () => {
        expect("Android" in window).toBe(false);
        expect(checkAndroidSupport("broadcastPost")).toBe(false);
    });

    it("should return false for broadcastPost when the Android bridge lacks the method", () => {
        androidWindow.Android = {setItem: jest.fn()};
        expect(checkAndroidSupport("broadcastPost")).toBe(false);
    });

    it("should return false when the Android bridge is null", () => {
        androidWindow.Android = null;
        expect(checkAndroidSupport("broadcastPost")).toBe(false);
    });

    it("should return false when the Android bridge is not an object", () => {
        androidWindow.Android = "not-an-object";
        expect(checkAndroidSupport("broadcastPost")).toBe(false);
    });
});

import {EvamApi} from "../../src/api/EvamApi";
import {Operation} from "../../src/domain/Operation";
import {operation} from "../../src/data/testdata";
import {Location} from "../../src/domain/Location";
import {location} from "../../sdk/data/testdata";

class TestEvamApi extends EvamApi {
    public constructor() {
        super();
    }
}

beforeEach(() => {
    jest.resetAllMocks();
});


it("onNewOrUpdatedSettings triggers the callback after subscription to the event", () => {
    const settings = {test: "test"};
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectSettings(settings);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedSettings(listener);
    evamApi.injectSettings(settings);

    expect(listener).toHaveBeenCalledWith(expect.objectContaining(settings));
});

it("onNewOrUpdatedSettings doesn't trigger the callback after unsubscription from all events", () => {
    const settings = {test: "test"};
    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectSettings(settings);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedSettings(listener);
    evamApi.injectSettings(settings);
    expect(listener).toHaveBeenCalledWith(expect.objectContaining(settings));

    evamApi.unsubscribeFromAllCallbacks();
    evamApi.injectSettings(settings);
    expect(listener).toHaveBeenCalledTimes(1);

});

it("onNewOrUpdatedSettings triggers multiple set callbacks", () => {
    const settings = {test: "test"};
    const listeners = [jest.fn(), jest.fn()];

    let evamApi = new TestEvamApi();

    evamApi.injectSettings(settings);

    listeners.forEach((listener) => {
        expect(listener).not.toHaveBeenCalled();
    });

    listeners.forEach((listener) => {
        evamApi.onNewOrUpdatedSettings(listener);
    });

    evamApi.injectSettings(settings);

    listeners.forEach((listener) => {
        expect(listener).toHaveBeenCalledTimes(1);
    });
});

it("onNewOrUpdatedOperation triggers the callback after subscription to the event", () => {

    const convertedOperation = Operation.fromJSON(
        operation
    );

    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectOperation(convertedOperation);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedOperation(listener);
    evamApi.injectOperation(convertedOperation);

    expect(listener).toHaveBeenCalledWith(
        expect.objectContaining(convertedOperation)
    );

});

it("onNewOrUpdatedLocation triggers the callback after subscription to the event", () => {

    const convertedLocation = Location.fromJSON(
        location
    );

    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectLocation(convertedLocation)
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedOperation(listener);
    evamApi.injectLocation(convertedLocation);

    expect(listener).toHaveBeenCalledWith(
        expect.objectContaining(convertedLocation)
    );

});
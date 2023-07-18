import {EvamApi} from "../../src/api/EvamApi";
import {Operation} from "../../src/domain/Operation";
import {operation} from "../../src/data/testdata";

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

    const activeOperation = Operation.fromJSON(
        operation
    );

    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectOperation(activeOperation);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedOperation(listener);
    evamApi.injectOperation(activeOperation);

    expect(listener).toHaveBeenCalledWith(
        expect.objectContaining(activeOperation)
    );

});
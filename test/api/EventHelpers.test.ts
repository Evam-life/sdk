//import the event.js file
import {publish,unsubscribe,subscribe} from "../../src/util/EventHelpers";
import {EvamEvent} from "../../src";

beforeEach(() => {
    jest.resetAllMocks()
})

//test the subscribe function
test("subscribe", () => {
    const listener = jest.fn();
    subscribe(EvamEvent._testEvent, listener);
    publish(EvamEvent._testEvent, "test data");
    expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
            type: EvamEvent._testEvent,
            detail: "test data",
        })
    );
});
//test the unsubscribe function
test("unsubscribe", () => {
    const listener = jest.fn();
    subscribe(EvamEvent._testEvent, listener);
    unsubscribe(EvamEvent._testEvent, listener);
    publish(EvamEvent._testEvent, "test data");
    expect(listener).not.toHaveBeenCalled();
});
//test the publish function
test("publish", () => {
    const listener = jest.fn();
    subscribe(EvamEvent._testEvent, listener);
    publish(EvamEvent._testEvent, "test data");
    expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
            type: EvamEvent._testEvent,
            detail: "test data",
        })
    );
});

test("EvamEvent NewOrUpdatedSettings should pass 'settings' value",  () => {
    const settings = {test:'test'}
    const listener = jest.fn();
    subscribe(EvamEvent.NewOrUpdatedSettings, listener);
    publish(EvamEvent.NewOrUpdatedSettings, settings);
    expect(listener).toHaveBeenCalledWith(expect.objectContaining({detail:settings}))
});
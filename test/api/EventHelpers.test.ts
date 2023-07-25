//import the event.js file
import {publish,unsubscribe,subscribe} from "../../src/util/EventHelpers";
import EvamEvents from "../../src/domain/EvamEvents";

beforeEach(() => {
    jest.resetAllMocks()
})

//test the subscribe function
test("subscribe", () => {
    const listener = jest.fn();
    subscribe(EvamEvents._testEvent, listener);
    publish(EvamEvents._testEvent, "test data");
    expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
            type: EvamEvents._testEvent,
            detail: "test data",
        })
    );
});
//test the unsubscribe function
test("unsubscribe", () => {
    const listener = jest.fn();
    subscribe(EvamEvents._testEvent, listener);
    unsubscribe(EvamEvents._testEvent, listener);
    publish(EvamEvents._testEvent, "test data");
    expect(listener).not.toHaveBeenCalled();
});
//test the publish function
test("publish", () => {
    const listener = jest.fn();
    subscribe(EvamEvents._testEvent, listener);
    publish(EvamEvents._testEvent, "test data");
    expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
            type: EvamEvents._testEvent,
            detail: "test data",
        })
    );
});

test("EvamEvent NewOrUpdatedSettings should pass 'settings' value",  () => {
    const settings = {test:'test'}
    const listener = jest.fn();
    subscribe(EvamEvents.NewOrUpdatedSettings, listener);
    publish(EvamEvents.NewOrUpdatedSettings, settings);
    expect(listener).toHaveBeenCalledWith(expect.objectContaining({detail:settings}))
});
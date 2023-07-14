//import the event.js file
import {publish,unsubscribe,subscribe} from "../../sdk/api/EventHelpers";
import EvamEvents from "../../src/types/EvamEvents";

beforeEach(() => {
    jest.resetAllMocks()
})

//test the subscribe function
test("subscribe", () => {
    const listener = jest.fn();
    subscribe("test", listener);
    publish("test", "test data");
    expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
            type: "test",
            detail: "test data",
        })
    );
});
//test the unsubscribe function
test("unsubscribe", () => {
    const listener = jest.fn();
    subscribe("test", listener);
    unsubscribe("test", listener);
    publish("test", "test data");
    expect(listener).not.toHaveBeenCalled();
});
//test the publish function
test("publish", () => {
    const listener = jest.fn();
    subscribe("test", listener);
    publish("test", "test data");
    expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
            type: "test",
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
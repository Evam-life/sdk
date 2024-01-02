import {eventHandlerWrapper} from "@/utils";

describe("eventHandlerWrapper", () => {
    const eventName = "eventName" as const;
    const listener = jest.fn();

    afterEach(() => {
        listener.mockReset();
    });

    it("should subscribe to events and receive data", () => {
        const eventData = {key: "value"};
        eventHandlerWrapper().subscribe(eventName, listener);
        eventHandlerWrapper().publish(eventName, eventData);
        //this is basically testing listener has been called with the data
        expect(listener.mock.calls[0][0].detail).toEqual(eventData);
    });

    it("should unsubscribe from events", () => {
        eventHandlerWrapper().subscribe(eventName, listener);
        eventHandlerWrapper().unsubscribe(eventName, listener);
        eventHandlerWrapper().publish(eventName);
        expect(listener).not.toHaveBeenCalled();
    });

    it("should handle multiple subscribers", () => {
        const listener2 = jest.fn();
        eventHandlerWrapper().subscribe(eventName, listener);
        eventHandlerWrapper().subscribe(eventName, listener2);

        eventHandlerWrapper().publish(eventName);

        expect(listener).toHaveBeenCalled();
        expect(listener2).toHaveBeenCalled();
    });

    it("should not call listener for other events", () => {
        const otherEventName = "otherEventName" as const;
        eventHandlerWrapper().subscribe(eventName, listener);
        eventHandlerWrapper().publish(otherEventName);
        expect(listener).not.toHaveBeenCalled();
    });

    it("Should convert detail undefined to null (this is JavaScript events stuff)", () => {
        eventHandlerWrapper().subscribe(eventName, listener);
        eventHandlerWrapper().publish(eventName, undefined);
        expect(listener.mock.calls[0][0].detail).toEqual(null);
    });
});

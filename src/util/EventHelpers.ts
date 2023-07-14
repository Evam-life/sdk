import EvamEvents from "../types/EvamEvents";

function subscribe(eventName:EvamEvents, listener:EventListenerOrEventListenerObject) {
    document.addEventListener(eventName.toString(), listener);
}

function unsubscribe(eventName:EvamEvents, listener:EventListenerOrEventListenerObject) {
        document.removeEventListener(eventName.toString(), listener);
}

function publish(eventName:EvamEvents, data:any) {
    const event = new CustomEvent(eventName.toString(), { detail: data });
    document.dispatchEvent(event);
}

export { publish, subscribe, unsubscribe};
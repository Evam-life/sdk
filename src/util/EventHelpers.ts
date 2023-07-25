import EvamEvents from "../domain/EvamEvents";

/**
 * Low level method wrapper around document.addEventListener specifically for handling EvamEvents
 * @param eventName EvamEvent
 * @param listener callback
 */
function subscribe(eventName:EvamEvents, listener:EventListenerOrEventListenerObject) {
    document.addEventListener(eventName.toString(), listener);
}

/**
 * Low level method wrapper around document.removeEventListener specifically for handling EvamEvents
 * @param eventName EvamEvent
 * @param listener callback
 */
function unsubscribe(eventName:EvamEvents, listener:EventListenerOrEventListenerObject) {
        document.removeEventListener(eventName.toString(), listener);
}

/**
 * Low level method wrapper around document.dispatchEvent specifically for handling EvamEvents
 * @param eventName EvamEvent
 * @param data data to be passed to the callback
 */
function publish(eventName:EvamEvents, data:any) {
    const event = new CustomEvent(eventName.toString(), { detail: data });
    document.dispatchEvent(event);
}

export { publish, subscribe, unsubscribe};
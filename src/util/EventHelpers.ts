import {EvamEvent} from "../domain";

/**
 * Low level method wrapper around document.addEventListener specifically for handling EvamEvents
 * @param eventName EvamEvent
 * @param listener callback
 */
function subscribe(eventName:EvamEvent, listener:EventListenerOrEventListenerObject) {
    document.addEventListener(eventName.toString(), listener);
}

/**
 * Low level method wrapper around document.removeEventListener specifically for handling EvamEvents
 * @param eventName EvamEvent
 * @param listener callback
 */
function unsubscribe(eventName:EvamEvent, listener:EventListenerOrEventListenerObject) {
        document.removeEventListener(eventName.toString(), listener);
}

/**
 * Low level method wrapper around document.dispatchEvent specifically for handling EvamEvents
 * @param eventName EvamEvent
 * @param data data to be passed to the callback
 */
function publish(eventName:EvamEvent, data:any) {
    const event = new CustomEvent(eventName.toString(), { detail: data });
    document.dispatchEvent(event);
}

export { publish, subscribe, unsubscribe};
import {
  EventInterfaceType,
  EventPayloadType,
  EventType,
} from "@/types/_internal";
import { dnull, eventHandlerWrapper, parsePayload } from "@/utils";
import { ZodSchema } from "zod";
import { forEach, isEmpty, isNull, isUndefined } from "lodash";

type EventMapHandlerConstructorParameters<
  EventInterface extends EventInterfaceType,
> = {
  parserMap?: ConstructorParameters<
    typeof Map<EventType<EventInterface>, ZodSchema>
  >[0];
};

class EventMapHandler<EventInterface extends EventInterfaceType> {
  private doc: Document = document;

  //private map containing all callbacks for a specific event
  private eventMap = new Map<
    EventType<EventInterface>,
    ReadonlyArray<
      (
        args: EventPayloadType<EventInterface, EventType<EventInterface>>,
      ) => void
    >
  >([]);
  private readonly parserMap = new Map<EventType<EventInterface>, ZodSchema>();

  constructor(
    { parserMap = [] }: EventMapHandlerConstructorParameters<EventInterface> = {
      parserMap: [],
    },
  ) {
    this.parserMap = new Map(parserMap);
  }

  /**
   * Will subscribe a callback to an event
   * @param event the event to subscribe to
   * @param callback the callback to execute
   */
  public on = <E extends EventType<EventInterface>>(
    event: E,
    callback: (args: EventPayloadType<EventInterface, E>) => void,
  ) => this.addCallbacksForEvents(event, callback);

  /**
   * Handles removing the callbacks + listeners for events
   * If no parameters are given then all callbacks are removed
   * If only the event parameter is given then all callbacks for the named event are removed
   * If both event and callback are given then the specific callback for the specific event is removed
   * @param event the event to remove
   * @param callback the callback to remove
   */
  public off = <E extends EventType<EventInterface>>(
    event?: E,
    callback?: (args: EventPayloadType<EventInterface, E>) => void,
  ) => this.removeCallbacksForEvents(event, callback);

  /**
   * Method that parses a payload and triggers it
   * @param e the raw DOM event
   */
  private processEvent = (e: Event) => {
    const evt = e.type as EventType<EventInterface>;
    const callbackArr = this.getMutableCallbackArray(evt);

    if (isEmpty(callbackArr) || isUndefined(callbackArr))
      return this.endListeningToEvent(evt); //cleanup (this should never be called, but is here just in case)

    //(e as CustomEvent).detail becomes null when the detail was undefined
    const detail = (e as CustomEvent).detail;

    const unparsedPayload = isNull(detail)
      ? undefined
      : typeof detail === "object"
        ? dnull(detail)
        : detail;

    try {
      const parsedPayload = parsePayload<
        EventInterface,
        EventType<EventInterface>
      >(evt, unparsedPayload, this.parserMap);
      this.triggerCallbacks(parsedPayload, callbackArr);
    } catch (e) {
      //parsePayload will throw if it fails to parse
      console.error(e);
    }
  };

  /**
   * Wraps this.eventMap.get to provide a mutable copy of the current callback array.
   * @param e the event to query the event map
   */
  private getMutableCallbackArray = (e: EventType<EventInterface>) => {
    const arr = this.eventMap.get(e);
    return isUndefined(arr) ? undefined : Array.from(arr);
  };

  /**
   * This method triggers all callbacks with a payload.
   * This method itself does not parse the payload beforehand (this is done in the processEvent method)
   * @see processEvent
   * @param parsedPayload the parsed payload object
   * @param callbacksArr the array of callbacks
   */
  private triggerCallbacks = <E extends EventType<EventInterface>>(
    parsedPayload: EventPayloadType<EventInterface, E>,
    callbacksArr: Array<
      (
        args: EventPayloadType<EventInterface, EventType<EventInterface>>,
      ) => void
    >,
  ) => {
    forEach(callbacksArr, callback => callback(parsedPayload));
  };

  /**
   * Removes an event listener from the document
   * @param event the event to remove
   */
  private endListeningToEvent = (event: EventType<EventInterface>) =>
    this["event-utils"]().unsubscribe(event as string, this.processEvent);

  /**
   * Adds an event listener to the document
   * @param event the event to add
   */
  private beginListeningToEvent = (event: EventType<EventInterface>) =>
    this["event-utils"]().subscribe(event as string, this.processEvent);

  /**
   * Handles removing the callbacks + listeners for events
   * If no parameters are given then all callbacks are removed
   * If only the event parameter is given then all callbacks for the named event are removed
   * If both event and callback are given then the specific callback for the specific event is removed
   * @param event the event to remove
   * @param callback the callback to remove
   */
  private removeCallbacksForEvents = <E extends EventType<EventInterface>>(
    event?: E,
    callback?: (payload: EventPayloadType<EventInterface, E>) => void,
  ) => {
    //Iterates through all events currently stored in the event-callback map and removes callbacks and ends listening.
    if (isUndefined(event) && isUndefined(callback)) {
      forEach(Array.from(this.eventMap.keys()), this.endListeningToEvent);
      this.eventMap.clear();
      return;
    }

    //Removes all callbacks tied to an event then ends listening
    if (!isUndefined(event) && isUndefined(callback)) {
      this.endListeningToEvent(event);
      this.eventMap.delete(event);
      return;
    }

    //Removes singular callback tied to an event
    if (!isUndefined(event) && !isUndefined(callback)) {
      const callbackArray = this.getMutableCallbackArray(event);
      if (callbackArray !== undefined) {
        const callbackIndex = callbackArray.indexOf(
          callback as EventPayloadType<
            EventInterface,
            EventType<EventInterface>
          >,
        );
        const callbackFound: boolean = callbackIndex !== -1;

        if (callbackFound) {
          //remove the callback from the array
          const newArray = [...callbackArray];
          newArray.splice(callbackIndex, 1);

          if (isEmpty(newArray)) {
            this.removeCallbacksForEvents(event);
          } else {
            this.eventMap.set(event, newArray);
          }
        }
      } else {
        //remove all callbacks (this shouldn't call, but is here just in case)
        this.removeCallbacksForEvents(event);
      }
      return;
    }
  };

  private addCallbacksForEvents = <E extends EventType<EventInterface>>(
    event: E,
    callback: (args: EventPayloadType<EventInterface, E>) => void,
  ) => {
    const newArray = this.getMutableCallbackArray(event) || [];
    if (isEmpty(newArray)) this.beginListeningToEvent(event);
    // this type casting is because TypeScript is struggling to match
    // 'keyof EventInterface' to 'EventType<EventInterface>'
    newArray.push(
      callback as (
        args: EventPayloadType<EventInterface, EventType<EventInterface>>,
      ) => void,
    );
    this.eventMap.set(event, newArray);
  };

  /**
   * Event methods which will be performed on the current doc.
   */
  private "event-utils" = () => ({
    ...eventHandlerWrapper(this.doc),
  });
  /**
   * publish an event to the current event map handler
   * @param event the event to publish
   * @param payload the corresponding payload
   */
  public publish = (
    event: EventType<EventInterface>,
    payload: EventPayloadType<EventInterface, EventType<EventInterface>>,
  ) => this["event-utils"]().publish(event as string, payload);

  /**
   * Reinitialise the EventMapHandler instance with a new document.
   * @param doc the document that will now be subscribed to.
   */
  public reinitialise = (doc: Document = document) => {
    this.removeCallbacksForEvents();
    this.doc = doc;
  };
}

export default EventMapHandler;

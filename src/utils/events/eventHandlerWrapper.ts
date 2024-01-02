const eventHandlerWrapper = (doc: Document = document) => ({
  subscribe: (event: string, listener: EventListenerOrEventListenerObject) =>
    doc.addEventListener(event, listener),
  unsubscribe: (event: string, listener: EventListenerOrEventListenerObject) =>
    doc.removeEventListener(event, listener),
  publish: (event: string, detail?: unknown) => {
    const evt = new CustomEvent(event, {
      detail,
    });
    doc.dispatchEvent(evt);
  },
});

export default eventHandlerWrapper;

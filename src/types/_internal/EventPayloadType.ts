import { EventType } from "@/types/_internal/EventType";
import { EventInterfaceType } from "@/types/_internal/EventInterfaceType";

export type EventPayloadType<
  I extends EventInterfaceType,
  E extends EventType<I>,
> = I[E];

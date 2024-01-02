import { EventInterfaceType } from "@/types/_internal/EventInterfaceType";

export type EventType<K extends EventInterfaceType> = keyof K;

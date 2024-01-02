import {
  EventInterfaceType,
  EventPayloadType,
  EventType,
} from "@/types/_internal";
import { ZodSchema } from "zod";
import { isUndefined } from "lodash";

const parsePayload = <I extends EventInterfaceType, E extends EventType<I>>(
  event: E,
  payload: unknown,
  parserMap: Map<E, ZodSchema>,
): EventPayloadType<I, E> => {
  const parser = parserMap.get(event);
  if (isUndefined(parser)) return payload as EventPayloadType<I, E>;
  const parse = parser.parse(payload);
  return parse as EventPayloadType<I, E>;
};

export default parsePayload;

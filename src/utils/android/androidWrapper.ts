import {
  AndroidMethod,
  AndroidMethodParameters,
  AndroidMethodReturnType,
} from "@/types/_internal";

/**
 * Low level wrapper for interacting with the Android instance
 * This does not check if we are running in vehicle services
 */
const androidWrapper = {
  call: <M extends AndroidMethod>(
    method: M,
    ...args: AndroidMethodParameters<M>
  ) => {
    // @ts-expect-error The "Android" instance only exists within the WebView environment
    return Android[method](...args) as AndroidMethodReturnType<M>;
  },
};

export default androidWrapper;

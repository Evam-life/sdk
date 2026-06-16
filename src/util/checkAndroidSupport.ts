import { AndroidMethod } from "../domain/_internal";

/**
 * Returns true if the given method is supported in the Android instance
 * @param m the method to check
 */
const checkAndroidSupport = (m: AndroidMethod): boolean => {
  try {
    // @ts-expect-error window.Android is not typed
    return m in window.Android;
  } catch (e) {
    console.log("Error checking Android", e instanceof Error ? e.message : e)
    return false;
  }
};

export default checkAndroidSupport;

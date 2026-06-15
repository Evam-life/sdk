import { AndroidMethod } from "../domain/_internal";

/**
 * Returns true if the given method is supported in the Android instance
 * @param m the method to check
 */
const checkAndroidSupport = (m: AndroidMethod): boolean => {
  return "Android" in window &&
    // @ts-expect-error we typecheck "Android" in window above
    typeof window.Android === "object" && window.Android !== null && m in window.Android;
};

export default checkAndroidSupport

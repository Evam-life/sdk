import * as enums from "@/data/enum";
import * as arrays from "@/data/array";

/**
 * A convenient set of utilities for use in production
 * @ignore
 */
export const VehicleServicesUtils = {
  /**
   * A collection of different arrays for values of different types within the SDK.
   */
  iterators: {
    ...arrays,
    ...enums,
  },
};
export * from "@/types"; // export all types that users can use (ignore _internal)
export * from "@/api"; // export the EvamApi class

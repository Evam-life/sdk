import * as _ from "lodash";
import isValid_InternalNotificationCallbackSuffix from "@/utils/notifications/isValid_InternalNotificationCallbackSuffix";
import InternalErrorRepository from "@/utils/error/InternalErrorRepository";
import { VehicleServicesNotificationCallbackId } from "@/types";

/**
 * Utility method to separate a callback id into its two parts.
 * @param callbackId the full callback id
 * @returns a tuple where the first element is the shared notification id and the second element is the suffix
 */
const splitCallbackIdSuffix = (
  callbackId: VehicleServicesNotificationCallbackId,
) => {
  if (callbackId.length <= 2)
    throw new Error(
      InternalErrorRepository.util.splitNotificationIdSuffix.idTooShort(
        callbackId,
      ),
    );
  const stringArray = _.split(callbackId, "");
  const sharedId = _.join(_.dropRight(stringArray, 2), "");
  const suffix = _.join(_.takeRight(stringArray, 2), "");
  if (!isValid_InternalNotificationCallbackSuffix(suffix))
    throw new Error(
      InternalErrorRepository.util.splitNotificationIdSuffix.isInvalidCallbackIdSuffix(
        suffix,
      ),
    );
  return [sharedId, suffix] as const;
};

export default splitCallbackIdSuffix;

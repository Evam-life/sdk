import { HospitalLocation, OperationPriority } from "@/types";
import prettyJSONStringify from "@/utils/string/prettyJSONStringify";

const EvamApiErrorRepository = {
  setPriority: {
    operationNotDefined: () =>
      "Cannot set priority when there is no current operation defined.",
    noAvailablePriorities: () =>
      "Cannot set priority when availablePriorities is undefined",
    priorityNotAvailable: (
      id: number,
      availablePriorities: Array<OperationPriority>,
    ) =>
      `Priority "${id}" is unavailable in availablePriorities ${prettyJSONStringify(
        availablePriorities,
      )}`,
  },
  setHospital: {
    operationNotDefined: () =>
      "Cannot set hospital when there is no current operation defined.",
    noAvailableHospitalLocations: () =>
      "Cannot set hospital when availableHospitalLocations is undefined",
    hospitalNotAvailable: (
      id: number,
      availableHospitalLocations: Array<HospitalLocation>,
    ) =>
      `Hospital "${id}" is unavailable in availableHospitalLocations ${prettyJSONStringify(
        availableHospitalLocations,
      )}`,
  },
} as const;

export default EvamApiErrorRepository;

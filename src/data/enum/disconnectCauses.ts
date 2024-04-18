const disconnectCauses = [
  "ERROR",
  "LOCAL",
  "REMOTE",
  "CANCELED",
  "MISSED",
  "REJECTED",
  "BUSY",
  "RESTRICTED",
  "OTHER",
  "CONNECTION_MANAGER_NOT_SUPPORTED",
  "CALL_PULLED",
  "ANSWERED_ELSEWHERE",
  "UNKNOWN",
] as const;
export default disconnectCauses;

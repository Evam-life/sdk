enum CallDisconnectCause {
        /**
     * Disconnected because there was an error, such as a problem with the network
     */
        ERROR = "ERROR",

        /**
         * Disconnected because of a local user-initiated action, such as hanging up.
         */
        LOCAL = "LOCAL",
    
        /**
         * Disconnected because of a remote user-initiated action, such as the other party hanging up up.
         */
        REMOTE = "REMOTE",
    
        /**
         * Disconnected because it has been canceled.
         */
        CANCELED = "CANCELED",
    
        /**
         * Disconnected because there was no response to an incoming call.
         */
        MISSED = "MISSED",
    
        /**
         * Disconnected because the user rejected an incoming call.
         */
        REJECTED = "REJECTED",
    
        /**
         * Disconnected because the other party was busy.
         */
        BUSY = "BUSY",
    
        /**
         * Disconnected because of a restriction on placing the call, such as dialing in airplane mode.
         */
        RESTRICTED = "RESTRICTED",
    
        /**
         * Disconnected for reason not described by other disconnect codes.
         */
        OTHER = "OTHER",
    
        /**
         * Disconnected because the connection manager did not support the call. The call will be tried again without a connection manager
         */
        CONNECTION_MANAGER_NOT_SUPPORTED = "CONNECTION_MANAGER_NOT_SUPPORTED",
    
        /**
         * Disconnected because the call was pulled from the current device to another device.
         */
        CALL_PULLED = "CALL_PULLED",
    
        /**
         * Disconnected because the user did not locally answer the incoming call, but it was answered on another device where the call was ringing.
         */
        ANSWERED_ELSEWHERE = "ANSWERED_ELSEWHERE",
    
        /**
         * Disconnected because of an unknown or unspecified reason.
         */
        UNKNOWN = "UNKNOWN"
}
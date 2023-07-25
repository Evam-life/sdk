class SystemHealth {
    /**
     * Health status of system
     * @param isHealthy boolean value represents whether system is healthy or not
     * @param message information message
     * @param timestamp time of information received
     */
    constructor(
        public isHealthy:boolean,
        public message: string | undefined,
        public timestamp: Date | undefined
    ) {
    }

    /**
     * Create from JSON
     * @param systemHealth JSON object
     */
    static fromJSON(systemHealth:any){
        if (systemHealth.isHealthy === undefined){
            throw Error('isHealthy must be defined for SystemHealth')
        }
        return new SystemHealth(
            systemHealth.isHealthy,
            systemHealth.message,
            systemHealth.timestamp !== undefined ? new Date(systemHealth.timestamp) : undefined
        )
    }
}

export {SystemHealth};
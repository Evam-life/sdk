class SystemHealth {
    constructor(
        public isHealthy:boolean,
        public message: string | undefined,
        public timestamp: Date | undefined
    ) {
    }

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
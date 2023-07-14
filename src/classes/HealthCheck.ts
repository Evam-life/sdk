
class SystemHealth {
    constructor(
        public isHealthy:boolean,
        public message: string | undefined,
        public timestamp: Date | undefined
    ) {
    }

    static fromJSON(systemHealth:any){
        return new SystemHealth(
            systemHealth.isHealthy,
            systemHealth.message,
            systemHealth.timestamp
        )
    }
}

export {SystemHealth}
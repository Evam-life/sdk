class RakelState {

    /**
     * General information about the current Rakel radio state
     * @param issi The radio ISSI
     * @param msisdn The radio MSISDN
     * @param gssi The radio GSSI
     * @param isHealthy flag for the health of the radio communication
     */
    constructor(
        public msisdn: string | undefined,
        public issi: string | undefined,
        public gssi: string | undefined,
        public isHealthy: boolean
    ) {
    }


    /**
     * Create from JSON
     * @param data JSON object
     */
    static fromJSON(data: any) {
        return new RakelState(
            data?.msisdn, data?.issi, data?.gssi, data?.isHealthy
        )
    }
}

export {RakelState}
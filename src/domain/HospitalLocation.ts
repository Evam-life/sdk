class HospitalLocation {
    /**
     * Location of a hospital
     * @param id Hospital unique ID
     * @param latitude Latitude of hospital location
     * @param longitude Longitude of hospital location
     * @param name Name of hospital
     * @param street1 street address of hospital
     * @param city city in which hospital is located
     * @param region region in which hospital is located
     * @param postalCode postal code of hospital
     */
    constructor(
        public id: number,
        public latitude: number,
        public longitude: number,
        public name: string | undefined,
        public street1: string | undefined,
        public city: string | undefined,
        public region: string | undefined,
        public postalCode: string | undefined,
    ) {

    }

    /**
     * Create from JSON
     * @param hospitalLocation JSON object
     */
    static fromJSON(hospitalLocation: any) {
        if (hospitalLocation.id === undefined || hospitalLocation.latitude === undefined || hospitalLocation.longitude === undefined){
            throw Error('id, latitude and longitude must be defined for HospitalLocation')
        }
            return new HospitalLocation(
                hospitalLocation.id,
                hospitalLocation.latitude,
                hospitalLocation.longitude,
                hospitalLocation.name,
                hospitalLocation.street1,
                hospitalLocation.city,
                hospitalLocation.region,
                hospitalLocation.postalCode,
            );
    }
}

export {HospitalLocation};
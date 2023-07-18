class HospitalLocation {
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

    static fromJSON(hospitalLocation: any) {
        if (hospitalLocation.id === undefined || hospitalLocation.latitude === undefined || hospitalLocation.longitude === undefined){
            throw Error('id, latitude and longitude must be defined for HospitalLocation')
        }
            return new HospitalLocation(
                hospitalLocation.latitude,
                hospitalLocation.longitude,
                hospitalLocation.name,
                hospitalLocation.street1,
                hospitalLocation.city,
                hospitalLocation.region,
                hospitalLocation.postalCode,
                hospitalLocation.id
            );
    }
}

export {HospitalLocation};
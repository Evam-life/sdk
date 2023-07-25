class Patient {
    /**
     * A patient
     * @param name name of the patient
     * @param uid unique identifier of the patient
     */
    constructor(public name: string,
                public uid: string) {
    }

    /**
     * Create from JSON
     * @param patient JSON object
     */
    static fromJSON(
        patient:any
    ){
        if(patient.name === undefined || patient.uid === undefined){
            throw Error('name and uid must be declared in Patient')
        }
        return new Patient(patient.name,
            patient.uid)
    }
}

export {Patient};
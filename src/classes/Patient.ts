class Patient {
    constructor(public name: string,
                public uid: string) {
    }

    static fromJSON(
        patient:any
    ){
        return new Patient(patient.name,
            patient.uid)
    }
}

export {Patient};
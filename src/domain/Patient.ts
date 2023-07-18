class Patient {
    constructor(public name: string,
                public uid: string) {
    }

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
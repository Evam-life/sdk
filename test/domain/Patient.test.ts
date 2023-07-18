import {Patient} from "../../src/domain/Patient";
import * as _ from "lodash";
import {patient} from "../../src/data/testdata";


it('tests that Patient fromJSON correctly assigns right values',()=>{

    const convertedPatient = Patient.fromJSON(patient);

    expect(convertedPatient.name).not.toBeUndefined()
    expect(convertedPatient.uid).not.toBeUndefined()

    expect(patient.name).toEqual(convertedPatient.name)
    expect(patient.uid).toEqual(convertedPatient.uid)
})

it('tests that Location fromJSON throws error when latitude or longitude are not present in JSON',()=>{
    const patientWithoutName = _.omit(patient,'name')
    const patientWithoutUid = _.omit(patient,'uid')

    expect(()=> {
        Patient.fromJSON(patientWithoutName);
    }).toThrow()
    expect(()=> {
        Patient.fromJSON(patientWithoutUid);
    }).toThrow()
})
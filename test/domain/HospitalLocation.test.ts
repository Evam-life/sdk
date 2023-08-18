import {HospitalLocation} from "../../src";
import * as _ from "lodash";
import {convertedHospitalLocation, hospitalLocation} from "../testdata";

it('tests that Location fromJSON correctly assigns right values',()=>{

    expect(convertedHospitalLocation.latitude).not.toBeUndefined()
    expect(convertedHospitalLocation.longitude).not.toBeUndefined()
    expect(convertedHospitalLocation.id).not.toBeUndefined()
    expect(convertedHospitalLocation.name).not.toBeUndefined()
    expect(convertedHospitalLocation.street1).not.toBeUndefined()
    expect(convertedHospitalLocation.city).not.toBeUndefined()
    expect(convertedHospitalLocation.region).not.toBeUndefined()
    expect(convertedHospitalLocation.postalCode).not.toBeUndefined()

    expect(hospitalLocation.latitude).toEqual(convertedHospitalLocation.latitude)
    expect(hospitalLocation.longitude).toEqual(convertedHospitalLocation.longitude)
    expect(hospitalLocation.id).toEqual(convertedHospitalLocation.id)
    expect(hospitalLocation.name).toEqual(convertedHospitalLocation.name)
    expect(hospitalLocation.street1).toEqual(convertedHospitalLocation.street1)
    expect(hospitalLocation.city).toEqual(convertedHospitalLocation.city)
    expect(hospitalLocation.region).toEqual(convertedHospitalLocation.region)
    expect(hospitalLocation.postalCode).toEqual(convertedHospitalLocation.postalCode)
})

it('tests that Location fromJSON throws error when latitude or longitude are not present in JSON',()=>{
    const hospitalLocationWithoutLatitude = _.omit(hospitalLocation,'latitude')
    const hospitalLocationWithoutLongitude = _.omit(hospitalLocation,'longitude')
    const hospitalLocationId = _.omit(hospitalLocation,'id')
    const hospitalLocationWithoutLatitudeAndLongitudeAndId = _.omit(hospitalLocation,['latitude','longitude', 'id'])

    expect(()=> {
        HospitalLocation.fromJSON(hospitalLocationWithoutLatitude);
    }).toThrow()
    expect(()=> {
        HospitalLocation.fromJSON(hospitalLocationWithoutLongitude);
    }).toThrow()
    expect(()=> {
        HospitalLocation.fromJSON(hospitalLocationId);
    }).toThrow()
    expect(()=> {
        HospitalLocation.fromJSON(hospitalLocationWithoutLatitudeAndLongitudeAndId);
    }).toThrow()
})
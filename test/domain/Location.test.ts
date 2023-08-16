import {Location} from "../../src";
import * as _ from "lodash"
import {convertedLocation, location} from "../testdata";


it('tests that Location fromJSON correctly assigns right values',()=>{
    expect(convertedLocation.latitude).not.toBeUndefined()
    expect(convertedLocation.longitude).not.toBeUndefined()
    expect(convertedLocation.timestamp).not.toBeUndefined()

    expect(location.latitude).toEqual(convertedLocation.latitude)
    expect(location.longitude).toEqual(convertedLocation.longitude)
    expect(new Date(location.timestamp)).toEqual(convertedLocation.timestamp)
})

it('tests that Location fromJSON throws error when latitude or longitude are not present in JSON',()=>{
    const locWithoutLatitude = _.omit(location,'latitude')
    const locWithoutLongitude = _.omit(location,'longitude')
    const locWithoutLatitudeAndLongitude = _.omit(location,['latitude','longitude'])

    expect(()=> {
        Location.fromJSON(locWithoutLatitude);
    }).toThrow()
    expect(()=> {
        Location.fromJSON(locWithoutLongitude);
    }).toThrow()
    expect(()=> {
        Location.fromJSON(locWithoutLatitudeAndLongitude);
    }).toThrow()

})
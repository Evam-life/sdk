import * as _ from "lodash";
import {DestinationControlPointLocation} from "../../src/domain/DestinationControlPointLocation";
import {convertedDestinationControlPointLocation, destinationControlPointLocation} from "../testdata";

it('tests that DestinationControlPointLocation fromJSON correctly assigns right values',()=>{
    expect(convertedDestinationControlPointLocation.latitude).not.toBeUndefined()
    expect(convertedDestinationControlPointLocation.longitude).not.toBeUndefined()
    expect(convertedDestinationControlPointLocation.name).not.toBeUndefined()
    expect(convertedDestinationControlPointLocation.additionalInfo).not.toBeUndefined()


    expect(destinationControlPointLocation.latitude).toEqual(convertedDestinationControlPointLocation.latitude)
    expect(destinationControlPointLocation.longitude).toEqual(convertedDestinationControlPointLocation.longitude)
    expect(destinationControlPointLocation.name).toEqual(convertedDestinationControlPointLocation.name)
    expect(destinationControlPointLocation.additionalInfo).toEqual(convertedDestinationControlPointLocation.additionalInfo)
})

it('tests that Location fromJSON throws error when latitude or longitude are not present in JSON',()=>{
    const destinationControlPointLocationWithoutLatitude = _.omit(destinationControlPointLocation,'latitude')
    const destinationControlPointLocationWithoutLongitude = _.omit(destinationControlPointLocation,'longitude')
    const destinationControlPointLocationWithoutLatitudeAndLongitude = _.omit(destinationControlPointLocation,['latitude','longitude'])

    expect(()=> {
        DestinationControlPointLocation.fromJSON(destinationControlPointLocationWithoutLatitude);
    }).toThrow()
    expect(()=> {
        DestinationControlPointLocation.fromJSON(destinationControlPointLocationWithoutLongitude);
    }).toThrow()
    expect(()=> {
        DestinationControlPointLocation.fromJSON(destinationControlPointLocationWithoutLatitudeAndLongitude);
    }).toThrow()

})
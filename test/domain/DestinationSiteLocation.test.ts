import * as _ from "lodash";
import {DestinationSiteLocation} from "../../src";
import {convertedSiteLocation, destinationSiteLocation} from "../testdata";

it('tests that DestinationControlPointLocation fromJSON correctly assigns right values',()=>{
    expect(convertedSiteLocation.latitude).not.toBeUndefined()
    expect(convertedSiteLocation.longitude).not.toBeUndefined()
    expect(convertedSiteLocation.street).not.toBeUndefined()
    expect(convertedSiteLocation.locality).not.toBeUndefined()
    expect(convertedSiteLocation.municipality).not.toBeUndefined()
    expect(convertedSiteLocation.routeDirections).not.toBeUndefined()
    expect(convertedSiteLocation.pickupTime).not.toBeUndefined()

    expect(destinationSiteLocation.latitude).toEqual(convertedSiteLocation.latitude)
    expect(destinationSiteLocation.longitude).toEqual(convertedSiteLocation.longitude)
    expect(convertedSiteLocation.street).toEqual(convertedSiteLocation.street)
    expect(convertedSiteLocation.locality).toEqual(convertedSiteLocation.locality)
    expect(convertedSiteLocation.municipality).toEqual(convertedSiteLocation.municipality)
    expect(convertedSiteLocation.routeDirections).toEqual(convertedSiteLocation.routeDirections)
    expect(convertedSiteLocation.pickupTime).toEqual(convertedSiteLocation.pickupTime)
})

it('tests that Location fromJSON throws error when latitude or longitude are not present in JSON',()=>{
    const destinationControlPointLocationWithoutLatitude = _.omit(destinationSiteLocation,'latitude')
    const destinationControlPointLocationWithoutLongitude = _.omit(destinationSiteLocation,'longitude')
    const destinationControlPointLocationWithoutLatitudeAndLongitude = _.omit(destinationSiteLocation,['latitude','longitude'])

    expect(()=> {
        DestinationSiteLocation.fromJSON(destinationControlPointLocationWithoutLatitude);
    }).toThrow()
    expect(()=> {
        DestinationSiteLocation.fromJSON(destinationControlPointLocationWithoutLongitude);
    }).toThrow()
    expect(()=> {
        DestinationSiteLocation.fromJSON(destinationControlPointLocationWithoutLatitudeAndLongitude);
    }).toThrow()

})
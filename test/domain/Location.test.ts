import {Operation} from "../../src/domain/Operation";
import {OperationPriority} from "../../src/domain/OperationPriority";
import {Location} from "../../src/domain/Location";

it('tests that Location fromJSON correctly assigns right values',()=>{
    const loc = {
        latitude: 59.3538975,
        longitude: 17.9721877,
        timestamp: new Date(0).getTime()
    }


    const convertedLocation = Location.fromJSON(loc);

    expect(loc.latitude).toEqual(convertedLocation.latitude)
    expect(loc.longitude).toEqual(convertedLocation.longitude)
    expect(new Date(loc.timestamp)).toEqual(convertedLocation.timestamp)
})

it('tests that Location fromJSON throws error when latitude or longitude are not present in JSON',()=>{
    const locWithoutLat = {
        longitude: 17.9721877,
        timestamp: new Date(0).getTime()
    }

    const locWithoutLong = {
        latitude: 59.3538975,
        timestamp: new Date(0).getTime()
    }

    const locWithoutLatAndLong = {
        timestamp: new Date(0).getTime()
    }

    expect(()=> {
        Location.fromJSON(locWithoutLat);
    }).toThrow()
    expect(()=> {
        Location.fromJSON(locWithoutLong);
    }).toThrow()
    expect(()=> {
        Location.fromJSON(locWithoutLatAndLong);
    }).toThrow()

})
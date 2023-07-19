import {Location} from "../../src/domain/Location";
import * as _ from "lodash"
import {convertedTripLocationHistory, tripLocationHistory} from "../../src/data/testdata";

it('tests that TripLocationHistory fromJSON correctly assigns right values',()=>{
    expect(convertedTripLocationHistory.locationHistory).not.toBeUndefined()
    expect(convertedTripLocationHistory.etaSeconds).not.toBeUndefined()

    expect(tripLocationHistory.locationHistory).toEqual(convertedTripLocationHistory.locationHistory)
    expect(tripLocationHistory.etaSeconds).toEqual(convertedTripLocationHistory.etaSeconds)
})

it('tests that TripLocationHistory fromJSON throws error when locationHistory is not present in JSON',()=>{
    const tripLocationHistoryWithoutLocationHistory = _.omit(tripLocationHistory,'locationHistory')

    expect(()=> {
        Location.fromJSON(tripLocationHistoryWithoutLocationHistory);
    }).toThrow()

})
import {Location} from "../../src";
import * as _ from "lodash"
import {convertedTripLocationHistory, tripLocationHistory} from "../testdata";

it('tests that TripLocationHistory fromJSON correctly assigns right values',()=>{
    expect(convertedTripLocationHistory.locationHistory).not.toBeUndefined();
    expect(convertedTripLocationHistory.etaSeconds).not.toBeUndefined();

    expect(tripLocationHistory.locationHistory.map(lh => ({
        ...lh,
        timestamp: new Date(lh.timestamp)
    }))).toEqual(convertedTripLocationHistory.locationHistory);
    expect(tripLocationHistory.etaSeconds).toEqual(convertedTripLocationHistory.etaSeconds);
})

it('tests that TripLocationHistory fromJSON throws error when locationHistory is not present in JSON',()=>{
    const tripLocationHistoryWithoutLocationHistory = _.omit(tripLocationHistory,'locationHistory')

    expect(()=> {
        Location.fromJSON(tripLocationHistoryWithoutLocationHistory);
    }).toThrow()

})
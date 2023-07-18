import * as _ from "lodash";
import {VehicleState} from "../../src/domain/VehicleState";
import {vehicleState} from "../../src/data/testdata";


it('tests that DestinationControlPointLocation fromJSON correctly assigns right values',()=>{
    const convertedVehicleState = VehicleState.fromJSON(vehicleState);

    expect(convertedVehicleState.timestamp).not.toBeUndefined()
    expect(convertedVehicleState.vehicleStatus).not.toBeUndefined()
    expect(convertedVehicleState.activeCaseFullId).not.toBeUndefined()
    expect(convertedVehicleState.vehicleLocation).not.toBeUndefined()

    expect(new Date(vehicleState.timestamp)).toEqual(convertedVehicleState.timestamp)
    expect(vehicleState.vehicleStatus).toEqual(convertedVehicleState.vehicleStatus)
    expect(vehicleState.activeCaseFullId).toEqual(convertedVehicleState.activeCaseFullId)
    expect(vehicleState.vehicleLocation).toEqual(convertedVehicleState.vehicleLocation)
})

it('tests that Location fromJSON throws error when latitude or longitude are not present in JSON',()=>{
    const vehicleStateWithoutTimestamp = _.omit(vehicleState,'timestamp')

    expect(()=> {
        VehicleState.fromJSON(vehicleStateWithoutTimestamp);
    }).toThrow()
})
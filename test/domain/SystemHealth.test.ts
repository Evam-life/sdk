import * as _ from "lodash";
import {SystemHealth} from "@/domain/SystemHealth";
import {convertedSystemHealth, systemHealth} from "../testdata";

it('tests that DestinationControlPointLocation fromJSON correctly assigns right values',()=>{
    expect(convertedSystemHealth.isHealthy).not.toBeUndefined()
    expect(convertedSystemHealth.message).not.toBeUndefined()
    expect(convertedSystemHealth.timestamp).not.toBeUndefined()

    expect(systemHealth.isHealthy).toEqual(convertedSystemHealth.isHealthy)
    expect(systemHealth.message).toEqual(convertedSystemHealth.message)
    expect(new Date(systemHealth.timestamp)).toEqual(convertedSystemHealth.timestamp)
})

it('tests that Location fromJSON throws error when latitude or longitude are not present in JSON',()=>{
    const systemHealthWithoutIsHealthy = _.omit(systemHealth,'isHealthy')

    expect(()=> {
        SystemHealth.fromJSON(systemHealthWithoutIsHealthy);
    }).toThrow()
})
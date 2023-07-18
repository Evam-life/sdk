import * as _ from "lodash";
import {SystemHealth} from "../../src/domain/SystemHealth";
import {systemHealth} from "../../src/data/testdata";

it('tests that DestinationControlPointLocation fromJSON correctly assigns right values',()=>{
    const convertedSiteLocation = SystemHealth.fromJSON(systemHealth);

    expect(convertedSiteLocation.isHealthy).not.toBeUndefined()
    expect(convertedSiteLocation.message).not.toBeUndefined()
    expect(convertedSiteLocation.timestamp).not.toBeUndefined()

    expect(systemHealth.isHealthy).toEqual(convertedSiteLocation.isHealthy)
    expect(systemHealth.message).toEqual(convertedSiteLocation.message)
    expect(new Date(systemHealth.timestamp)).toEqual(convertedSiteLocation.timestamp)
})

it('tests that Location fromJSON throws error when latitude or longitude are not present in JSON',()=>{
    const systemHealthWithoutIsHealthy = _.omit(systemHealth,'isHealthy')

    expect(()=> {
        SystemHealth.fromJSON(systemHealthWithoutIsHealthy);
    }).toThrow()
})
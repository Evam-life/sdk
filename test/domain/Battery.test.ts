import {battery, convertedBattery} from "../testdata";

it('tests that Battery fromJSON correctly assigns right values',()=>{
    expect(convertedBattery.plugged).not.toBeUndefined()
    expect(convertedBattery.status).not.toBeUndefined()
    expect(convertedBattery.health).not.toBeUndefined()

    expect(battery.plugged).toEqual(convertedBattery.plugged)
    expect(battery.status).toEqual(convertedBattery.status)
    expect(battery.health).toEqual(convertedBattery.health)
})
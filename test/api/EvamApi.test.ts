import {TestScheduler} from 'rxjs/testing';
import {Observable, throttleTime} from 'rxjs'
import {EvamApi, EvamData} from "../../sdk/api/EvamApi";
import {Observables, observe} from "rxjs-observe";


class TestEvamApi extends EvamApi {
    public constructor(evamData: EvamData,
                       observables: Observables<EvamData & object>,
                       proxy: EvamData & object, android: any) {
        super(evamData, observables, proxy, android);
    }
}

beforeEach(() => {
    jest.resetAllMocks()
})

it('onNewOrUpdatedSettings subscribes to the observable', function () {
    let evamData = new EvamData(undefined, undefined)
    const { observables, proxy } = observe(evamData)

    let spy = jest.spyOn(Observable.prototype, "subscribe")

    let evamApi = new TestEvamApi(
        new EvamData(undefined, undefined),
        observables, proxy, undefined
    )

    expect(spy).not.toHaveBeenCalled()

    evamApi.onNewOrUpdatedSettings(() => {})

    expect(spy).toHaveBeenCalled()
});

it('onNewOrUpdatedSettings subscribes to the observable', function () {
    let evamData = new EvamData(undefined, undefined)
    const { observables, proxy } = observe(evamData)

    let spy = jest.spyOn(Observable.prototype, "subscribe")

    let evamApi = new TestEvamApi(
        new EvamData(undefined, undefined),
        observables, proxy, undefined
    )

    expect(spy).not.toHaveBeenCalled()

    evamApi.onNewOrUpdatedOperation(() => {})

    expect(spy).toHaveBeenCalled()
});
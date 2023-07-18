import {EvamApi} from "../../src/api/EvamApi";
import {Operation} from "../../src/domain/Operation";
import EvamEvents from "../../src/domain/EvamEvents";


class TestEvamApi extends EvamApi {
    public constructor() {
        super();
    }
}

beforeEach(() => {
    jest.resetAllMocks();
});


it("onNewOrUpdatedSettings triggers the callback after subscription to the event", () => {
    const settings = {test: "test"};
    const listener = jest.fn();

    let evamApi = new TestEvamApi()

    evamApi.injectSettings(settings);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedSettings(listener);
    evamApi.injectSettings(settings);

    expect(listener).toHaveBeenCalledWith(expect.objectContaining(settings));
});

it("onNewOrUpdatedSettings triggers the callback after subscription to the event AND then doesn't trigger the callback after unsubscription from all events", () => {
    const settings = {test: "test"};
    const listener = jest.fn();

    let evamApi = new TestEvamApi()

    evamApi.injectSettings(settings);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedSettings(listener);
    evamApi.injectSettings(settings);
    expect(listener).toHaveBeenCalledWith(expect.objectContaining(settings));

    evamApi.unsubscribeFromAllCallbacks();
    evamApi.injectSettings(settings);
    expect(listener).toHaveBeenCalledTimes(1)

});

it('onNewOrUpdatedSettings triggers multiple set callbacks',()=>{
    const settings = {test:'test'};
    const listeners = [jest.fn(),jest.fn()];

    let evamApi = new TestEvamApi();

    evamApi.injectSettings(settings)

    listeners.forEach((listener)=>{
        expect(listener).not.toHaveBeenCalled();
    })

    listeners.forEach((listener)=>{
        evamApi.onNewOrUpdatedSettings(listener);
    })

    evamApi.injectSettings(settings);

    listeners.forEach((listener)=>{
        expect(listener).toHaveBeenCalledTimes(1);
    })
})

it("onNewOrUpdatedOperation triggers the callback after subscription to the event", () => {

    const activeCase = Operation.fromJSON(
        {
            operationID: "56",
            patientName: "Test Testkort",
            patientUID: "900608-2381",
            callCenterId: "18",
            caseFolderId: "1",
            prio: "PRIO 1",
            vehicleStatus: {
                name: "Kvittera"
            },
            destinationSiteLocation: {
                latitude: 59.35393,
                longitude: 17.973795,
                street: "Vretenvägen 13"
            },
            name: "Brand i bilen",
            sendTime: (new Date()).getTime() / 1000,
            createdTime: (new Date()).getTime() / 1000,
        }
    );

    const listener = jest.fn();

    let evamApi = new TestEvamApi();

    evamApi.injectOperation(activeCase);
    expect(listener).not.toHaveBeenCalled();

    evamApi.onNewOrUpdatedOperation(listener);
    evamApi.injectOperation(activeCase);

    expect(listener).toHaveBeenCalledWith(
        expect.objectContaining(activeCase)
    );

});
import {Operation} from "../../src/classes/Operation";

it('tests that fromJSON converts correctly for Operation class (when certain non-required keys are not specified)',()=>{

    const op = Operation.fromJSON(
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

    //op will not have all possible keys of an operation
    const convertedOp = Operation.fromJSON(op)

    const opKeys = Object.keys(op)
    const convertedOpKeys = Object.keys(convertedOp)

    expect(opKeys).toEqual(convertedOpKeys)

    convertedOpKeys.forEach((key)=>{
        expect(convertedOp[key as keyof Operation]).toEqual(op[key as keyof (typeof op)]);
    })

})
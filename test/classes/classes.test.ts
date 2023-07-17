
/*it("tests that fromJSON converts correctly for Operation class (even when certain non-required keys are not specified)", () => {

    jest
        .useFakeTimers()
        .setSystemTime();

    const op =
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
            sendTime: new Date(0).getTime(),
            createdTime: new Date(0).getTime(),
        };

    console.log(op);
    console.log(new Date(op.sendTime))

    //op will not have all possible keys of an operation
    const convertedOp = Operation.fromJSON(op);

    const opKeys = Object.keys(op);
    const convertedOpKeys = Object.keys(convertedOp);

    expect(opKeys).not.toEqual(convertedOpKeys);

    console.log(convertedOp);

    convertedOpKeys.forEach((key) => {
        const convertedOpKey = convertedOp[key as keyof Operation];
        //@ts-ignore
        const opKey = op[key as keyof (Operation)]

        if(convertedOpKey instanceof Date){
            expect(convertedOpKey.getTime()).toEqual(opKey);
        }else{
            if(convertedOpKey===undefined && opKey===0){
                console.log(key + ': ' + convertedOpKey + ': ' + opKey)

            }
            expect(convertedOpKey).toEqual(opKey);
        }
    });

});

*/
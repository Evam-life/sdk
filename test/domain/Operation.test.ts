import {Operation} from "../../src/domain/Operation";
import * as _ from "lodash";
import {op} from "../../src/data/testdata";

it("tests that Operation fromJSON correctly assigns right values", () => {

    const convertedOperation = Operation.fromJSON(op);

    expect(convertedOperation.operationID).not.toBeUndefined();
    expect(convertedOperation.patientName).not.toBeUndefined();
    expect(convertedOperation.patientUID).not.toBeUndefined();
    expect(convertedOperation.callCenterId).not.toBeUndefined();
    expect(convertedOperation.vehicleStatus).not.toBeUndefined();
    expect(convertedOperation.destinationSiteLocation).not.toBeUndefined();
    expect(convertedOperation.sendTime).not.toBeUndefined();
    expect(convertedOperation.createdTime).not.toBeUndefined();

    expect(op.operationID).toEqual(convertedOperation.operationID);
    expect(op.patientName).toEqual(convertedOperation.patientName);
    expect(op.patientUID).toEqual(convertedOperation.patientUID);
    expect(op.callCenterId).toEqual(convertedOperation.callCenterId);
    expect(op.vehicleStatus).toEqual(convertedOperation.vehicleStatus);
    expect(op.destinationSiteLocation).toEqual(convertedOperation.destinationSiteLocation);
    expect(new Date(op.sendTime)).toEqual(convertedOperation.sendTime);
    expect(new Date(op.createdTime)).toEqual(convertedOperation.createdTime);
});

it("tests that Location fromJSON throws error when either latitude or longitude are not present in JSON", () => {

    const opWithoutName = _.omit(op, "name");
    const opWithoutOperationId = _.omit(op, "operationID");
    const opWithoutNameAndOperationId = _.omit(op, ["name", "operationID"]);

    expect(() => {
        Operation.fromJSON(opWithoutName);
    }).toThrow();
    expect(() => {
        Operation.fromJSON(opWithoutOperationId);
    }).toThrow();
    expect(() => {
        Operation.fromJSON(opWithoutNameAndOperationId);
    }).toThrow();

});
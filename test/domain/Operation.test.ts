import {Operation} from "@/domain/Operation";
import * as _ from "lodash";
import {convertedOperation, operation} from "../testdata";

it("tests that Operation fromJSON correctly assigns right values", () => {

    expect(convertedOperation.operationID).not.toBeUndefined();
    expect(convertedOperation.patientName).not.toBeUndefined();
    expect(convertedOperation.patientUID).not.toBeUndefined();
    expect(convertedOperation.callCenterId).not.toBeUndefined();
    expect(convertedOperation.vehicleStatus).not.toBeUndefined();
    expect(convertedOperation.destinationSiteLocation).not.toBeUndefined();
    expect(convertedOperation.sendTime).not.toBeUndefined();
    expect(convertedOperation.createdTime).not.toBeUndefined();

    expect(operation.operationID).toEqual(convertedOperation.operationID);
    expect(operation.patientName).toEqual(convertedOperation.patientName);
    expect(operation.patientUID).toEqual(convertedOperation.patientUID);
    expect(operation.callCenterId).toEqual(convertedOperation.callCenterId);
    expect(operation.vehicleStatus).toEqual(convertedOperation.vehicleStatus);
    expect(operation.destinationSiteLocation).toEqual(convertedOperation.destinationSiteLocation);
    expect(new Date(operation.sendTime)).toEqual(convertedOperation.sendTime);
    expect(new Date(operation.createdTime)).toEqual(convertedOperation.createdTime);
});

it("tests that Location fromJSON throws error when either latitude or longitude are not present in JSON", () => {

    const opWithoutName = _.omit(operation, "name");
    const opWithoutOperationId = _.omit(operation, "operationID");
    const opWithoutNameAndOperationId = _.omit(operation, ["name", "operationID"]);

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
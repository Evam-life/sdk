import * as _ from "lodash";
import {VehicleStatus} from "../../src";
import {convertedVehicleStatus, vehicleStatus} from "../testdata";

it("tests that Location fromJSON correctly assigns right values", () => {
    expect(convertedVehicleStatus.name).not.toBeUndefined();
    expect(convertedVehicleStatus.event).not.toBeUndefined();
    expect(convertedVehicleStatus.successorName).not.toBeUndefined();
    expect(convertedVehicleStatus.isStartStatus).not.toBeUndefined();
    expect(convertedVehicleStatus.isEndStatus).not.toBeUndefined();
    expect(convertedVehicleStatus.categoryType).not.toBeUndefined();
    expect(convertedVehicleStatus.categoryName).not.toBeUndefined();

    expect(vehicleStatus.name).toEqual(convertedVehicleStatus.name);
    expect(vehicleStatus.event).toEqual(convertedVehicleStatus.event);
    expect(vehicleStatus.successorName).toEqual(convertedVehicleStatus.successorName);
    expect(vehicleStatus.isStartStatus).toEqual(convertedVehicleStatus.isStartStatus);
    expect(vehicleStatus.isEndStatus).toEqual(convertedVehicleStatus.isEndStatus);
    expect(vehicleStatus.categoryType).toEqual(convertedVehicleStatus.categoryType);
    expect(vehicleStatus.categoryName).toEqual(convertedVehicleStatus.categoryName);
});

it("tests that Location fromJSON throws error when latitude or longitude are not present in JSON", () => {
    const vehicleStatusWithoutName = _.omit(vehicleStatus, "name");
    const vehicleStatusWithoutIsStartStatus = _.omit(vehicleStatus, "isStartStatus");
    const vehicleStatusWithoutIsEndStatus = _.omit(vehicleStatus, "isEndStatus");
    const vehicleStatusWithoutCategoryType = _.omit(vehicleStatus, "categoryType");
    const vehicleStatusWithoutCategoryName = _.omit(vehicleStatus, "categoryName");
    const vehicleStatusWithoutNameAndIsStartStatusAndIsEndStatusAndCategoryTypeAndCategoryName = _.omit(vehicleStatus, ['name','isStartStatus','isEndStatus','categoryType','categoryName']);

    expect(() => {
        VehicleStatus.fromJSON(vehicleStatusWithoutName);
    }).toThrow();
    expect(() => {
        VehicleStatus.fromJSON(vehicleStatusWithoutIsStartStatus);
    }).toThrow();
    expect(() => {
        VehicleStatus.fromJSON(vehicleStatusWithoutIsEndStatus);
    }).toThrow();
    expect(() => {
        VehicleStatus.fromJSON(vehicleStatusWithoutCategoryType);
    }).toThrow();
    expect(() => {
        VehicleStatus.fromJSON(vehicleStatusWithoutCategoryName);
    }).toThrow();
    expect(() => {
        VehicleStatus.fromJSON(vehicleStatusWithoutNameAndIsStartStatusAndIsEndStatusAndCategoryTypeAndCategoryName);
    }).toThrow();
});
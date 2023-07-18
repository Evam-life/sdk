import * as _ from "lodash";
import {VehicleStatus} from "../../src/domain/VehicleStatus";
import {vehicleStatus} from "../../src/data/testdata";

it("tests that Location fromJSON correctly assigns right values", () => {
    const convertedVehicleStatus = VehicleStatus.fromJSON(vehicleStatus);

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
    const convertedVehicleStatusWithoutName = _.omit(vehicleStatus, "name");
    const convertedVehicleStatusWithoutIsStartStatus = _.omit(vehicleStatus, "isStartStatus");
    const convertedVehicleStatusWithoutIsEndStatus = _.omit(vehicleStatus, "isEndStatus");
    const convertedVehicleStatusWithoutCategoryType = _.omit(vehicleStatus, "categoryType");
    const convertedVehicleStatusWithoutCategoryName = _.omit(vehicleStatus, "categoryName");
    const convertedVehicleStatusWithoutNameAndIsStartStatusAndIsEndStatusAndCategoryTypeAndCategoryName = _.omit(vehicleStatus, ['name','isStartStatus','isEndStatus','categoryType','categoryName']);

    expect(() => {
        VehicleStatus.fromJSON(convertedVehicleStatusWithoutName);
    }).toThrow();
    expect(() => {
        VehicleStatus.fromJSON(convertedVehicleStatusWithoutIsStartStatus);
    }).toThrow();
    expect(() => {
        VehicleStatus.fromJSON(convertedVehicleStatusWithoutIsEndStatus);
    }).toThrow();
    expect(() => {
        VehicleStatus.fromJSON(convertedVehicleStatusWithoutCategoryType);
    }).toThrow();
    expect(() => {
        VehicleStatus.fromJSON(convertedVehicleStatusWithoutCategoryName);
    }).toThrow();
    expect(() => {
        VehicleStatus.fromJSON(convertedVehicleStatusWithoutNameAndIsStartStatusAndIsEndStatusAndCategoryTypeAndCategoryName);
    }).toThrow();
});
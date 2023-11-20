import {EvamApi} from "../../src";
import {LayerPointData, LayerShapeData} from "../../src/domain/LayerData";

const androidSetNavLayerPoint = jest.fn();
const androidSetNavLayerShape = jest.fn();
const androidDeleteNavLayer = jest.fn();

jest.mock("../../src/api/AndroidNativeHelpers", () => ({
    ...jest.requireActual("../../src/api/AndroidNativeHelpers"),
    androidNativeHelpers: jest.fn().mockImplementation((insideVs: boolean) => ({
        sendNotification: jest.fn(),
        apiReady: jest.fn(),
        setItem: jest.fn(),
        getItem: jest.fn(),
        deleteItem: jest.fn(),
        clearItems: jest.fn(),
        setHospital: jest.fn(),
        setPriority: jest.fn(),
        setNavLayerPoint: androidSetNavLayerPoint,
        setNavLayerShape: androidSetNavLayerShape,
        deleteNavLayer: androidDeleteNavLayer
    }))
}));
describe("evam api map methods", () => {
    it("should call the correct android methods", () => {
        const evamApi = new EvamApi();
        const pointLayerId = "pointLayerId";
        const shapeLayerId = "shapeLayerId";
        const layerPointData: LayerPointData[] = [];
        const layerShapeData: LayerShapeData[] = [];
        expect(androidSetNavLayerPoint).not.toHaveBeenCalled();
        expect(androidSetNavLayerShape).not.toHaveBeenCalled();
        expect(androidDeleteNavLayer).not.toHaveBeenCalled();
        evamApi.setNavLayerPoint(pointLayerId, layerPointData);
        evamApi.setNavLayerShape(shapeLayerId, layerShapeData);
        evamApi.deleteNavLayer(pointLayerId);
        expect(androidSetNavLayerPoint).toHaveBeenCalledWith(pointLayerId, layerPointData);
        expect(androidSetNavLayerShape).toHaveBeenCalledWith(shapeLayerId, layerShapeData);
        expect(androidDeleteNavLayer).toHaveBeenCalled();
    });
});
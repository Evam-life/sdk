import {EvamApi} from "../../src";
import {LayerPointData, LayerShapeData} from "../../src/domain/LayerData";
import { RawRakelAction } from "../../src/domain/RawRakelAction";
import {AudioDevicesType} from "../../sdk/domain";

const androidSetNavLayerPoint = jest.fn();
const androidSetNavLayerShape = jest.fn();
const androidDeleteNavLayer = jest.fn();
const sendRawRakelAction = jest.fn();
const putAppInForeground = jest.fn();
const makeCall = jest.fn();
const answerCall = jest.fn();
const hangUpCall = jest.fn();
const holdCall = jest.fn();
const unholdCall = jest.fn();
const muteMicrophone = jest.fn();
const unmuteMicrophone = jest.fn();
const selectAudioDeviceType = jest.fn();

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
        deleteNavLayer: androidDeleteNavLayer,
        sendRawRakelAction: sendRawRakelAction,
        putAppInForeground: putAppInForeground,
        makeCall: makeCall,
        answerCall: answerCall,
        hangUpCall: hangUpCall,
        holdCall: holdCall,
        unholdCall: unholdCall,
        muteMicrophone: muteMicrophone,
        unmuteMicrophone: unmuteMicrophone,
        selectAudioDeviceType: selectAudioDeviceType
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
        const rawRakelAction = new RawRakelAction([
            "AT",
            "ATE",
            "AT+CTGS,1,9899565\n0x1a"
        ]); 
        evamApi.sendRawRakelAction(rawRakelAction);
        expect(sendRawRakelAction).toHaveBeenCalledWith(rawRakelAction)
        evamApi.putAppInForeground();
        expect(putAppInForeground).toHaveBeenCalled();
        evamApi.makeCall("07012345678");
        expect(makeCall).toHaveBeenCalledWith("07012345678");

        evamApi.answerCall("1");
        expect(answerCall).toHaveBeenCalledWith("1");

        evamApi.hangUpCall("1");
        expect(hangUpCall).toHaveBeenCalledWith("1");

        evamApi.holdCall("1");
        expect(holdCall).toHaveBeenCalledWith("1");

        evamApi.unholdCall("1");
        expect(unholdCall).toHaveBeenCalledWith("1");

        evamApi.muteMicrophone();
        expect(muteMicrophone).toHaveBeenCalledWith();

        evamApi.unmuteMicrophone();
        expect(unmuteMicrophone).toHaveBeenCalledWith();

        evamApi.selectAudioDeviceType(AudioDevicesType.SPEAKER);
        expect(selectAudioDeviceType).toHaveBeenCalledWith("SPEAKER");
    });
});
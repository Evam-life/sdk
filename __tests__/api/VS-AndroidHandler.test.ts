import { androidWrapper } from "@/utils/android";
import AndroidHandler from "@/api/AndroidHandler";
import { AndroidMethod } from "@/types/_internal";
import { AndroidMethodNameSignatureMap } from "@/types/interfaces";

jest.mock("@/data/const", () => ({
  IS_RUNNING_IN_VS: true,
}));

jest.mock("@/utils/android", () => ({
  androidWrapper: jest.fn(),
}));

describe("AndroidHandler inside Vehicle Services", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should act as a light wrapper around androidWrapper", () => {
    const androidObject: AndroidMethodNameSignatureMap = {
      apiReady: () => {},
      sendRawRakelAction: () => {},
      setPriority: () => {},
      setHospital: () => {},
      setNavLayerPoint: () => {},
      setNavLayerShape: () => {},
      deleteNavLayer: () => {},
      sendNotification: () => {},
      removeNotification: () => {},
      putAppInForeground: () => {},
      makeCall: () => {},
      answerCall: () => {},
      muteMicrophone: () => {},
      hangUpCall: () => {},
      unholdCall: () => {},
      unmunuteMicrophone: () => {},
    };
    const methods = Object.keys(androidObject) as Array<AndroidMethod>;

    methods.forEach((method, index) => {
      expect(androidWrapper).toHaveBeenCalledTimes(index);
      AndroidHandler.call(method, [], {
        nonVsEnvironmentCallback: () => {},
      });
      expect(androidWrapper).toHaveBeenCalledTimes(index + 1);
    });
    expect(androidWrapper).toHaveBeenCalledTimes(methods.length);
  });
});

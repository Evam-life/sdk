import { IS_RUNNING_IN_VS } from "@/data/const";
import {
  AndroidMethod,
  AndroidMethodParameters,
  AndroidMethodReturnType,
} from "@/types/_internal";
import { androidWrapper } from "@/utils/android";

type AndroidHandlerCallOptions<M extends AndroidMethod> = {
  nonVsEnvironmentCallback: (
    ...args: AndroidMethodParameters<M>
  ) => AndroidMethodReturnType<M>;
};

/**
 * Class which handles interactions between Android and JavaScript
 */
class AndroidHandler {
  /**
   * Calls a predefined Android method in vehicle services
   * @param method the method to call
   * @param args the arguments of the method (passed as readonly array)
   * @param nonVsEnvironmentCallback function to be called if the 'call' method is executed outside of
   * the vehicle services environment.
   */
  public static call = <M extends AndroidMethod>(
    method: M,
    args: AndroidMethodParameters<M>,
    { nonVsEnvironmentCallback }: AndroidHandlerCallOptions<M>,
  ): AndroidMethodReturnType<M> =>
    IS_RUNNING_IN_VS
      ? androidWrapper.call(method, ...args)
      : nonVsEnvironmentCallback(...args);
}

export default AndroidHandler;

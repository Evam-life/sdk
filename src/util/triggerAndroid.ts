import {isRunningInVehicleServices} from "../api/AndroidNativeHelpers";
import {AndroidMethod, AndroidMethodArgumentMap} from "../domain/_internal";


const triggerAndroid = <M extends AndroidMethod, ArgType extends AndroidMethodArgumentMap[M], Arg extends ArgType extends readonly (string | number)[] ? ArgType : never>(method: M, ...args: Arg) => {
    try {
        // @ts-ignore
        return Android[method](args);
    } catch (e) {
        console.error(e);
        throw e;
    }
};


export {triggerAndroid};
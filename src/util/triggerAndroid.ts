import {isRunningInVehicleServices} from "../api/AndroidNativeHelpers";
import {AndroidMethod, AndroidMethodArgumentMap} from "../domain/_internal";


const triggerAndroid = <M extends AndroidMethod>(method: M, ...args: AndroidMethodArgumentMap[M]) => {
    try {
        // @ts-ignore
        return Android[method](...args)
    } catch (e) {
        console.error(e);
        throw e;
    }
};


export {triggerAndroid};
import React, {PropsWithChildren} from "react";
import {EvamApi} from "../../../../../src";

// Object.defineProperty(globalThis, "crypto", {
//     value: {
//         getRandomValues: (arr: Uint8Array) => crypto.randomBytes(arr.length)
//     }
// });

const VehicleServicesNoRender: React.FC<PropsWithChildren> = ({children}) => {

    console.log(EvamApi.isRunningInVehicleServices, 'from noRender')

    if (EvamApi.isRunningInVehicleServices) {
        return null;
    }

    return <>{children}</>;
};

export default VehicleServicesNoRender;
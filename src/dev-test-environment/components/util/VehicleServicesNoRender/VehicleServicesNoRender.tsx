import React, {PropsWithChildren} from "react";
import {EvamApi} from "../../../../api/EvamApi";

// Object.defineProperty(globalThis, "crypto", {
//     value: {
//         getRandomValues: (arr: Uint8Array) => crypto.randomBytes(arr.length)
//     }
// });

const VehicleServicesNoRender: React.FC<PropsWithChildren> = ({children}) => {

    if (EvamApi.isRunningInVehicleServices) {
        return null;
    }

    return <>{children}</>;
};

export default VehicleServicesNoRender;
import React, {PropsWithChildren} from "react";
import {EvamApi} from "../../../../../src";

const VehicleServicesNoRender: React.FC<PropsWithChildren> = ({children}) => {

    if (EvamApi.isRunningInVehicleServices) {
        return null;
    }

    return <>{children}</>;
};

export default VehicleServicesNoRender;
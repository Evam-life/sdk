import React, {PropsWithChildren} from "react";
import {EvamApi} from "../../../../api/EvamApi";

const VehicleServicesNoRender: React.FC<PropsWithChildren> = ({children}) => {

    if (EvamApi.isRunningInVehicleServices) {
        return null;
    }

    return <>{children}</>;
};

export default VehicleServicesNoRender;
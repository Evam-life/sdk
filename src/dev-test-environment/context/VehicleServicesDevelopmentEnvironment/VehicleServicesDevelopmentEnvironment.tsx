import React, {PropsWithChildren} from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {NotificationProvider} from "./NotificationProvider";
import {EvamApi} from "../../../api/EvamApi";

const VehicleServicesDevelopmentEnvironment: React.FC<PropsWithChildren> = ({children}) => {

    if (EvamApi.isRunningInVehicleServices) return <>{children}</>;

    return (<ChakraProvider>
        <NotificationProvider>
            {children}
        </NotificationProvider>
    </ChakraProvider>);

};

export default VehicleServicesDevelopmentEnvironment;
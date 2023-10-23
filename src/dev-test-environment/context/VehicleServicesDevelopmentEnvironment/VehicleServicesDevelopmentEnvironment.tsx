import React, {PropsWithChildren} from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {NotificationProvider} from "./NotificationProvider";
import {EvamApi} from "../../../api/EvamApi";

const VehicleServicesDevelopmentEnvironment: React.FC<PropsWithChildren> = ({children}) => {

    //just render the app (this is for if we accidentally leave the VehicleServicesDevelopmentEnvironment component in
    if (EvamApi.isRunningInVehicleServices) return <>{children}</>;

    return (<ChakraProvider>
        <NotificationProvider>
            {children}
        </NotificationProvider>
    </ChakraProvider>);


};

export default VehicleServicesDevelopmentEnvironment;
import React, {PropsWithChildren} from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {NotificationProvider} from "./NotificationProvider";
import {VehicleServicesNoRender} from "../../components";

const VehicleServicesDevelopmentEnvironment: React.FC<PropsWithChildren> = ({children}) => {

    return (
        <VehicleServicesNoRender>
                <ChakraProvider>
                    <NotificationProvider>
                        {children}
                    </NotificationProvider>
                </ChakraProvider>
        </VehicleServicesNoRender>
    );

};

export default VehicleServicesDevelopmentEnvironment;
import React, {PropsWithChildren} from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {NotificationProvider} from "./NotificationProvider";
import {EvamApi} from "../../../api/EvamApi";
import MapDrawer from "../../components/MapDrawer/MapDrawer";

/**
 * The VehicleServicesDevelopmentEnvironment provides a notification environment for you to test sending notifications in vehicle services.
 * @param children the children of the component
 * @constructor
 */
const VehicleServicesDevelopmentEnvironment: React.FC<PropsWithChildren> = ({children}) => {

    //just render the app (this is for if we accidentally leave the VehicleServicesDevelopmentEnvironment component in
    if (EvamApi.isRunningInVehicleServices) return <>{children}</>;

    return (<>
        <ChakraProvider disableGlobalStyle>
            <NotificationProvider>
                <MapDrawer/>
                {children}
            </NotificationProvider>
        </ChakraProvider>
    </>);


};

export default VehicleServicesDevelopmentEnvironment;
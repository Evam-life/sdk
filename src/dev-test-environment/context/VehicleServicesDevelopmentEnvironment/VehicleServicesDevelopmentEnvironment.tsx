import React, {PropsWithChildren, useState} from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {NotificationProvider} from "./NotificationProvider";
import {EvamApi} from "../../../api/EvamApi";
import MapDrawer from "../../components/MapDrawer/MapDrawer";
import {FeatureFlagsContext} from "../FeatureFlags";

type VehicleServicesDevelopmentEnvironmentProps = {
    showFullDeviceView?: boolean
} & PropsWithChildren


/**
 * The VehicleServicesDevelopmentEnvironment provides a notification environment for you to test sending notifications in vehicle services.
 * @param children the children of the component
 * @param showFullDeviceView will hide/show the map
 * @constructor
 */
const VehicleServicesDevelopmentEnvironment: React.FC<VehicleServicesDevelopmentEnvironmentProps> = ({
                                                                                                         children,
                                                                                                         showFullDeviceView = false
                                                                                                     }) => {

    //just render the app (this is for if we accidentally leave the VehicleServicesDevelopmentEnvironment component in
    if (EvamApi.isRunningInVehicleServices) return <>{children}</>;

    return (<FeatureFlagsContext.Provider value={{
        showFullDeviceView
    }}>
        <ChakraProvider disableGlobalStyle>
            <NotificationProvider>
                {showFullDeviceView && <MapDrawer/>}
                {children}
            </NotificationProvider>
        </ChakraProvider>
    </FeatureFlagsContext.Provider>);


};

export default VehicleServicesDevelopmentEnvironment;
import React from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, Heading, HStack, Text} from "@chakra-ui/react";
import {VehicleServicesNoRender} from "../util";
import {_InternalVehicleServicesNotification} from "../../../domain/_InternalVehicleServicesNotification";
interface NotificationComponentProps {
    notification: _InternalVehicleServicesNotification,
    onTrigger: (uuid: string) => void
}


const NotificationComponent: React.FC<NotificationComponentProps> = ({notification, onTrigger}) => {

    const PrimaryButton: React.FC = () => (
        <Button
            color={"white"}
            backgroundColor={"darkorange"}
            borderRadius={"full"}
            onClick={() => {
                if (notification.primaryButton.callback !== undefined)
                    onTrigger(notification.primaryButton.callback);
            }}>
            {notification.primaryButton.label}
        </Button>
    );

    const SecondaryButton: React.FC = () => (
        <Button
            color={"white"}
            backgroundColor={"black"}
            border={"2px solid white"}
            boxSizing={"border-box"}
            borderRadius={"full"}
            onClick={() => {
                if (notification.secondaryButton!.callback !== undefined)
                    onTrigger(notification.secondaryButton!.callback);
            }}>
            {notification.secondaryButton!.label}
        </Button>
    );

    return (<VehicleServicesNoRender>
        <Card w={"500px"} backgroundColor={"black"} color={"white"} zIndex={9999}>
            <CardHeader>
                <Heading size={"sm"}>
                    {notification.heading}
                </Heading>
            </CardHeader>
            <CardBody>
                <Text>
                    {notification.description}
                </Text>
            </CardBody>
            <CardFooter>
                <HStack w={"full"} justifyContent={"right"}>
                    {(notification.secondaryButton !== undefined) ? <SecondaryButton/> : null}
                    <PrimaryButton/>
                </HStack>
            </CardFooter>
        </Card>
    </VehicleServicesNoRender>);
};

export default NotificationComponent;
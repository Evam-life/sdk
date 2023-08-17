import React, {useRef, useState} from "react";
import {Button, Card, Icon, CardBody, CardFooter, CardHeader, Heading, HStack, Text} from "@chakra-ui/react";
import {VehicleServicesNoRender} from "../util";
import {_InternalVehicleServicesNotification} from "../../../domain/_InternalVehicleServicesNotification";
import {motion} from "framer-motion";

interface NotificationComponentProps {
    notification: _InternalVehicleServicesNotification,
    onTrigger: (uuid: string) => void,
    onRemove: (thisNotification: _InternalVehicleServicesNotification) => void
}


const NotificationComponent: React.FC<NotificationComponentProps> = ({notification, onTrigger, onRemove}) => {

    const [willDelete, setWillDelete] = useState<boolean>(false);
    const constraintsRef = useRef(null);

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

    const getFormattedTime = () => {
        const hours = new Date().getHours().toString();
        const minutes = new Date().getMinutes().toString().padStart(2, "0");
        return `Evam Development Environment • ${hours}:${minutes}`;
    };

    const handleDragStart = (e: any, info: { point: { x: any; }; offset: { x: any; }; }) => {
        if (typeof window !== "undefined") {
            const viewportWidth = window.innerWidth;
            const dropPositionX = info.point.x + info.offset.x;
            if (dropPositionX > viewportWidth / 2 + 200) {
                setWillDelete(true);
            } else if (willDelete) {
                setWillDelete(false);
            }
        }
    };

    const handleDragEnd = (e: any, info: { point: { x: any; }; offset: { x: any; }; }) => {
        if (typeof window !== "undefined") {
            const viewportWidth = window.innerWidth;
            const dropPositionX = info.point.x + info.offset.x;
            if (dropPositionX > ((viewportWidth / 2) + 500)) {
                onRemove(notification);
            }
            setWillDelete(false);
        }
    };

    const dragMotionProps = {
        drag: "x",
        dragElastic: 1,
        onDrag: handleDragStart,
        onDragEnd: handleDragEnd,
        dragConstraints: constraintsRef,
    };

    return (<VehicleServicesNoRender>
        <motion.div style={{
            zIndex: 9999,
        }} ref={constraintsRef}>
            {/*@ts-ignore*/}
            <motion.div {...dragMotionProps}>
                <Card
                    _hover={{
                        cursor: "grab"
                    }}
                    _active={{
                        cursor: "grabbing"
                    }}
                    w={"500px"} backgroundColor={"black"} color={"white"} zIndex={9999} style={{
                    userSelect: "none",
                    opacity: willDelete ? 0.2 : 1,
                    filter: willDelete ? "blur(1px)" : "none",
                }}>
                    <CardHeader>
                        <HStack>
                            <Icon fill={"gray"} boxSize={6}>
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                            </Icon>
                            <Heading size={"sm"} color={"gray"} fontWeight={"none"}>
                                {notification.heading + " - " + getFormattedTime()}
                            </Heading>
                        </HStack>
                    </CardHeader>
                    <CardBody pt={0}>
                        <Heading size={"sm"} mb={5}>
                            {notification.heading}
                        </Heading>
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
            </motion.div>
        </motion.div>
    </VehicleServicesNoRender>);
};

export default NotificationComponent;
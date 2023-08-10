import React, {PropsWithChildren, useEffect, useState} from "react";
import {Box, SlideFade, VStack} from "@chakra-ui/react";
import _ from "lodash";
import {publish, subscribe, unsubscribe} from "../../../util/EventHelpers";
import {NotificationComponent, VehicleServicesNoRender} from "../../../components";
import {EvamEvents} from "../../../../domain";
import {_InternalVehicleServicesNotification} from "../../../../domain/_InternalVehicleServicesNotification";


const NotificationProvider: React.FC<PropsWithChildren> = ({children}) => {

    const [notifications, setNotifications] = useState<_InternalVehicleServicesNotification[]>([]);

    const dispatchCallback = (uuid: string) => {
        publish(EvamEvents.VehicleServicesNotificationCallbackTriggered, uuid);
        const notificationsClone = _.clone(notifications);
        const notificationToRemove = notificationsClone.find((notification) => {
            return (uuid === notification.primaryButton.callback || (notification.secondaryButton !== undefined && uuid === notification.secondaryButton.callback));
        });
        if (notificationToRemove !== undefined) {
            const indexOfNotificationToRemove = notificationsClone.indexOf(notificationToRemove);
            if (indexOfNotificationToRemove !== undefined) {
                notificationsClone.splice(indexOfNotificationToRemove, 1);
                setNotifications(notificationsClone);
            }
        }
    };

    useEffect(() => {
        const subscriptionFunctionSendNotification = (e: Event) => {
            //get the notification which has been sent
            const notification = ((e as CustomEvent).detail) as _InternalVehicleServicesNotification;
            //clone the current notifications (as to not risk mutating state)
            const newNotifications = _.clone(notifications);
            //push the new notification to the array
            newNotifications.push(notification);
            //set the new notifications and rerender
            setNotifications(newNotifications);
        };

        subscribe(EvamEvents.VehicleServicesNotificationSent, subscriptionFunctionSendNotification);

        return () => {
            unsubscribe(EvamEvents.VehicleServicesNotificationSent, subscriptionFunctionSendNotification);
        };
    }, [notifications, setNotifications]);

    return (
        <>
            <VehicleServicesNoRender>
                <Box w={"100vw"} h={"100vh"} position={"absolute"}>
                    <VStack left={"1%"} bottom={"1%"} position={"inherit"}>
                        {notifications.map((notification, index) => (
                            <SlideFade in={true} offsetY={"20px"} key={index}>
                                <NotificationComponent notification={notification} onTrigger={dispatchCallback}/>
                            </SlideFade>
                        ))}
                    </VStack>
                </Box>
            </VehicleServicesNoRender>
            {children}
        </>
    );
};

export default NotificationProvider;
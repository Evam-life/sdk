import React, {PropsWithChildren, useEffect, useState} from "react";
import {Box, SlideFade, VStack} from "@chakra-ui/react";
import _ from "lodash";
import {publish, subscribe, unsubscribe} from "../../../util/EventHelpers";
import {NotificationComponent, VehicleServicesNoRender} from "../../../components";
import {EvamEvent} from "../../../../domain";
import {_InternalVehicleServicesNotification} from "../../../../domain/_InternalVehicleServicesNotification";


const NotificationProvider: React.FC<PropsWithChildren> = ({children}) => {

    const [notifications, setNotifications] = useState<_InternalVehicleServicesNotification[]>([]);

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

        subscribe(EvamEvent.VehicleServicesNotificationSent, subscriptionFunctionSendNotification);

        return () => {
            unsubscribe(EvamEvent.VehicleServicesNotificationSent, subscriptionFunctionSendNotification);
        };
    }, [notifications, setNotifications]);

    const dispatchCallback = (uuid: string) => {
        publish(EvamEvent.VehicleServicesNotificationCallbackTriggered, uuid);
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

    const removeNotification = (notification: _InternalVehicleServicesNotification) => {
        const notificationsClone = _.clone(notifications);
        const notificationIndex = notificationsClone.indexOf(notification);

        if (notificationIndex !== undefined) {
            notificationsClone.splice(notificationIndex, 1);
            setNotifications(notificationsClone);
        }
    }

    return (
        <>
            <VehicleServicesNoRender>
                <Box w={"100vw"} h={"100vh"} position={"absolute"}>
                    <VStack left={"1%"} bottom={"1%"} position={"inherit"}>
                        {notifications.map((notification, index) => (
                            <SlideFade in={true} offsetY={"20px"} key={index}>
                                <NotificationComponent notification={notification} onTrigger={dispatchCallback} onRemove={removeNotification}/>
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
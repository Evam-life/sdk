import React, {FC, PropsWithChildren, useCallback, useEffect, useMemo, useState} from "react";
import {Box, Modal, ModalContent, ModalOverlay, SlideFade, VStack} from "@chakra-ui/react";
import _ from "lodash";
import {publish, subscribe, unsubscribe} from "../../../util/EventHelpers";
import {NotificationComponent, VehicleServicesNoRender} from "../../../components";
import {EvamEvent, NotificationType} from "../../../../domain";
import {_InternalVehicleServicesNotification} from "../../../../domain/_InternalVehicleServicesNotification";

type LastNotificationComponentProps = {
    lastingNotification: _InternalVehicleServicesNotification,
    onTrigger: (uuid: string) => void,
    onRemove: (notification: _InternalVehicleServicesNotification) => void
}

const LastNotificationComponent: FC<LastNotificationComponentProps> = ({
                                                                           lastingNotification,
                                                                           onTrigger,
                                                                           onRemove
                                                                       }) => {

        return <Modal closeOnOverlayClick={false} closeOnEsc={false} isOpen={true}
                      isCentered
                      onClose={() => {

                      }}>
            <ModalOverlay/>
            <ModalContent>
                <NotificationComponent notification={lastingNotification} onTrigger={onTrigger} onRemove={onRemove}/>
            </ModalContent>
        </Modal>;
    }

    /**
     * <ModalHeader>
     *                     {lastingNotification?.heading}
     *                 </ModalHeader>
     *                 <ModalBody>
     *                     <Text>
     *                         {lastingNotification?.description}
     *                     </Text>
     *                 </ModalBody>
     *                 <ModalFooter>
     *                     <HStack spacing={4}>
     *                         <SecondaryButton/>
     *                         <PrimaryButton/>
     *                     </HStack>
     *                 </ModalFooter>
     */
;

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

    const dispatchCallback = useCallback((uuid: string) => {
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
    }, [notifications]);

    const removeNotification = useCallback((notification: _InternalVehicleServicesNotification) => {
        const notificationsClone = _.clone(notifications);
        const notificationIndex = notificationsClone.indexOf(notification);

        if (notificationIndex !== undefined) {
            notificationsClone.splice(notificationIndex, 1);
            setNotifications(notificationsClone);
        }
    }, [notifications]);

    const actionNotifications = useMemo(() => notifications.filter(({notificationType}) => notificationType !== NotificationType.LASTING_HUN, [notifications]), [notifications]);

    const lastingNotification: _InternalVehicleServicesNotification | undefined = useMemo(() => notifications.find(({notificationType}) => notificationType === NotificationType.LASTING_HUN), [notifications]);
    const changeLastingNotificationToAction = useCallback((lastingNotification: _InternalVehicleServicesNotification) => {
        const notification = notifications.find((notificationToQuery) => lastingNotification === notificationToQuery);
        if (notification !== undefined) {
            const newNotifications = notifications.filter((notificationToFilter) => notificationToFilter !== notification);
            newNotifications.push({
                ...notification,
                notificationType: NotificationType.ACTION_HUN
            });
            setNotifications(newNotifications);
        }
    }, [notifications]);

    return (
        <>
            <VehicleServicesNoRender>
                {
                    lastingNotification !== undefined ?
                        <LastNotificationComponent lastingNotification={lastingNotification}
                                                   onRemove={changeLastingNotificationToAction}
                                                   onTrigger={dispatchCallback}/> : null
                }
                <Box w={"100vw"} h={"100vh"} position={"absolute"}>
                    <VStack left={"1%"} bottom={"1%"} position={"inherit"}>
                        {actionNotifications.map((notification, index) => (
                            <SlideFade in={true} offsetY={"20px"} key={index}>
                                <NotificationComponent notification={notification} onTrigger={dispatchCallback}
                                                       onRemove={removeNotification}/>
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
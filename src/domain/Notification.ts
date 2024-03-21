/**
 * {
 *
 *     "heading":"My notification",
 *
 *     "description":"Description",
 *
 *     "primaryButtonText":"Button 1",
 *
 *     "secondaryButtonText":"Button 2",
 *
 *     "notificationType":"QUICK_HUN", // CONCEALED_HUN, LIMITED_HUN, QUICK_HUN, LASTING_HUN, ACTION_HUN default: QUICK_HUN
 *
 * }
 */
import {NotificationType} from "./NotificationType";

class NotificationButton {
    constructor(
        public label: string,
        public callback: (() => any) | undefined
    ) {
    }

    static fromJSON(notificationButton: any) {
        if(notificationButton.label === undefined){
            throw Error('label must be defined in fromJSON for notificationButton')
        }
        return new NotificationButton(
            notificationButton.label,
            notificationButton.callback
        )
    }
}


class Notification {

    /**
     * Notification to appear in vehicle services
     * @param notificationId unique notification id that is optional and used if the app also needs to remove a notification
     * @param heading the main title of the notification
     * @param description extra detail regarding the notification
     * @param notificationType how the notification is displayed
     * @param primaryButton primary button label and optional callback
     * @param secondaryButton optional secondary button label and optional callback
     */
    constructor(
        public heading: string,
        public description: string,
        public notificationType: NotificationType,
        public primaryButton: NotificationButton,
        public secondaryButton: NotificationButton | undefined,
        public notificationId?: string,
    ) {
    }

    static fromJSON(notification: any) {
        if (notification.heading === undefined || notification.description === undefined || notification.notificationType === undefined) {
            throw Error("heading, description and notificationType must be specified in notification fromJSON");
        }
        let convertedNotificationType: NotificationType;

        try {
            convertedNotificationType = NotificationType[notification.notificationType as keyof typeof NotificationType];
        } catch {
            throw Error("Invalid notification type in fromJSON for notification");
        }

        return new Notification(
            notification.heading,
            notification.description,
            convertedNotificationType,
            NotificationButton.fromJSON(notification.primaryButton),
            notification.secondaryButton ? NotificationButton.fromJSON(notification.secondaryButton) : undefined,
            notification.notificationId || undefined
        );

    }

}

export {Notification};
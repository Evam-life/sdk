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
import NotificationType from "./NotificationType";

class NotificationButton {
    constructor(
        public label: string,
        public callback: () => void
    ) {
    }
}

class Notification {

    /**
     * Notification to appear in vehicle services
     * @param heading
     * @param description
     * @param primaryButtonText
     * @param secondaryButtonText
     * @param notificationType
     */
    constructor(
        public heading: string,
        public description: string,
        public primaryButtonText: string,
        public secondaryButtonText: string | undefined,
        public notificationType: NotificationType
    ) {
    }
}


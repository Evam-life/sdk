import {NotificationType} from "./NotificationType";

/**
 * This is an internally used tool and should not be documented publicly.
 * @ignore
 */
class _InternalVehicleServicesNotification {
    constructor(
        public heading: string,
        public description: string,
        public notificationType: NotificationType,
        public primaryButton: {
            label: string,
            callback: string
        },
        public secondaryButton: {
            label: string,
            callback: string
        } | undefined,
        public notificationId?: string,
    ) {
    }
}

export {_InternalVehicleServicesNotification};
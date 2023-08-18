import {NotificationType} from "./NotificationType";

class _InternalVehicleServicesNotification {
    constructor(
        public heading:string,
        public description:string,
        public notificationType:NotificationType,
        public primaryButton: {
            label:string,
            callback:string
        },
        public secondaryButton: {
            label:string,
            callback:string
        } | undefined
    ) {
    }
}

export {_InternalVehicleServicesNotification}
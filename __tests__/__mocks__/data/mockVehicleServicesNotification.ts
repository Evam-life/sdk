import {VehicleServicesNotification} from "@/types";

const mockVehicleServicesNotification: VehicleServicesNotification = {
    notificationType: 'CONCEALED_HUN',
    primaryButton: {
        label: 'primary-button-label',
        callback: () => {}
    },
    secondaryButton: {
        label: 'secondary-button-label',
        callback: () => {}
    },
    description: 'description',
    heading: 'heading'
}

export default mockVehicleServicesNotification
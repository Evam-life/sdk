/**
 * Represents the role of a Vehicle Service device.
 */
enum DeviceRole {
    /** Device is installed as a single device within this vehicle **/
    SINGLE_DEVICE = "SINGLE_DEVICE",
    /** Device is installed as a receiving device within this vehicle through Multiple Screens, connected to the Main **/
    RECEIVING_DEVICE = "RECEIVING_DEVICE",
    /** Device is installed as the main device within this vehicle through Multiple Screen, connected to the Tetra radio **/
    MAIN_DEVICE = "MAIN_DEVICE"
}

export {DeviceRole}
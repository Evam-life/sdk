enum BatteryHealth {
    UNKNOWN = 1,
    GOOD = 2,
    OVERHEAT = 3,
    DEAD = 4,
    OVER_VOLTAGE = 5,
    UNSPECIFIED_FAILURE = 6,
    COLD = 7
}

enum BatteryPlugged {
    DOCK = 0,
    AC = 1,
    USB = 2,
    WIRELESS = 4
}

enum BatteryStatus {
    UNKNOWN = 1,
    CHARGING = 2,
    DISCHARGING = 3,
    NOT_CHARGING = 4,
    FULL = 5
}


class Battery {
    /**
     *  Class representing the device's battery health, status and plugged state.
     *  See https://developer.android.com/reference/android/os/BatteryManager for more information.
     * @param health the battery's health (either UNKNOWN, GOOD, OVERHEAT, DEAD, OVER_VOLTAGE, UNSPECIFIED_FAILURE, COLD)
     * @param plugged the battery's plugged status (either DOCK, AC, USB, WIRELESS)
     * @param status the battery's status (either UNKNOWN, CHARGING, DISCHARGING, NOT_CHARGING, FULL)
     */
    constructor(
        public health?: BatteryHealth | undefined,
        public plugged?: BatteryPlugged | undefined,
        public status?: BatteryStatus | undefined
    ) {
    }

    /**
     * Create from JSON
     * @param battery JSON object
     */
    static fromJSON(battery: any) {
        return new Battery(battery.health, battery.plugged, battery.status);
    }
}


export {BatteryHealth, BatteryPlugged, BatteryStatus, Battery};

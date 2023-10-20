enum BatteryHealth {
    UNKNOWN = "UNKNOWN",
    GOOD = "GOOD",
    OVERHEAT = "OVERHEAT",
    DEAD = "DEAD",
    OVER_VOLTAGE = "OVER_VOLTAGE",
    UNSPECIFIED_FAILURE = "UNSPECIFIED_FAILURE ",
    COLD = "COLD"
}

enum BatteryPlugged {
    DOCK = "DOCK",
    AC = "AC",
    USB = "USB",
    WIRELESS = "WIRELESS"
}

enum BatteryStatus {
    UNKNOWN = "UNKNOWN",
    CHARGING = "CHARGING",
    DISCHARGING = "DISCHARGING",
    NOT_CHARGING = "NOT_CHARGING",
    FULL = "FULL"
}


class Battery {
    /**
     *  Class representing the device's battery health, status and plugged state.
     *  See https://developer.android.com/reference/android/os/BatteryManager for more information.
     * @param health the battery's health (either UNKNOWN, GOOD, OVERHEAT, DEAD, OVER_VOLTAGE, UNSPECIFIED_FAILURE, COLD)
     * @param plugged the battery's plugged status (either DOCK, AC, USB, WIRELESS)
     * @param status the battery's status (either UNKNOWN, CHARGING, DISCHARGING, NOT_CHARGING, FULL)
     * @param capacity Remaining battery capacity as an integer percentage of total capacity (with no fractional part).
     */
    constructor(
        public health?: BatteryHealth | undefined,
        public plugged?: BatteryPlugged | undefined,
        public status?: BatteryStatus | undefined,
        public capacity?: number | undefined
    ) {
    }

    /**
     * Create from JSON
     * @param battery JSON object
     */
    static fromJSON(battery: any) {
        return new Battery(battery.health, battery.plugged, battery.status, battery.capacity);
    }
}


export {BatteryHealth, BatteryPlugged, BatteryStatus, Battery};

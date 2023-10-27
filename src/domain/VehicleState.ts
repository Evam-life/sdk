import {Location} from "./Location";
import {VehicleStatus} from "./VehicleStatus";

class VehicleState {
    /**
     * State of the vehicle, location, status, id
     * @param timestamp timestamp of when state received
     * @param vehicleStatus status of the vehicle
     * @see VehicleStatus
     * @param activeCaseFullId id of the current active operation
     * @param vehicleLocation current vehicle location
     */
    constructor(
        public timestamp: Date,
        public vehicleStatus: VehicleStatus | undefined,
        public activeCaseFullId: string | undefined,
        public vehicleLocation: Location | undefined
    ) {
    }

    /**
     * Create from JSON
     * @param vehicleState JSON object
     */
    static fromJSON(vehicleState: any) {
        if (vehicleState.timestamp === undefined) {
            throw Error("Timestamp must be declared in VehicleState");
        }
        return new VehicleState(
            new Date(vehicleState.timestamp),
            (vehicleState.vehicleStatus === undefined) ? undefined : VehicleStatus.fromJSON(vehicleState.vehicleStatus),
            vehicleState.activeCaseFullId,
            vehicleState.vehicleLocation
        );
    }
}

export {VehicleState};
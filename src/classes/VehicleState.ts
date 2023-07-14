import {Location} from "./Location";
import {VehicleStatus} from "./VehicleStatus";

class VehicleState {
    constructor(
        public vehicleStatus: VehicleStatus,
        public activeCaseFullId: string,
        public timestamp:Date,
        public vehicleLocation: Location
    ) {
    }

    static fromJSON (vehicleState:any){
        return new VehicleState(
            vehicleState.vehicleStatus,
            vehicleState.activeCaseFullId,
            vehicleState.timestamp,
            vehicleState.vehicleLocation
        )
    }
}

export {VehicleState}
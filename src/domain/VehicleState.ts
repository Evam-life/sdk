import {Location} from "./Location";
import {VehicleStatus} from "./VehicleStatus";

class VehicleState {
    constructor(
        public vehicleStatus: VehicleStatus | undefined,
        public activeCaseFullId: string | undefined,
        public timestamp:Date,
        public vehicleLocation: Location | undefined
    ) {
    }

    static fromJSON (vehicleState:any){
        if(vehicleState.timestamp === undefined){
            throw Error('Timestamp must be declared in VehicleState')
        }
        return new VehicleState(
            vehicleState.vehicleStatus,
            vehicleState.activeCaseFullId,
            vehicleState.timestamp,
            vehicleState.vehicleLocation
        )
    }
}

export {VehicleState}
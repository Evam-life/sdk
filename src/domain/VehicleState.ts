import {Location} from "./Location";
import {VehicleStatus} from "./VehicleStatus";

class VehicleState {
    constructor(
        public timestamp:Date,
        public vehicleStatus: VehicleStatus | undefined,
        public activeCaseFullId: string | undefined,
        public vehicleLocation: Location | undefined
    ) {
    }

    static fromJSON (vehicleState:any){
        if(vehicleState.timestamp === undefined){
            throw Error('Timestamp must be declared in VehicleState')
        }
        return new VehicleState(
            new Date(vehicleState.timestamp),
            vehicleState.vehicleStatus,
            vehicleState.activeCaseFullId,
            vehicleState.vehicleLocation
        )
    }
}

export {VehicleState}
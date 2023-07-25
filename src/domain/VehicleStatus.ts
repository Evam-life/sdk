/* istanbul ignore next */
class VehicleStatus {
    /**
     * Vehicle status
     * @param name The name of the vehicle status
     * @param event The event associated to this status, if any
     * @param successorName The name of a typical successor to this status based on vehicle configuration
     * @param isStartStatus true if this status is engaged at the start of a new operation
     * @param isEndStatus true if this status closes the current operation
     * @param categoryType Type if status: 'mission' or 'other'
     * @param categoryName The name of the category as defined by the vehicle user
     */
    constructor(
        public name: string,
        public event: string | undefined,
        public successorName: string | undefined,
        public isStartStatus: boolean,
        public isEndStatus: boolean,
        public categoryType: string,
        public categoryName: string
    ) {
    }

    /**
     * Creates from JSON
     * @param status JSON object
     */
    static fromJSON(status: any): VehicleStatus {
        if(status.name===undefined || status.isStartStatus===undefined || status.isEndStatus===undefined || status.categoryType===undefined || status.categoryName===undefined){
            throw Error('Name, isStartStatus, isEndStatus, categoryType and categoryName must be defined for VehicleStatus')
        }
        return new VehicleStatus(
            status.name,
            status.event,
            status.successorName,
            status.isStartStatus,
            status.isEndStatus,
            status.categoryType,
            status.categoryName
        );
    }
}

export {VehicleStatus};
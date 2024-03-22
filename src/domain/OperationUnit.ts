import { OperationUnitSource } from "./OperationUnitSource";

/**
 * Operation unit corresponds to a vehicle on a case and it is related to the Assigned Resource values from SOS.
 */
class OperationUnit {

    /**
     * 
     * @param unitId The unique id of the unit, corresponds to the Resource ID for Assigned Resource from dispatch
     * @param status The current Status, also corresponds to the Status for Assigned Resource from dispatch
     * @param role The role of the unit, only potentially available if source is CLOUD
     * @param source The data source of the unit: RAKEL (from dispatch) or CLOUD (Evam Central Services)
     * @param eta The estimated time of arrival for this unit, only potentially available if source is CLOUD
     * @param reportedInArea Corresponds to reportedInArea for Assigned Resource from dispatch
     */
    constructor(
        public unitId: string,
        public status: string | undefined,
        public role: string | undefined,
        public source: OperationUnitSource | undefined,
        public eta: Date | undefined,
        public reportedInArea: string | undefined
    ) {}

    static fromJSON(data: any) {
        if (data.unitId === undefined) {
            return undefined;
        }

        const source: OperationUnitSource = 
            (data.source === OperationUnitSource.CLOUD 
            || data.source === OperationUnitSource.RAKEL) 
            ? data.source : OperationUnitSource.UNKNOWN

        return new OperationUnit(
            data.unitId,
            data.status,
            data.role,
            source,
            (data.eta !== undefined && data.eta > 0) ? new Date(data.eta*1000) : undefined,
            data.reportedInArea
        )
    }

}

export {OperationUnit};
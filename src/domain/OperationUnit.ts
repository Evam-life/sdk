import { OperationUnitSource } from "./OperationUnitSource";

/**
 * Operation unit corresponds to a vehicle on a case and it is related to the Assigned Resource values from SOS.
 */
class OperationUnit {

    /**
     * 
     * @param unitId The unique id of the unit, corresponds to the Resource Id for Assigned Resource from SOS
     * @param status The current Status, also corresponds to the Status for Assigned Resource from SOS
     * @param role The role of the unit
     * @param source The source of the unit
     * @param eta The estimated time of arrival of the unit in milliseconds
     * @param reportedInArea Corresponds to reportedInArea for Assigned Resource from SOS.
     */
    constructor(
        public unitId: string,
        public status: string | undefined,
        public role: string | undefined,
        public source: OperationUnitSource | undefined,
        public eta: number | undefined,
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
            data.source,
            data.eta,
            data.reportedInArea
        )
    }

}

export {OperationUnit};
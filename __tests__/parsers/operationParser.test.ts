import {Operation} from "@/types";
import {faker} from "@faker-js/faker";
import {operationParser} from "@/data/parsers";

describe("operationParser", () => {
    it("should generate \"operationFullId\" which formats to \"callCenterId:caseFolderId:operationID\"", () => {
        const operationID = faker.string.uuid();
        const caseFolderId = faker.string.uuid();
        const callCenterId = faker.string.uuid();
        const op: Omit<Operation, "operationFullId"> = {
            name: "", operationState: "ACTIVE",
            operationID,
            caseFolderId,
            callCenterId
        };
        const {operationFullId} = operationParser.parse(op);
        expect(operationFullId).toEqual(`${callCenterId}:${caseFolderId}:${operationID}`);
    });
    it('should transform "callCenterId" undefined and "caseFolderId" undefined into an empty string',()=>{
        const operationID = faker.string.uuid();
        const caseFolderId = undefined
        const callCenterId = undefined
        const op: Omit<Operation, "operationFullId"> = {
            name: "", operationState: "ACTIVE",
            operationID,
            caseFolderId,
            callCenterId
        };
        const {operationFullId} = operationParser.parse(op);
        expect(operationFullId).toEqual(`${''}:${''}:${operationID}`);
    })
});

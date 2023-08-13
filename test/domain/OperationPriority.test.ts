import {OperationPriority} from "@/domain/OperationPriority";
import * as _ from "lodash";
import {convertedOperationPriority, operationPriority} from "../testdata";


it('tests that OperationPriority fromJSON correctly assigns right values',()=>{
    expect(convertedOperationPriority.name).not.toBeUndefined()
    expect(convertedOperationPriority.id).not.toBeUndefined()

    expect(operationPriority.name).toEqual(convertedOperationPriority.name)
    expect(operationPriority.id).toEqual(convertedOperationPriority.id)
})

it('tests that Location fromJSON throws error when latitude or longitude are not present in JSON',()=>{
    const operationPriorityWithoutName = _.omit(operationPriority,'name')
    const operationPriorityWithoutId = _.omit(operationPriority,'id')

    expect(()=> {
        OperationPriority.fromJSON(operationPriorityWithoutName);
    }).toThrow()
    expect(()=> {
        OperationPriority.fromJSON(operationPriorityWithoutId);
    }).toThrow()
})
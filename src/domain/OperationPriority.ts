class OperationPriority {
    constructor(
        public id: number,
        public name: string
    ) {
    }

    static fromJSON(operationPriority: any) {
        if(operationPriority.name === undefined || operationPriority.uid === undefined){
            throw Error('name and uid must be declared in Patient')
        }
        return new OperationPriority(
            operationPriority.id,
            operationPriority.name
        );
    }
}

export {OperationPriority};
class OperationPriority {
    constructor(
        public id: Number,
        public name: Number
    ) {
    }

    static fromJSON(operationPriority: any) {
        return new OperationPriority(
            operationPriority.id,
            operationPriority.name
        );
    }
}

export {OperationPriority};